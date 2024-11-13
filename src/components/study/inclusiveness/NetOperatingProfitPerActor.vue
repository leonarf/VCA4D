<template>
  <div>
    <InfoTitle
      title="Individual Net Operating Profit per actor type"
      information="It is the Net Operating Profit obtained on average by one individual actor of each type."
    />
    <div class="flex flex-row items-center mt-4">
      <div class="w-full">
        <BarChart
          v-if="studyData"
          :options="netOperatingProfitByNumberActorsData"
          @chart-series-click="handleDataChartSeriesClick"
        />
        <MiniChartContainer
          v-if="selectedStage"
          :currentStage="selectedStage"
          title="Net Operating Profit per actor"
        >
          <div class="flex flex-row w-full justify-evenly mt-6">
            <div class="w-full flex flex-row justify-center">
              <Ring :options="currentStageSplitData" />
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
import Ring from '@charts/Ring.vue'
import { getSelectableBarChart, getMiniBarChart } from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import { getColor } from '@utils/colors.js'
import { useCurrencyUtils, formatNumber } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import MiniChartContainer from '@charts/MiniChartContainer.vue'

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

const netOperatingProfitByNumberActorsData = computed(() => {
  if (!props.studyData.metrics.eco.netOperatingProfitPerActor) {
    return
  }

  let tooltip = {}

  const items = Object.entries(props.studyData.metrics.eco.netOperatingProfitPerActor).map(
    ([stageName, { profitPerActor, stageActors }]) => {
      let toolTipValue = ''
      for (const actor of stageActors) {
        toolTipValue += `${actor.name}: net operating profit= ${prettyAmount.value(convertAmount.value(actor.netOperatingProfit))} -- #actors= ${formatNumber(actor.numberOfActors)}<br>`
      }
      tooltip[stageName] = toolTipValue
      return {
        name: stageName,
        value: convertAmount.value(profitPerActor)
      }
    }
  )

  return getSelectableBarChart(
    items,
    selectedStage.value,
    tooltip,
    prettyAmount.value,
    selectedStage
  )
})

const currentStageSplitData = computed(() => {
  const currentStageActors = actors.value.filter((actor) => actor.stage === selectedStage.value)
  const tooltip = {}
  const items = currentStageActors
    .map((actor) => {
      const netOperatingProfit = convertAmount.value(actor.netOperatingProfit || 0)
      const numberOfActors = actor.numberOfActors || 0
      if (netOperatingProfit && numberOfActors) {
        tooltip[actor.name] = `netOperatingProfit=${prettyAmount.value(
          netOperatingProfit
        )}<br>number of actor=${formatNumber(numberOfActors)}`
        return {
          name: actor.name,
          value: netOperatingProfit / numberOfActors
        }
      }
    })
    .filter((item) => !!item && item.value > 0)
  return getMiniBarChart(items, tooltip, prettyAmount.value, getColor(selectedStage.value))
})
</script>

<style scoped lang="scss"></style>
