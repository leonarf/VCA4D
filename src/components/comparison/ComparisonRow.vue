<template>
  <tr :class="{ expandable }" @click="emits('toggle-expand')">
      <td class="row-header">
          <div>
            <div>
              {{ title }}
              <span v-if="expandable">{{ expanded ? "▲" : "▼" }}</span>
            </div>
            <div class="definition">{{ subtitle }}</div>
          </div>
      </td>
      <td v-for="(study, index) in studies" :key="`value_added__${study.id}`">
        <slot :value="values[index]"></slot>
      </td>
      <td></td>
  </tr>
</template>

<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
    studies: Array,
    title: String,
    subtitle: String,
    getValue: Function,
    expandable: Boolean,
    expanded: Boolean
})
const emits = defineEmits(["toggle-expand"]);

const values = computed(() => props.studies.map(study => props.getValue(study)))
</script>

<style scoped lang="scss">
  .row-header {
    min-width: 220px;
    padding-right: 20px;
    display: flex;
    align-items: start;
    gap: 10px;
  }

  .definition {
    min-height: 24px;
    @apply text-[#9B9B9B] italic
  }
  
  tr td:not(:first-child) :deep(div.default-comparison-cell) {
    @apply text-center text-sm py-1.5
  }
  tr td:nth-child(2) :deep(div.default-comparison-cell) {
    @apply rounded-l-full
  }
  tr td:nth-last-child(2) :deep(div.default-comparison-cell) {
    @apply rounded-r-full
  }

  .expandable {
    cursor: pointer;
  }
</style>
