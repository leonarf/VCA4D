<template>
  <ComparisonTitle title="Environmental Indicators" :studies="studies" />
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
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
// WIP for simplicity
import ComparisonRow from './ComparisonRow.vue'
import ComparisonDefaultCell from './ComparisonDefaultCell.vue'
defineProps({
  studies: Array,
  indicators: Array
})

function getRowComponent(indicator) {
  return indicator.getSubValues ? ComparisonExpandableRow : ComparisonRow
}
</script>

<style scoped lang="scss">
.negative {
  background-color: #ffac9e;
}
.positive {
  background-color: #94d99d;
}
</style>
