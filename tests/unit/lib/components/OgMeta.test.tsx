import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context.shared-runtime";
import { JSDOM } from "jsdom";
import { expect, test } from "vitest";
import { OgMeta } from "../../../../lib/components/OgMeta";
import type { OgMetaProps } from "../../../../lib/components/OgMeta/types";

const renderHead = (props: OgMetaProps) => {
  let elements: React.ReactElement[] = [];
  const manager = {
    mountedInstances: new Set(),
    updateHead: (head: React.ReactElement[]) => {
      elements = head;
    },
  };
  renderToStaticMarkup(
    <HeadManagerContext.Provider value={manager}>
      <OgMeta {...props} />
    </HeadManagerContext.Provider>,
  );
  const markup = renderToStaticMarkup(<>{elements}</>);
  return new JSDOM(`<!doctype html><html><head>${markup}</head></html>`).window.document;
};

test("publishes post metadata through the real Next.js head manager", () => {
  const document = renderHead({
    title: "A specific post",
    description: "A specific description",
    slug: "specific-post",
    date: "2026-11-06",
    tags: ["performance", "seo"],
    wordCount: 123,
  });
  expect(document.title).toBe("A specific post");
  expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
    "A specific description",
  );
  expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
    "https://jeffry.in/specific-post/",
  );
  expect(document.querySelectorAll('meta[property="article:tag"]')).toHaveLength(2);
  expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(
    "A specific post",
  );
  const schema = JSON.parse(
    document.querySelector('script[type="application/ld+json"]')!.textContent || "{}",
  );
  expect(schema["@type"]).toBe("BlogPosting");
  expect(schema.datePublished).toBe("2026-11-06T00:00:00.000Z");
  expect(schema).not.toHaveProperty("dateModified");
  expect(schema.wordCount).toBe(123);
});

test.each([
  ["about", "AboutPage"],
  ["resume", "ProfilePage"],
])("describes %s accurately while preserving shared page metadata", (slug, schemaType) => {
  const document = renderHead({
    title: "Jeff Wainwright",
    description: "About Jeff",
    slug,
    date: "2026-11-06",
    tags: ["example"],
    wordCount: 123,
  });
  const schema = JSON.parse(
    document.querySelector('script[type="application/ld+json"]')!.textContent || "{}",
  );
  expect(schema["@type"]).toBe(schemaType);
  expect(schema.headline).toBe("Jeff Wainwright");
  expect(schema.description).toBe("About Jeff");
  expect(schema.image).toBe("https://jeffry.in/assets/resume/og.png");
  expect(schema.author.name).toBe("Jeff Wainwright");
  expect(schema.publisher.name).toBe("Jeff Wainwright");
  expect(schema.mainEntityOfPage["@id"]).toBe(`https://jeffry.in/${slug}/`);
  expect(schema.mainEntity["@type"]).toBe("Person");
  expect(schema.datePublished).toBe("2026-11-06T00:00:00.000Z");
  expect(schema).not.toHaveProperty("dateModified");
  expect(schema).not.toHaveProperty("wordCount");
  expect(document.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe(
    "website",
  );
  expect(document.querySelector('meta[property="article:published_time"]')).toBeNull();
  expect(document.querySelector('meta[property="article:tag"]')).toBeNull();
});

test("keeps JSON-LD text intact without allowing closing script tags", () => {
  const title = "Example </script><script>alert(1)</script>";
  const document = renderHead({ title, slug: "example" });
  const scripts = document.querySelectorAll("script");
  expect(scripts).toHaveLength(1);
  expect(JSON.parse(scripts[0].textContent || "{}").headline).toBe(title);
});
