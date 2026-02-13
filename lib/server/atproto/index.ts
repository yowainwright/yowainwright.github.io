import { AtpAgent, RichText } from "@atproto/api";
import fs from "node:fs";
import path from "node:path";
import type {
  AtProtoConfig,
  CreatePostOptions,
  PostResult,
  BlobRef,
} from "./types";
import { DEFAULT_PDS_URL, MAX_IMAGE_SIZE, DEFAULT_LANGS } from "./constants";

export class AtProtoClient {
  private agent: AtpAgent;
  private config: AtProtoConfig;

  constructor(config: Partial<AtProtoConfig> = {}) {
    this.config = {
      service: config.service || process.env.ATP_PDS_URL || DEFAULT_PDS_URL,
      identifier: config.identifier || process.env.ATP_IDENTIFIER || "",
      password: config.password || process.env.ATP_PASSWORD || "",
    };

    this.agent = new AtpAgent({ service: this.config.service });
  }

  async login(): Promise<void> {
    if (!this.config.identifier || !this.config.password) {
      throw new Error("ATP_IDENTIFIER and ATP_PASSWORD are required");
    }

    await this.agent.login({
      identifier: this.config.identifier,
      password: this.config.password,
    });
  }

  async uploadImage(imagePath: string): Promise<BlobRef> {
    const absolutePath = path.resolve(imagePath);
    const imageData = fs.readFileSync(absolutePath);

    if (imageData.length > MAX_IMAGE_SIZE) {
      throw new Error(
        `Image exceeds ${MAX_IMAGE_SIZE} bytes: ${imageData.length}`,
      );
    }

    const mimeType = this.getMimeType(absolutePath);
    const response = await this.agent.uploadBlob(imageData, {
      encoding: mimeType,
    });

    return response.data.blob as BlobRef;
  }

  async createPost(options: CreatePostOptions): Promise<PostResult> {
    const rt = new RichText({ text: options.text });
    await rt.detectFacets(this.agent);

    const record: Record<string, unknown> = {
      $type: "app.bsky.feed.post",
      text: rt.text,
      facets: rt.facets,
      langs: options.langs || DEFAULT_LANGS,
      createdAt: new Date().toISOString(),
    };

    if (options.embed) {
      const external: Record<string, unknown> = {
        uri: options.embed.uri,
        title: options.embed.title,
        description: options.embed.description,
      };

      if (options.embed.thumbPath) {
        const thumb = await this.uploadImage(options.embed.thumbPath);
        external.thumb = thumb;
      }

      record.embed = {
        $type: "app.bsky.embed.external",
        external,
      };
    }

    const response = await this.agent.post(record);

    return {
      uri: response.uri,
      cid: response.cid,
    };
  }

  private getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };
    return mimeTypes[ext] || "application/octet-stream";
  }
}

export * from "./types";
export * from "./constants";
