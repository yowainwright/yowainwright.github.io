import React from "react";
import { Post } from "../../lib/server/markdown/types";
import { FAVICON_CONFIGS } from "./constants";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const CDN_URL = "https://yowainwright.imgix.net";

interface SinglePostOgPreviewProps {
  post: Post;
  ogImages: string[];
}

function getImageBasePath(post: Post): string {
  const basePath = `/assets/og/${post?.slug}`;
  return IS_PRODUCTION ? `${CDN_URL}${basePath}` : basePath;
}

function getOgImageSrc(basePath: string, imageName: string): string {
  return `${basePath}/${imageName}`;
}

function getDeviceFaviconSrc(fileName: string): string {
  const path = `/assets/${fileName}`;
  return IS_PRODUCTION ? `${CDN_URL}${path}` : path;
}

function getAltText(imageName: string): string {
  return `OG ${imageName}`;
}

function getFaviconAltText(size: number): string {
  return `${size}x${size} favicon`;
}

function getImageVariantLabel(imageName: string): string {
  if (imageName === "og.png") return "Default";
  const numberMatch = imageName.match(/(\d+)\.png$/);
  const number = numberMatch?.[1];
  return `OG ${number}`;
}




function FaviconSwiper() {
  return (
    <section className="og-preview__swiper-section">
      <div className="og-preview__group-header">
        <h2 className="og-preview__group-title">Favicons</h2>
      </div>
      <div className="og-preview__swiper-container">
        <div className="og-preview__swiper-scroll">
          {FAVICON_CONFIGS.map((config) => (
            <div key={config.size} className="og-preview__swiper-item">
              <div className="og-preview__image-card og-preview__image-card--favicon">
                <div className="og-preview__favicon-container">
                  <img
                    className={`og-preview__favicon og-preview__favicon--${config.size}`}
                    src={getDeviceFaviconSrc(config.name)}
                    alt={getFaviconAltText(config.size)}
                    width={config.size}
                    height={config.size}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                    }}
                  />
                </div>
                <div className="og-preview__image-info">
                  <span className="og-preview__image-name">{config.label}</span>
                  <span className="og-preview__image-size">
                    {config.size}×{config.size}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LightModeSwiper({
  post,
  ogImages,
}: {
  post: Post;
  ogImages: string[];
}) {
  const imageBasePath = getImageBasePath(post);

  if (!ogImages || ogImages.length === 0) {
    return (
      <section className="og-preview__swiper-section">
        <div className="og-preview__group-header">
          <h2 className="og-preview__group-title">Light Mode</h2>
        </div>
        <p>No light mode images found</p>
      </section>
    );
  }

  return (
    <section className="og-preview__swiper-section">
      <div className="og-preview__group-header">
        <h2 className="og-preview__group-title">Light Mode</h2>
      </div>
      <div className="og-preview__swiper-container">
        <div className="og-preview__swiper-scroll">
          {ogImages.map((image, index) => {
            const imageSrc = getOgImageSrc(imageBasePath, image);
            return (
              <div
                key={image}
                className="og-preview__swiper-item"
                id={`light-${index}`}
              >
                <div className="og-preview__image-card">
                  <div className="og-preview__image-container">
                    <img
                      className="og-preview__image"
                      src={imageSrc}
                      alt={getAltText(image)}
                      loading={index === 0 ? "eager" : "lazy"}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="og-preview__image-info">
                    <span className="og-preview__image-name">
                      {getImageVariantLabel(image)}
                    </span>
                    <span className="og-preview__image-url">jeffry.in</span>
                    <span className="og-preview__image-title">
                      {post?.frontmatter?.title || "Blog Post"}
                    </span>
                    <span className="og-preview__image-desc">
                      {post?.frontmatter?.meta ||
                        post?.frontmatter?.description ||
                        "Blog post description"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {ogImages.length > 1 && (
          <div className="og-preview__swiper-nav">
            {ogImages.map((image, index) => (
              <a
                key={index}
                href={`#light-${index}`}
                className="og-preview__swiper-dot"
                aria-label={`Go to light mode ${getImageVariantLabel(image)}`}
              >
                {getImageVariantLabel(image)}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DarkModeSwiper({
  post,
  ogImages,
}: {
  post: Post;
  ogImages: string[];
}) {
  const imageBasePath = getImageBasePath(post);

  if (!ogImages || ogImages.length === 0) {
    return (
      <section className="og-preview__swiper-section">
        <div className="og-preview__group-header">
          <h2 className="og-preview__group-title">Dark Mode</h2>
        </div>
        <p>No dark mode images found</p>
      </section>
    );
  }

  return (
    <section className="og-preview__swiper-section">
      <div className="og-preview__group-header">
        <h2 className="og-preview__group-title">Dark Mode</h2>
      </div>
      <div className="og-preview__swiper-container">
        <div className="og-preview__swiper-scroll">
          {ogImages.map((image, index) => {
            const imageSrc = getOgImageSrc(imageBasePath, image);
            return (
              <div
                key={image}
                className="og-preview__swiper-item"
                id={`dark-${index}`}
              >
                <div className="og-preview__image-card og-preview__image-card--dark">
                  <div className="og-preview__image-container">
                    <img
                      className="og-preview__image"
                      src={imageSrc}
                      alt={getAltText(image)}
                      loading={index === 0 ? "eager" : "lazy"}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="og-preview__image-info">
                    <span className="og-preview__image-name">
                      {getImageVariantLabel(image)}
                    </span>
                    <span className="og-preview__image-url">jeffry.in</span>
                    <span className="og-preview__image-title">
                      {post?.frontmatter?.title || "Blog Post"}
                    </span>
                    <span className="og-preview__image-desc">
                      {post?.frontmatter?.meta ||
                        post?.frontmatter?.description ||
                        "Blog post description"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {ogImages.length > 1 && (
          <div className="og-preview__swiper-nav">
            {ogImages.map((image, index) => (
              <a
                key={index}
                href={`#dark-${index}`}
                className="og-preview__swiper-dot"
                aria-label={`Go to dark mode ${getImageVariantLabel(image)}`}
              >
                {getImageVariantLabel(image)}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SinglePostOgPreview({
  post,
  ogImages,
}: SinglePostOgPreviewProps) {
  const pageTitle = `Preview: ${post?.frontmatter?.title ?? "Untitled"}`;

  return (
    <main className="main">
      <section className="section section--intro">
        <h1>{pageTitle}</h1>
      </section>
      <section className="section og-preview">
        <LightModeSwiper post={post} ogImages={ogImages} />
        <DarkModeSwiper post={post} ogImages={ogImages} />
        <FaviconSwiper />
      </section>
    </main>
  );
}
