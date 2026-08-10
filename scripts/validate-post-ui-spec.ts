import fs from "node:fs";
import path from "node:path";
import { Schema } from "effect";
import { decodePostUISpecSync } from "../lib/components/PostUI/schema";

const SpecFileNameSchema = Schema.String.pipe(Schema.pattern(/^[a-z0-9-]+\.json$/));

const getSpecPath = (fileNameInput: unknown) => {
  const fileName = Schema.decodeUnknownSync(SpecFileNameSchema)(fileNameInput);
  return path.join(process.cwd(), "lib", "components", "PostUI", "specs", fileName);
};

export const validatePostUISpecFile = (fileNameInput: unknown) => {
  const specPath = getSpecPath(fileNameInput);
  const source = fs.readFileSync(specPath, "utf8");
  const input = JSON.parse(source);

  return decodePostUISpecSync(input);
};

const getCliArgument = () => process.argv.slice(2).find((argument) => argument !== "--");

if (import.meta.main) {
  const spec = validatePostUISpecFile(getCliArgument());
  process.stdout.write(`${JSON.stringify(spec, null, 2)}\n`);
}
