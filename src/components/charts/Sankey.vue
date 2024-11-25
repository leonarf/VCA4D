<template>
  <h2>Flow chart of the value chain</h2>
  <div class="sankey-description">
    <p>
      This Sankey diagram allows you to visualise the flows of physical goods and value within one
      specific value chain.
    </p>
    <p>
      First, you can see the stages (nodes) of the value chain (coloured vertical bars, from
      production up to end use) and the different actors within one stage.
    </p>
    <p>
      Second, the nodes are connected thanks to the lines, which width represents the amount of
      physical goods or value that flow between them.
    </p>
    <p>
      When clicking on one node, you highlight the upstream and downstream flows connected to it.
    </p>
  </div>
  <RadioInput
    title="Unit selection"
    :options="sankeyGraphPossibleDisplayModesList"
    :selected="sankeyDisplayMode"
    @update:selected="($event) => (sankeyDisplayMode = $event)"
  />
  <div class="legend">
    <div v-for="(legendItem, index) in legendItems" :key="index" class="legend-item">
      <div class="legend-color" :style="{ 'background-color': legendItem.color }" />
      {{ legendItem.stages.join(', ') }}
    </div>
  </div>
  <SankeyChart :options="populatedSankeyChartData" />
</template>

<script setup>
import _ from 'lodash'
import { computed, ref } from 'vue'
import RadioInput from '@components/study/RadioInput.vue'
import { getSankeyData } from '@/charts/sankey.js'

import SankeyChart from '../SankeyChart.vue'
import { getColor } from '@utils/colors.js'
import { STAGES } from '@utils/stages'

const props = defineProps({
  studyData: Object
})

const sankeyGraphPossibleDisplayModesList = [
  {
    label: 'Volumes exchanged',
    value: 'volumeExchanged',
    subtitle: 'From left to right, the flow of goods in the value chain in kilograms'
  },
  {
    label: 'Monetary flow',
    value: 'monetaryValue',
    subtitle: 'From right to left, the transfer of value from consumers to producers'
  }
]
const sankeyDisplayMode = ref(sankeyGraphPossibleDisplayModesList[0].value)

const populatedSankeyChartData = computed(() => {
  return getSankeyData(populatedActors.value, props.studyData.ecoData.flows, {
    sankeyDisplayMode: sankeyDisplayMode.value,
    monetaryCurrency: props.studyData.targetCurrency
  })
})

const populatedActors = computed(() => {
  return props.studyData.ecoData.actors.map((actor) => ({
    ...actor,
    color: getColor(actor.stage)
  }))
})

const legendItems = computed(() => {
  const stages = _.uniq(populatedActors.value.map((actor) => actor.stage)).sort(sortOnEarlierStage)

  const stagesByColor = {}
  stages.forEach((stage) => {
    const color = getColor(stage)
    if (!stagesByColor[color]) {
      stagesByColor[color] = []
    }

    stagesByColor[color].push(stage)
  })
  return Object.entries(stagesByColor).map(([color, stages]) => ({ color, stages }))
})

function sortOnEarlierStage(stage1, stage2) {
  return getStageOrder(stage1) - getStageOrder(stage2)

  function getStageOrder(stage) {
    const index = STAGES.indexOf(stage)
    if (index === -1) {
      return STAGES.length
    }

    return index
  }
}
</script>

<style scoped lang="scss">
.sankey-description {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}
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
