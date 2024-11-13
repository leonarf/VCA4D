<template>
  <div>
    <InfoTitle
      title="Net operating profit across types of actors"
      information="It is the distribution of the value chain Net Operating Profits among the direct value chain actors."
    />
    <div class="flex flex-row items-center mt-4 mb-4">
      <div class="w-full">
        <BarChart
          v-if="studyData"
          :options="netOperatingProfitData"
          @chart-series-click="handleDataChartSeriesClick"
        />
        <MiniChartContainer
          v-if="selectedStage"
          :currentStage="selectedStage"
          title="Net Operating Profit"
        >
          <div class="flex flex-row w-full justify-evenly mt-6">
            <div class="w-full flex flex-row justify-center">
              <Ring
                :options="currentStageNetOperatingProfitByTypeOfActorData"
                style="height: 300px; width: 450px"
              />
            </div>
          </div>
        </MiniChartContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BarChart from '@charts/BarChart.vue'
import { getSelectableBarChart, getMiniPieChart } from '@/charts/charts'
import Ring from '@charts/Ring.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import { useCurrencyUtils } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import { formatPercent } from '@utils/format.js'

const props = defineProps({
  studyData: Object,
  currency: String
})

const selectedStage = ref(null)
const handleDataChartSeriesClick = (event) => {
  if (selectedStage.value == event.name) {
    selectedStage.value = null
  } else {
    selectedStage.value = event.name
  }
}

const { prettyAmount, convertAmount } = useCurrencyUtils(props)
const { actors } = useActorsAndStages(props)

const netOperatingProfitData = computed(() => {
  if (!props.studyData.metrics.eco.netOperatingProfit) {
    return
  }

  let tooltip = {}

  let total = 0

  const items = Object.entries(props.studyData.metrics.eco.netOperatingProfit).map(
    ([stageName, { stageActors, totalProfit: stageTotalProfit }]) => {
      let toolTipValue = ''
      for (const actor of stageActors) {
        var convertedActorProfit = convertAmount.value(actor.netOperatingProfit)
        toolTipValue += `${actor.name}: ${prettyAmount.value(convertedActorProfit)} (${formatPercent(convertedActorProfit / stageTotalProfit)})<br>`
      }
      total += stageTotalProfit
      tooltip[stageName] = toolTipValue
      return {
        name: stageName,
        value: convertAmount.value(stageTotalProfit)
      }
    }
  )

  return getSelectableBarChart(
    items,
    selectedStage.value,
    tooltip,
    (value) => `${prettyAmount.value(value)} (${formatPercent(value / total)})`
  )
})

const currentStageNetOperatingProfitByTypeOfActorData = computed(() => {
  const currentStageActors = actors.value.filter((actor) => actor.stage === selectedStage.value)
  let data = currentStageActors.map((actor) => {
    return {
      value: convertAmount.value(actor.netOperatingProfit || 0),
      name: actor.name
    }
  })
  return getMiniPieChart(data, 'By type of actor', prettyAmount.value)
})
</script>

<style scoped lang="scss"></style>
