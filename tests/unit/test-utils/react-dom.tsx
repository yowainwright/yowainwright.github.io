import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { JSDOM } from "jsdom";

let mountedRoots: Root[] = [];

const defineGlobal = (name: string, value: unknown) => {
  Object.defineProperty(globalThis, name, {
    value,
    configurable: true,
  });
};

export const setupDom = (bodyHtml: string, url = "https://jeffry.in/post") => {
  const dom = new JSDOM(`<!doctype html><html><body>${bodyHtml}</body></html>`, {
    pretendToBeVisual: true,
    url,
  });

  defineGlobal("window", dom.window);
  defineGlobal("document", dom.window.document);
  defineGlobal("navigator", dom.window.navigator);
  defineGlobal("MutationObserver", dom.window.MutationObserver);
  defineGlobal("HTMLElement", dom.window.HTMLElement);
  defineGlobal("SVGElement", dom.window.SVGElement);
  defineGlobal("Node", dom.window.Node);
  defineGlobal("Event", dom.window.Event);
  defineGlobal("MouseEvent", dom.window.MouseEvent);
  defineGlobal("IS_REACT_ACT_ENVIRONMENT", true);

  return dom;
};

export const createMountedRoot = async (element: React.ReactNode) => {
  const mount = document.createElement("div");
  document.body.appendChild(mount);

  const root = createRoot(mount);
  mountedRoots = mountedRoots.concat(root);

  await act(async () => {
    root.render(element);
  });

  return root;
};

export const cleanupMountedRoots = async () => {
  const roots = mountedRoots;
  mountedRoots = [];

  await Promise.all(
    roots.map((root) =>
      act(async () => {
        root.unmount();
      }),
    ),
  );
};
