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
      const stageActors = actors.value.filter((actor) => actor.stage === stage.name).map(buildActorReturnOnInvestmentData);

      const netOperatingProfits = stageActors
          .map((actor) => actor.netOperatingProfits)
          .reduce((res, item) => res + item, 0)
      let totalCosts = stageActors.map((actor) => actor.totalCosts).reduce((res, item) => res + item, 0)

      if (!netOperatingProfits) {
        return null
      }
      tooltip[stage.name] = `Net operating profit = ${prettyAmount.value(convertAmount.value(netOperatingProfits))}<br>
            Total costs = ${prettyAmount.value(convertAmount.value(totalCosts))}<br>
            Benefit/Cost Ratio = ${formatPercent(netOperatingProfits / totalCosts)}`
      return {
        name: stage.name,
        value: netOperatingProfits / totalCosts
      }
    })
    .filter((item) => !!item)

  const ret = getSelectableBarChart(items, selectedStage.value, tooltip, formatPercent)
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
  const items = currentStageActors.map(buildActorReturnOnInvestmentData)
    .map((actor) => {
      tooltip[actor.name] = `Net operating profit = ${prettyAmount.value(convertAmount.value(actor.netOperatingProfits))}<br>
            Total costs = ${prettyAmount.value(convertAmount.value(actor.totalCosts))}<br>
            Benefit/Cost Ratio = ${formatPercent(actor.benefitCostRatio)}`
      return {
        name: actor.name,
        value: actor.benefitCostRatio
      }
    })
  return getMiniBarChart(items, tooltip, formatPercent, getColor(selectedStage.value))
})

function buildActorReturnOnInvestmentData(actor) {
  const netOperatingProfits = actor.netOperatingProfit || 0;
  let totalCosts = actor.totalCosts;

  if (actor.stage === 'Producers') {
    totalCosts += netOperatingProfits;
  }
  return {
    name: actor.name,
    stage: actor.stage,
    netOperatingProfits,
    totalCosts,
    benefitCostRatio: netOperatingProfits / totalCosts,
  };
}
</script>

<style scoped lang="scss">
</style>
