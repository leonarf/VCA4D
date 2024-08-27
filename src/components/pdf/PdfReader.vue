<template>
  <div class="min-w-[980px] min-h-[60vh] bg-neutral-600 m-auto py-4 flex flex-col gap-y-3 items-center">
    <div class="flex flex-row gap-x-4">
      <div class="bg-slate-200 rounded w-6 h-6 text-center cursor-pointer select-none" :onclick="pageDown">-</div>
      <div class="bg-slate-100 w-8 h-6 text-center select-none">{{ currentPage }}</div>
      <div class="bg-slate-200 rounded w-6 h-6 text-center cursor-pointer select-none" :onclick="pageUp">+</div>
    </div>
    <vue-pdf-embed :source="path" width="900" :page="currentPage" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
const VuePdfEmbed = defineAsyncComponent(() => import('vue-pdf-embed'))
const props = defineProps({
  path: String
});
const currentPage = ref(1)
const pageDown = () => {currentPage.value = Math.max(1, currentPage.value - 1)}
const pageUp = () => {currentPage.value = Math.min(6, currentPage.value + 1)}
</script>
