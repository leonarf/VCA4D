<template>
  <table class="w-full">
    <tbody>
      <ComparisonHeader :studies="studies" @select-studies="emit('select-studies', $event)" />
      <ComparisonSection
        :studies="studies"
        :indicators="comparisonConfig.economics"
        title="Macro-Economic Indicators"
      />

      <ComparisonSeparator :studies="studies" />

      <ComparisonSection
        :studies="studies"
        :indicators="comparisonConfig.social"
        title="Social Sustainability"
      />

      <ComparisonSeparator :studies="studies" />

      <ComparisonSection
        :studies="studies"
        :indicators="comparisonConfig.environment"
        title="Environmental Indicators"
      />
    </tbody>
  </table>
</template>

<script setup>
import ComparisonHeader from '@components/comparison/ComparisonHeader.vue'
import ComparisonSeparator from '@components/comparison/ComparisonSeparator.vue'
import { comparisonConfig } from './comparison/comparisonConfig'
import ComparisonSection from './comparison/ComparisonSection.vue'

defineProps({
  studies: Array
})
const emit = defineEmits(['select-studies'])
</script>

<style lang="scss" scoped>
table {
  margin: 0 -15px;
}
:deep(*) {
  td {
    box-sizing: border-box;
    min-width: 20%;
  }

  tr td:not(:first-child):not(:last-child):not(:nth-child(2)) {
    .default-comparison-cell {
      border-left: none;
    }
  }
  tr td:not(:first-child):not(:last-child):not(:nth-last-child(2)) {
    @apply border-r-2;
    border-right-color: #d1d5db;

    .default-comparison-cell {
      border-right: none;
    }
  }

  tr td:first-child > * {
    margin-left: 15px;
  }
  tr td:nth-last-child(2) > *:last-child {
    margin-right: 15px;
  }
}
</style>
