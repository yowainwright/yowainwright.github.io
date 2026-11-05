import { afterEach, expect, test } from "vitest";
import React, { act } from "react";
import PostTable from "../../../../lib/components/PostTable";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(cleanupMountedRoots);

test("retains the figure caption when expanding and closing the table", async () => {
  setupDom("");
  const caption = "These five projects had 171 overrides before cleanup.";
  await createMountedRoot(
    <PostTable data-title="Initial Override Snapshot" data-caption={caption}>
      <tbody>
        <tr>
          <td>171</td>
        </tr>
      </tbody>
    </PostTable>,
  );
  expect(document.querySelector("figure figcaption")?.textContent).toBe(caption);
  const expand = document.querySelector<HTMLButtonElement>('[aria-label="View larger table"]')!;
  await act(async () => expand.click());
  expect(document.querySelector('[role="dialog"] figcaption')?.textContent).toBe(caption);
  const close = document.querySelector<HTMLButtonElement>('[aria-label="Close table"]')!;
  await act(async () => close.click());
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.querySelectorAll("figure figcaption")).toHaveLength(1);
});
