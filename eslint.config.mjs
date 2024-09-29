import eslint from '@eslint/js';

export default [
  {ignores: ["public/*","coverage/*","package.json","*.md","loadershim.js","out/*",".next/*", "next-sitemap.config.js"] },
	eslint.configs.recommended,
]
