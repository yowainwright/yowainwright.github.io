import type { Spec, UIElement } from "@json-render/core";
import { JSONUIProvider, Renderer } from "@json-render/react";
import React from "react";
import { buildPostUIPrompt } from "./catalog";
import { postUIRegistry } from "./registry";
import type { PostUIElement, PostUISpec } from "./schema";
import { decodePostUISpec, decodePostUISpecSync } from "./schema";

const toJsonRenderElement = (element: PostUIElement): UIElement => {
  const children = Array.from(element.children);

  return { type: element.type, props: element.props, children };
};

const toJsonRenderSpec = (spec: PostUISpec): Spec => {
  const elements = Object.fromEntries(
    Object.entries(spec.elements).map(([key, element]) => [key, toJsonRenderElement(element)]),
  );

  return { root: spec.root, elements };
};

export const PostUIRenderer = ({ spec }: { spec: PostUISpec }) => {
  const jsonRenderSpec = toJsonRenderSpec(spec);

  return (
    <JSONUIProvider registry={postUIRegistry}>
      <Renderer spec={jsonRenderSpec} registry={postUIRegistry} />
    </JSONUIProvider>
  );
};

export const PostUI = ({ spec }: { spec: unknown }) => {
  const decodedSpec = decodePostUISpecSync(spec);

  return <PostUIRenderer spec={decodedSpec} />;
};

export { buildPostUIPrompt, decodePostUISpec };
export type { PostUISpec };
