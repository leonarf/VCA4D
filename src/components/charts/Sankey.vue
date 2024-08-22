<template>
  <h3>The various actors and their share in the flows of the value chain</h3>
  <RadioInput
    title="Unit selection"
    :options="sankeyGraphPossibleDisplayModesList"
    :selected="sankeyDisplayMode"
    @update:selected="$event => sankeyDisplayMode = $event"
  />
  <SankeyChart :options="populatedSankeyChartData"></SankeyChart>
  <AttachmentLink :studyId="studyData.id" attachmentType="eco.xlsx" />
</template>

<script setup>
import { computed, ref } from 'vue'
import RadioInput from '@components/study/RadioInput.vue';
import { getSankeyData } from '@/charts/sankey.js';
import AttachmentLink from '@components/pdf/AttachmentLink.vue'

import SankeyChart from '../SankeyChart.vue'

const props = defineProps({
  studyData: Object
})

const sankeyGraphPossibleDisplayModesList = [
  { label: "Volumes exchanged", value: "volumeExchanged", subtitle: "From left to right, the flow of goods in the value chain in kilograms" },
  { label: "Monetary flow", value: "monetaryValue", subtitle: "From right to left, the transfer of value from consumers to producers" },
]
const sankeyDisplayMode = ref(sankeyGraphPossibleDisplayModesList[0].value);

const populatedSankeyChartData = computed(() =>
  getSankeyData(props.studyData, sankeyDisplayMode.value)
)
</script>

<style scoped lang="scss">
</style>
