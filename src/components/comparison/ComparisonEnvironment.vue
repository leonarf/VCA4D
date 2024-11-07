<template>
  <ComparisonTitle title="Environmental Indicators" :studies="studies" />
  <ComparisonExpandableRow
    :studies="studies"
    title="Total impact per year"
    subtitle="Value chain total impact (in pt)"
    :getValue="(study, studies) => getTotalImpacts(study, studies, true)"
    :getSubValues="(study, studies) => getValuesByImpact(study, studies, true)"
  >
    <template #default="{ value, isSubRow }">
      <ComparisonDefaultCell :value="value" valueType="number" :lightVersion="isSubRow" />
    </template>
  </ComparisonExpandableRow>
  <ComparisonExpandableRow
    :studies="studies"
    title="Impact per functional unit"
    subtitle="Value chain total impact / volume"
    :getValue="(study, studies) => getTotalImpacts(study, studies, false)"
    :getSubValues="(study, studies) => getValuesByImpact(study, studies, false)"
  >
    <template #default="{ value, isSubRow }">
      <ComparisonDefaultCell :value="value" valueType="number" :lightVersion="isSubRow" />
    </template>
  </ComparisonExpandableRow>
</template>

<script setup>
import ComparisonTitle from './ComparisonTitle.vue'
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
import ComparisonDefaultCell from './ComparisonDefaultCell.vue'
import { getTotalImpacts, getValuesByImpact } from './comparisonConfig'
defineProps({
  studies: Array
})
</script>

<style scoped lang="scss">
.negative {
  background-color: #ffac9e;
}
.positive {
  background-color: #94d99d;
}
</style>
