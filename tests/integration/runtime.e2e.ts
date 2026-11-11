import { expect, test } from "playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) => {
    const isLocal = route.request().url().startsWith(`${baseURL}/`);
    if (isLocal) return route.continue();
    return route.abort();
  });
});

test("hydrates the theme toggle", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => localStorage.getItem("darkMode") !== null);
  const initialDarkMode = await page
    .locator("body")
    .evaluate((body) => body.classList.contains("js-is-darkmode"));
  await page.getByTitle("Toggle Darkmode").click();
  await page.waitForFunction(
    (previous) => document.body.classList.contains("js-is-darkmode") !== previous,
    initialDarkMode,
  );
});

test("opens and searches the portal dialog", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => localStorage.getItem("darkMode") !== null);
  await page.locator(".search-trigger").click();
  await page.locator(".search-input").fill("pastoralist");
  await expect(page.locator('.search-result[href="/why-pastoralist/"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".search-input")).toHaveCount(0);
});

test("navigates without reloading the document", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => localStorage.getItem("darkMode") !== null);
  await page.locator("body").evaluate((body) => body.setAttribute("data-runtime-test", "retained"));
  await page.locator('a[href="/about/"]').first().click();
  await page.waitForURL("**/about/");
  await expect(page.locator("body")).toHaveAttribute("data-runtime-test", "retained");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://jeffry.in/about/",
  );
});

test("navigates to a dynamic post and preserves browser history", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => localStorage.getItem("darkMode") !== null);
  await page.locator("body").evaluate((body) => body.setAttribute("data-runtime-test", "retained"));
  await page.locator('a[href="/why-pastoralist/"]').first().click();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://jeffry.in/why-pastoralist/",
  );
  await page.goBack();
  await expect(page).toHaveURL("/");
  await page.goForward();
  await expect(page).toHaveURL("/why-pastoralist/");
  await expect(page.locator("body")).toHaveAttribute("data-runtime-test", "retained");
});

test("publishes metadata for the correct page type", async ({ page }) => {
  await page.goto("/about/");
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((element) => JSON.parse(element.textContent || "{}"));
  expect(schema["@type"]).toBe("AboutPage");
  expect(schema.datePublished).toBeTruthy();
  expect(schema).not.toHaveProperty("dateModified");
});

test("renders charts and code-copy portals in MDX", async ({ page }) => {
  await page.goto("/why-pastoralist/");
  await page.locator(".shiki-copy-button").first().click();
  await expect(page.getByRole("button", { name: "Copied!", exact: true }).first()).toBeVisible();
  await expect(page.locator(".recharts-surface").first()).toBeAttached();
  await expect(page.locator(".post__content h2[id]").first()).toBeAttached();
  await expect(page.locator(".post__giscus")).toHaveCount(1);
});
