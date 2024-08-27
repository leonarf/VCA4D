/* eslint-env node */
// import '@rushstack/eslint-patch/modern-module-resolution.js';

import js from "@eslint/js";
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    files: ["**/*.vue", "**/*.js"],
    rules: {
      "no-extra-boolean-cast":"off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-case-declarations": "off",
      "no-redeclare": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    },
    rules: {
      // there can only be 3 vue attributes per line: after that we must unfold
      "vue/max-attributes-per-line": ["warn", {
        singleline: { max: 3 }
      }],
      
      "vue/attribute-hyphenation": ["warn", "never"],
      "vue/custom-event-name-casing": ["warn", "kebab-case"],

      "vue/singleline-html-element-content-newline": "off",
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names":"off",

      // WIP: To fix in #97
      "vue/no-v-html": "off",
    }
  }
]
