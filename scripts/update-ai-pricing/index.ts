#!/usr/bin/env bun

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { fetchAllPricing } from './fetch-prices';
import type { ReasoningMultipliers } from './types';

const JSON_PATH = join(process.cwd(), 'public/data/expensive-ai.json');
const CACHE_PATH = join(process.cwd(), '.cache/ai-pricing.json');

const REASONING_MULTIPLIERS: ReasoningMultipliers = {
  'claude-opus-4.5': 2.8,
  'gpt-5': 2.2,
  'gemini-3-ultra': 2.0,
  'deepseek-r1': 3.5,
  'grok-4.1': 1.8
};

const INPUT_TOKEN_EFFICIENCY = {
  'claude-opus-4.5': 0.5,
  'gpt-5': 1.0,
  'gemini-3-ultra': 1.2,
  'deepseek-r1': 0.9,
  'grok-4.1': 1.1
};

const MODEL_NAMES = {
  'claude-opus-4.5': 'Claude Opus 4.5',
  'gpt-5': 'GPT-5',
  'gemini-3-ultra': 'Gemini 3 Ultra',
  'deepseek-r1': 'DeepSeek R1',
  'grok-4.1': 'Grok 4.1'
};

function generateJsonFile(pricingData: any): string {
  const timestamp = new Date().toISOString();

  const jsonData = {
    title: 'AI Model Cost Calculator',
    lastUpdated: timestamp,
    models: pricingData,
    sources: [
      {
        link: 'https://platform.claude.com/docs/en/about-claude/pricing',
        author: 'Anthropic',
        publication: 'Claude API Pricing Documentation'
      },
      {
        link: 'https://platform.openai.com/docs/pricing',
        author: 'OpenAI',
        publication: 'OpenAI API Pricing'
      },
      {
        link: 'https://ai.google.dev/gemini-api/docs/pricing',
        author: 'Google',
        publication: 'Gemini API Pricing'
      },
      {
        link: 'https://docs.x.ai/developers/models',
        author: 'xAI',
        publication: 'Grok API Pricing'
      },
      {
        link: 'https://api-docs.deepseek.com/quick_start/pricing',
        author: 'DeepSeek',
        publication: 'DeepSeek API Pricing'
      }
    ],
    reasoningMultipliers: REASONING_MULTIPLIERS,
    inputTokenEfficiency: INPUT_TOKEN_EFFICIENCY,
    modelNames: MODEL_NAMES
  };

  return JSON.stringify(jsonData, null, 2);
}

async function loadCachedPricing() {
  try {
    const cached = await readFile(CACHE_PATH, 'utf-8');
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

async function saveCachedPricing(pricing: any) {
  try {
    await writeFile(CACHE_PATH, JSON.stringify(pricing, null, 2));
  } catch {
    // ignore
  }
}

async function main() {
  try {
    const pricing = await fetchAllPricing();

    if (Object.keys(pricing).length === 0) {
      const cached = await loadCachedPricing();
      if (cached) {
        await writeFile(JSON_PATH, generateJsonFile(cached));
        process.exit(0);
      }
      process.exit(1);
    }

    await saveCachedPricing(pricing);
    await writeFile(JSON_PATH, generateJsonFile(pricing));

  } catch (error) {
    const cached = await loadCachedPricing();
    if (cached) {
      await writeFile(JSON_PATH, generateJsonFile(cached));
      process.exit(0);
    }
    process.exit(1);
  }
}

main();