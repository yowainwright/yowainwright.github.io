"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ref,
  runTransaction,
  onValue,
  DatabaseReference,
} from "firebase/database";
import * as Sentry from "@sentry/nextjs";
import { db } from "../../lib/firebase";
import { trackLove } from "../../lib/analytics-firebase";
import { formatCount } from "../../lib/format-count";
import { PixelIcon } from "../PixelIcon";

const MAX_CLICKS = 10;

interface HeartButtonProps {
  slug: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

function getHeartRef(slug: string): DatabaseReference | null {
  if (!db) return null;
  return ref(db, `hearts/${slug.replace(/\//g, "_")}`);
}

export const HeartButton = ({ slug }: HeartButtonProps) => {
  const [count, setCount] = useState<number>(0);
  const [userClicks, setUserClicks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleId = useRef(0);

  const storageKey = `heart-${slug}`;
  const hasMaxed = userClicks >= MAX_CLICKS;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const clicks = stored ? parseInt(stored, 10) : 0;
    setUserClicks(isNaN(clicks) ? 0 : clicks);

    const dbRef = getHeartRef(slug);
    if (!dbRef) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onValue(dbRef, (snapshot) => {
      setCount(snapshot.val() ?? 0);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [slug, storageKey]);

  const spawnParticles = (clickCount: number) => {
    const particleCount = 3 + clickCount * 2;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: particleId.current++,
        x: Math.random() * 60 - 30,
        y: Math.random() * -20,
      });
    }
    const newIds = new Set(newParticles.map((p) => p.id));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newIds.has(p.id)));
    }, 800);
  };

  const handleClick = async () => {
    if (hasMaxed) return;

    const newClickCount = userClicks + 1;
    spawnParticles(newClickCount);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    setUserClicks(newClickCount);
    localStorage.setItem(storageKey, String(newClickCount));

    const dbRef = getHeartRef(slug);
    if (!dbRef) return;

    try {
      await runTransaction(dbRef, (current) => (current ?? 0) + 1);
      await trackLove(slug);
    } catch (error) {
      Sentry.captureException(error, { extra: { slug } });
    }
  };

  const countText = isLoading ? "" : count > 0 ? formatCount(count) : "";
  const heartSize = hasMaxed ? 2 : 2 + userClicks * 0.15;
  const hasClicked = userClicks > 0;
  const heartColor = hasClicked ? "#e53935" : "currentColor";
  const buttonClass = `share__button heart-button ${hasClicked ? "heart-button--active" : ""} ${hasMaxed ? "heart-button--maxed" : ""} ${isAnimating ? "heart-button--pulse" : ""}`;
  const ariaLabel = hasMaxed
    ? `You've loved this post ${MAX_CLICKS} times`
    : "Love this post";

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={hasMaxed}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      <span className="share__label">Love</span>
      <PixelIcon name="heart" size={heartSize} color={heartColor} />
      {countText && <span className="share__count">{countText}</span>}
      {particles.map((p) => (
        <span
          key={p.id}
          className="heart-particle"
          style={{ left: p.x, top: p.y }}
        >
          <PixelIcon name="heart" size={1} color="#e53935" />
        </span>
      ))}
    </button>
  );
};
