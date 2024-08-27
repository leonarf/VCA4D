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
      // Will fix in a few commits
      "vue/no-v-html": "off",
      "vue/require-explicit-emits": "off",
      "vue/attribute-hyphenation": "off",
      "vue/max-attributes-per-line": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/attributes-order": "off",
      "vue/no-multi-spaces": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/html-closing-bracket-spacing": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/component-tags-order": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/v-on-event-hyphenation": "off",
      "vue/v-slot-style": "off",
      "vue/v-bind-style": "off",
      "vue/mustache-interpolation-spacing": "off",
      "vue/html-quotes": "off",
      "vue/html-end-tags": "off",
      "vue/no-parsing-error": "off",
      "vue/valid-v-for": "off",
      "vue/require-valid-default-prop": "off",
      "vue/html-indent": "off",
      "no-mixed-spaces-and-tabs": "off",
      "vue/multi-word-component-names":"off",
      "vue/require-default-prop": "off",
    }
  }
]
