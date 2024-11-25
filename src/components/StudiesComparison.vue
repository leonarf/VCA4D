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
      <tr>
        <td>
          <a class="download" @click="() => downloadComparisonXlsx(studies)">
            <div class="download-logo">
              <Svg :svg="DowloadLogo" />
            </div>
            Download comparison data as xlsx</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import ComparisonHeader from '@components/comparison/ComparisonHeader.vue'
import ComparisonSeparator from '@components/comparison/ComparisonSeparator.vue'
import { comparisonConfig } from './comparison/comparisonConfig'
import ComparisonSection from './comparison/ComparisonSection.vue'
import Svg from '@components/Svg.vue'
import DowloadLogo from '@images/icons/download.svg'
import { downloadComparisonXlsx } from './comparison/export'

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

.download {
  margin-top: 30px;
  display: flex;
  gap: 3px;
  cursor: pointer;
  align-items: baseli;
}

.download-logo {
  height: 20px;
  width: 20px;
}
</style>
