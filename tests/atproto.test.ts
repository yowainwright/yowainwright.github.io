import { afterEach, describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AtProtoClient, DEFAULT_LANGS, MAX_IMAGE_SIZE } from "../lib/server/atproto";
import type { BlobRef } from "../lib/server/atproto";

const tempFiles: string[] = [];

const makeTempFile = (extension: string, data: Buffer) => {
  const filePath = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), "atproto-tests-")),
    `image.${extension}`,
  );
  fs.writeFileSync(filePath, data);
  tempFiles.push(filePath);
  return filePath;
};

afterEach(() => {
  for (const filePath of tempFiles.splice(0)) {
    fs.rmSync(path.dirname(filePath), { recursive: true, force: true });
  }
});

describe("AtProtoClient", () => {
  test("requires credentials before login", async () => {
    const client = new AtProtoClient();

    await expect(client.login()).rejects.toThrow("ATP_IDENTIFIER and ATP_PASSWORD are required");
  });

  test("uploads images with detected MIME types and rejects oversized files", async () => {
    const client = new AtProtoClient();
    const blob: BlobRef = {
      $type: "blob",
      ref: { $link: "blob-ref" },
      mimeType: "image/png",
      size: 4,
    };
    const calls: Array<{ encoding: string; size: number }> = [];

    Object.assign(client, {
      agent: {
        uploadBlob: async (data: Buffer, options: { encoding: string }) => {
          calls.push({ encoding: options.encoding, size: data.length });
          return { data: { blob } };
        },
      },
    });

    const imagePath = makeTempFile("png", Buffer.from([1, 2, 3, 4]));
    const oversizedPath = makeTempFile("jpg", Buffer.alloc(MAX_IMAGE_SIZE + 1));

    await expect(client.uploadImage(imagePath)).resolves.toEqual(blob);
    expect(calls).toEqual([{ encoding: "image/png", size: 4 }]);
    await expect(client.uploadImage(oversizedPath)).rejects.toThrow("Image exceeds");
  });

  test("creates posts with default language metadata", async () => {
    const client = new AtProtoClient();
    const postedRecords: Array<Record<string, unknown>> = [];

    Object.assign(client, {
      agent: {
        post: async (record: Record<string, unknown>) => {
          postedRecords.push(record);
          return { uri: "at://post", cid: "cid" };
        },
      },
    });

    const result = await client.createPost({ text: "Hello world" });

    expect(result).toEqual({ uri: "at://post", cid: "cid" });
    const postedRecord = postedRecords[0];
    expect(postedRecord).toBeDefined();
    expect(postedRecord?.text).toBe("Hello world");
    expect(postedRecord?.langs).toEqual(DEFAULT_LANGS);
  });
});
