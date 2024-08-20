<template>
  <nav class="flex flex-col">
    <div class="text-[#8A8A8A] text-lg font-bold uppercase mb-4">Table of contents</div>
    <ol class="text-[#2E6BAD] space-y-4">
      <li v-for="(view, index) in views" :key="index">
        <a
          v-if="view.accessible"
          class="hover:underline cursor-pointer"
          :class="{ 'selected-view-link': view.key === selectedViewKey }"
          @click="emits('select', view.key)"
        >
          {{ view.label }}
        </a>
        <span v-else class="disabled-view-link" title="Unavailable for this study">
          {{ view.label }}
        </span>
      </li>
      <li>
        <a
          v-if="fullReportPdfUrl"
          class="hover:underline cursor-pointer"
          :href="fullReportPdfUrl"
          target="_blank"
        >
          Study full report
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue'

const props = defineProps({
  views: Array,
  selectedViewKey: String,
  fullReportPdfUrl: String
})
const emits = defineEmits(['select'])
</script>

<style scoped lang="scss">
.disabled-view-link {
  user-select: none;
  color: rgb(85, 85, 85);
  font-style: italic;
}

.selected-view-link {
  font-weight: 700;
}
</style>
