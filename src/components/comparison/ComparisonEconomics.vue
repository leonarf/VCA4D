<template>
  <ComparisonTitle title="Macro-Economic Indicators" :studies="studies" />

  <component
    :is="getRowComponent(indicator)"
    v-for="(indicator, index) in indicators"
    :key="index"
    :studies="studies"
    :title="indicator.title"
    :subtitle="indicator.subtitle"
    :getValue="indicator.getValue"
    :getSubValues="indicator.getSubValues"
  >
    <template #default="{ value, studyData, isSubRow }">
      <ComparisonDefaultCell
        :value="value"
        :studyData="studyData"
        :lightVersion="isSubRow"
        :valueType="indicator.format"
      />
    </template>
  </component>
</template>

<script setup>
import ComparisonTitle from './ComparisonTitle.vue'
import ComparisonRow from './ComparisonRow.vue'
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
import ComparisonDefaultCell from './ComparisonDefaultCell.vue'
defineProps({
  studies: Array,
  indicators: Array
})

function getRowComponent(indicator) {
  return indicator.getSubValues ? ComparisonExpandableRow : ComparisonRow
}
</script>
