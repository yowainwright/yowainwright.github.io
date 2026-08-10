#!/usr/bin/env -S nub

import { execFileSync } from "node:child_process";

const UPDATE_INTERVAL_MS = 60 * 60 * 1000;

const updatePricing = (): void => {
  execFileSync("nub", ["scripts/update-ai-pricing/index.ts"], {
    stdio: "inherit",
  });
};

updatePricing();
setInterval(updatePricing, UPDATE_INTERVAL_MS);
