<template>
  <QuestionTitle
    >How <strong>profitable</strong> and sustainable are the value chain activities for the actors
    involved?</QuestionTitle
  >
  <InfoTitle
    title="Benefit/Cost Ratio (%)"
    information="To do"
  />
  <template v-if="studyData">
    <BarChart :options="populatedBarChartData" @chartSeriesClick="handleDataChartSeriesClick" />
    <div v-if="selectedStage">
      <MiniChartContainer :currentStage="selectedStage" title="Benefit/Cost Ratio (%)">
        <div class="flex flex-row w-full justify-evenly mt-6">
          <div class="w-full flex flex-row justify-center">
            <Ring :options="currentStageReturnOnInvestmentData"></Ring>
          </div>
        </div>
      </MiniChartContainer>
    </div>
  </template>
  <div v-else class="mt-4">
    <NoDataBadge />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getSelectableBarChart, getMiniBarChart } from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import { getColor } from '@utils/colors.js'
import { useCurrencyUtils, formatPercent } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import QuestionTitle from '@components/study/QuestionTitle.vue'
import NoDataBadge from '@components/study/NoDataBadge.vue'

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
const { stages, actors } = useActorsAndStages(props)

const populatedBarChartData = computed(() => {
  let tooltip = {}
  const items = stages.value
    .map((stage) => {
      const stageActors = actors.value.filter((actor) => actor.stage === stage.name)

      const netOperatingProfits = convertAmount.value(
        stageActors
          .map((actor) => actor.netOperatingProfit || 0)
          .reduce((res, item) => res + item, 0)
      )
      let totalCosts = convertAmount.value(
        stageActors.map((actor) => actor.totalCosts || 0).reduce((res, item) => res + item, 0)
      )
      if (stage.name === 'Producers') {
        totalCosts += netOperatingProfits
      }
      if (!netOperatingProfits) {
        return null
      }
      tooltip[stage.name] = `Net operating profit = ${prettyAmount.value(netOperatingProfits)}<br>
            Total costs = ${prettyAmount.value(totalCosts)}<br>
            Benefit/Cost Ratio = ${formatPercent(netOperatingProfits / totalCosts)}`
      return {
        name: stage.name,
        value: (100 * netOperatingProfits) / totalCosts
      }
    })
    .filter((item) => !!item)

  const ret = getSelectableBarChart(items, selectedStage.value, tooltip, (value) =>
    formatPercent(value / 100)
  )
  return {
    ...ret,
    yAxis: {
      type: 'value',
      name: 'BENEFIT/COST RATIO (%)',
      axisLine: {
        show: true
      }
    }
  }
})

const currentStageReturnOnInvestmentData = computed(() => {
  const currentStageActors = actors.value.filter((actor) => actor.stage === selectedStage.value)
  const tooltip = {}
  const items = currentStageActors
    .map((actor) => {
      const netOperatingProfits = convertAmount.value(actor.netOperatingProfit || 0)
      let totalCosts = convertAmount.value(actor.totalCosts)
      if (selectedStage.value === 'Producers') {
        totalCosts += netOperatingProfits
      }
      tooltip[actor.name] = `Net operating profit = ${prettyAmount.value(netOperatingProfits)}<br>
            Total costs = ${prettyAmount.value(totalCosts)}<br>
            Benefit/Cost Ratio = ${formatPercent(netOperatingProfits / totalCosts)}`
      return {
        name: actor.name,
        value: netOperatingProfits / totalCosts
      }
    })
    .filter((item) => !!item)
  return getMiniBarChart(items, tooltip, formatPercent, getColor(selectedStage.value))
})
</script>

<style scoped lang="scss">
</style>
