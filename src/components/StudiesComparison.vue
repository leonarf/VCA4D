<template>
  <table class="w-full">
    <tbody>
      <ComparisonHeader :studies="studies" @select-studies="emit('select-studies', $event)" />
      <ComparisonEconomics :studies="studies" />

      <ComparisonSeparator :studies="studies" />

      <ComparisonSocial :studies="studies" />

      <ComparisonSeparator :studies="studies" />

      <ComparisonEnvironment :studies="studies" />
    </tbody>
  </table>
</template>

<script setup>
import ComparisonHeader from '@components/comparison/ComparisonHeader.vue'
import ComparisonSocial from '@components/comparison/ComparisonSocial.vue'
import ComparisonSeparator from '@components/comparison/ComparisonSeparator.vue'
import ComparisonEnvironment from './comparison/ComparisonEnvironment.vue'
import ComparisonEconomics from './comparison/ComparisonEconomics.vue'

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
