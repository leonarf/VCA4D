<template>
  <QuestionTitle>
    How <strong>profitable</strong> and sustainable are the value chain activities for the actors
    involved?
  </QuestionTitle>
  <InfoTitle
    title="Benefit/Cost Ratio (%)"
    information="The benefit-cost ratio is an indicator of profitability. It compares the benefits generated from an actor of the value chain with all of their costs. It therefore indicates if the actor generates incremental value."
  />
  <template v-if="studyData">
    <BarChart :options="populatedBarChartData" @chart-series-click="handleDataChartSeriesClick" />
    <div v-if="selectedStage">
      <MiniChartContainer :currentStage="selectedStage" title="Benefit/Cost Ratio (%)">
        <div class="flex flex-row w-full justify-evenly mt-6">
          <div class="w-full flex flex-row justify-center">
            <Ring :options="currentStageBenefitCostRatioData" />
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
import { computed, ref } from 'vue'
import { getSelectableBarChart, getMiniBarChart } from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import { getColor } from '@utils/colors.js'
import { useCurrencyUtils, formatPercent } from '@utils/format.js'
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

const populatedBarChartData = computed(() => {
  let tooltip = {}
  const items = props.studyData.metrics.eco.benefitCostRatio.stages
    .filter((stage) => stage.netOperatingProfits !== 0)
    .map((stage) => {
      tooltip[stage.name] =
        `Net operating profit = ${prettyAmount.value(convertAmount.value(stage.netOperatingProfits))}<br>
          Total costs = ${prettyAmount.value(convertAmount.value(stage.totalCosts))}<br>
          Benefit/Cost Ratio = ${formatPercent(stage.benefitCostRatio)}`
      return {
        name: stage.name,
        value: stage.benefitCostRatio
      }
    })

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

const currentStageBenefitCostRatioData = computed(() => {
  const currentStage = props.studyData.metrics.eco.benefitCostRatio.stages.find(
    (stage) => stage.name === selectedStage.value
  )
  const currentStageActors = currentStage.actors
  const tooltip = {}
  const items = currentStageActors.map((actor) => {
    tooltip[actor.name] =
      `Net operating profit = ${prettyAmount.value(convertAmount.value(actor.netOperatingProfits))}<br>
          Total costs = ${prettyAmount.value(convertAmount.value(actor.totalCosts))}<br>
          Benefit/Cost Ratio = ${formatPercent(actor.benefitCostRatio)}`
    return {
      name: actor.name,
      value: actor.benefitCostRatio
    }
  })
  return getMiniBarChart(items, tooltip, formatPercent, getColor(selectedStage.value))
})
</script>

<style scoped lang="scss"></style>
