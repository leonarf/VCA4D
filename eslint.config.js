/* eslint-env node */
// import '@rushstack/eslint-patch/modern-module-resolution.js';

import js from "@eslint/js";
import pluginVue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
]
