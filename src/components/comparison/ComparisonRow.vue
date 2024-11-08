<template>
  <tr class="row" :class="{ expandable }" @click="emits('toggle-expand')">
    <td class="row-header">
      <div class="row-title">
        {{ indicator.title }}
        <span v-if="expandable" class="expand-arrow">{{ expanded ? '▲' : '▼' }}</span>
      </div>
      <div v-if="indicator.subtitle" class="definition">{{ indicator.subtitle }}</div>
    </td>
    <td v-for="(study, index) in studies" :key="`value_added__${study.id}`">
      <slot :value="values[index]" :studyData="study" />
    </td>
    <td />
  </tr>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

const props = defineProps({
  studies: Array,
  indicator: Object,
  expandable: Boolean,
  expanded: Boolean
})
const emits = defineEmits(['toggle-expand'])

const values = computed(() =>
  props.studies.map((study) => props.indicator.getValue(study, props.studies))
)
</script>

<style scoped lang="scss">
.row-header {
  min-width: 278px;
  min-height: 50px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.definition {
  min-height: 24px;
  @apply text-[#9B9B9B] italic;
}

tr td:not(:first-child) :deep(div.default-comparison-cell) {
  @apply text-center py-1.5;
}
tr td:nth-child(2) :deep(div.default-comparison-cell) {
  @apply rounded-l-full;
}
tr td:nth-last-child(2) :deep(div.default-comparison-cell) {
  @apply rounded-r-full;
}

.expandable {
  cursor: pointer;
}
</style>
