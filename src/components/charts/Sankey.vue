<template>
  <h2>The various actors and their share in the flows of the value chain</h2>
  <RadioInput
    title="Unit selection"
    :options="sankeyGraphPossibleDisplayModesList"
    :selected="sankeyDisplayMode"
    @update:selected="$event => sankeyDisplayMode = $event"
  />
  <div class="legend">
    <div
      v-for="(legendItem, index) in legendItems"
      :key="index"
      class="legend-item"
    >
      <div class="legend-color" :style="{ 'background-color': legendItem.color }"></div>
      {{ legendItem.stages.join(", ") }}
    </div>
  </div>
  <SankeyChart :options="populatedSankeyChartData"></SankeyChart>
</template>

<script setup>
import _ from "lodash"
import { computed, ref } from 'vue'
import RadioInput from '@components/study/RadioInput.vue';
import { getSankeyData } from '@/charts/sankey.js';

import SankeyChart from '../SankeyChart.vue'
import { getColor } from '@utils/colors.js'

const props = defineProps({
  studyData: Object
})

const sankeyGraphPossibleDisplayModesList = [
  { label: "Volumes exchanged", value: "volumeExchanged", subtitle: "From left to right, the flow of goods in the value chain in kilograms" },
  { label: "Monetary flow", value: "monetaryValue", subtitle: "From right to left, the transfer of value from consumers to producers" },
]
const sankeyDisplayMode = ref(sankeyGraphPossibleDisplayModesList[0].value);

const populatedSankeyChartData = computed(() => {
  return getSankeyData(
    populatedActors.value,
    props.studyData.ecoData.flows,
    {
      sankeyDisplayMode: sankeyDisplayMode.value,
      monetaryCurrency: props.studyData.targetCurrency,
  })
})

const populatedActors = computed(() => {
  return props.studyData.ecoData.actors.map(actor => ({
    ...actor,
    color: getColor(actor.stage)
  }));
});

const legendItems = computed(() => {
  const stages = _.uniq(populatedActors.value.map(actor => actor.stage));
  
  const stagesByColor = {};
  stages.forEach(stage => {
    const color = getColor(stage);
    if (! stagesByColor[color]) {
      stagesByColor[color] = [];
    }

    stagesByColor[color].push(stage);
  })
  return Object.entries(stagesByColor).map(([color, stages]) => ({ color, stages }));
});
</script>

<style scoped lang="scss">
.legend {
  margin-top: 30px;
  display: flex;
  gap: 24px;

  .legend-item {
    display: flex;
    gap: 10px;
    align-items: baseline;

    .legend-color {
      height: 12px;
      width: 12px;
      position: relative;

      flex-shrink: 0;
    }
  }
}
</style>
