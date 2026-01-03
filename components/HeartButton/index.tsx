'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ref, get, set, onValue, DatabaseReference } from 'firebase/database';
import { db } from '../../lib/firebase';
import { trackLove } from '../../lib/analytics-firebase';
import { formatCount } from '../../lib/format-count';
import { PixelHeart } from '../PixelHeart';

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
  return ref(db, `hearts/${slug.replace(/\//g, '_')}`);
}

export const HeartButton = ({ slug }: HeartButtonProps) => {
  const [count, setCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleId = useRef(0);

  const storageKey = `heart-${slug}`;

  useEffect(() => {
    const liked = localStorage.getItem(storageKey) === 'true';
    setHasLiked(liked);

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

  const spawnParticles = () => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 5; i++) {
      newParticles.push({
        id: particleId.current++,
        x: Math.random() * 40 - 20,
        y: Math.random() * -10,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 800);
  };

  const handleClick = async () => {
    if (hasLiked) return;

    spawnParticles();

    const dbRef = getHeartRef(slug);
    if (!dbRef) {
      localStorage.setItem(storageKey, 'true');
      setHasLiked(true);
      return;
    }

    try {
      const snapshot = await get(dbRef);
      const currentCount = snapshot.val() ?? 0;
      await set(dbRef, currentCount + 1);
      await trackLove(slug);
      localStorage.setItem(storageKey, 'true');
      setHasLiked(true);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const countText = isLoading ? '' : count > 0 ? formatCount(count) : '';

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={hasLiked}
      className={`share__button heart-button ${hasLiked ? 'heart-button--liked' : ''}`}
      aria-label={hasLiked ? 'You liked this post' : 'Like this post'}
    >
      <span className="share__label">Love</span>
      <PixelHeart filled={hasLiked} size={2} color="currentColor" />
      {countText && <span className="share__count">{countText}</span>}
      {particles.map((p) => (
        <span
          key={p.id}
          className="heart-particle"
          style={{ left: p.x, top: p.y }}
        >
          <PixelHeart filled size={1} />
        </span>
      ))}
    </button>
  );
};
