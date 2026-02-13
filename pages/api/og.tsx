import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import OgImage from "../../components/og";
import { OG_DIMENSIONS } from "../../components/og/constants";

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Jeffry.in";
    const slug = searchParams.get("slug") || "";
    const type = searchParams.get("type") || "default";

    return new ImageResponse(
      <OgImage title={title} slug={slug} type={type} />,
      OG_DIMENSIONS,
    );
  } catch {
    return new Response("Failed to generate image", {
      status: 500,
    });
  }
}

export const runtime = "edge";
