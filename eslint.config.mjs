// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;


// import { FlatCompat } from '@eslint/eslintrc'
 
// const compat = new FlatCompat({
//   // import.meta.dirname is available after Node.js v20.11.0
//   baseDirectory: import.meta.dirname,
// })
 
// const eslintConfig = [
//   ...compat.config({
//     extends: ['next'],
//     rules: {
//       'react/no-unescaped-entities': 'off',
//       '@next/next/no-page-custom-font': 'off',
//     },
//   }),
// ]
 
// export default eslintConfig



// import js from '@eslint/js';
// import typescriptEslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import react from 'eslint-plugin-react';

// export default [
//   {
//     ignores: ['src/generated/**'], // Ignore all files in src/generated
//   },
//   {
//     files: ['**/*.ts', '**/*.tsx'],
//     languageOptions: {
//       parser: tsParser,
//       sourceType: 'module',
//     },
//     plugins: {
//       '@typescript-eslint': typescriptEslint,
//       react,
//     },
//     rules: {
//       // Your existing rules
//     },
//   },
//   // Other configurations...
// ];

// import { FlatCompat } from '@eslint/eslintrc'
// import tseslint from 'typescript-eslint'

// const compat = new FlatCompat({
//   baseDirectory: import.meta.dirname,
// })

// const eslintConfig = [
//   ...compat.config({
//     extends: [
//       'next',
//       'plugin:@typescript-eslint/recommended', // Add this line
//     ],
//     rules: {
//       'react/no-unescaped-entities': 'off',
//       '@next/next/no-page-custom-font': 'off',
//     },
//   }),
//   {
//     // Override rules or add file-specific configs here
//     files: ['src/**/*.{ts,tsx}'], // Target your TypeScript files
//     languageOptions: {
//       parser: tseslint.parser, // Explicitly set the TypeScript parser
//     },
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'warn', // Example: customize a rule
//     },
//   },
// ]

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import tseslint from "typescript-eslint";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   {
//     ignores: [
//       "src/generated/**", // Ignore all files in this directory
//       "dist",
//       ".next",
//       "build",
//     ],
//   },
//   // Extend configs using compat
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     plugins: {
//       "@typescript-eslint": tseslint.plugin,
//     },
//     rules: {
//       // Example rule overrides
//       "@typescript-eslint/no-unused-vars": ["warn"],
//     },
//   },
// ];

// export default eslintConfig;


// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/generated/**", "dist", ".next", "build"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",   // ⬅ disable temporarily
      "@typescript-eslint/no-unused-vars": "warn",   // ⬅ don’t block build
      "react/no-unescaped-entities": "off",          // ⬅ disable temporarily
    },
  },
];

export default eslintConfig;
