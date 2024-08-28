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
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    },
    rules: {
      "vue/block-order": ["error", { order: ["template", "script", "style"] }],

      // there can only be 3 vue attributes per line: after that we must unfold
      "vue/max-attributes-per-line": ["warn", {
        singleline: { max: 3 }
      }],
      
      "vue/attribute-hyphenation": ["warn", "never"],
      "vue/custom-event-name-casing": ["warn", "kebab-case"],

      "vue/singleline-html-element-content-newline": "off",
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names":"off",

      "vue/no-undef-components": ["error", {}],
      // WIP: To fix in #97
      "vue/no-v-html": "off",
    }
  }
]
