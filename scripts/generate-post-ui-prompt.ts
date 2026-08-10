import fs from "node:fs";
import path from "node:path";
import { Schema } from "effect";
import { buildPostUIPrompt } from "../lib/components/PostUI";

const PostSlugSchema = Schema.String.pipe(Schema.pattern(/^[a-z0-9-]+$/));

const readPostData = (slug: string) => {
  const dataPath = path.join(process.cwd(), "public", "data", `${slug}.json`);
  if (!fs.existsSync(dataPath)) return undefined;

  return fs.readFileSync(dataPath, "utf8");
};

const findPostPath = (slug: string) => {
  const contentDirectory = path.join(process.cwd(), "content");
  const extensions = [".mdx", ".md"];
  const postPath = extensions
    .map((extension) => path.join(contentDirectory, `${slug}${extension}`))
    .find((candidate) => fs.existsSync(candidate));

  if (!postPath) throw new Error(`Post not found: ${slug}`);
  return postPath;
};

export const generatePostUIPrompt = (slugInput: unknown) => {
  const slug = Schema.decodeUnknownSync(PostSlugSchema)(slugInput);
  const postPath = findPostPath(slug);
  const content = fs.readFileSync(postPath, "utf8");
  const data = readPostData(slug);

  return buildPostUIPrompt({ content, data, slug });
};

const getCliArgument = () => process.argv.slice(2).find((argument) => argument !== "--");

if (import.meta.main) {
  const prompt = generatePostUIPrompt(getCliArgument());
  process.stdout.write(`${prompt}\n`);
}
