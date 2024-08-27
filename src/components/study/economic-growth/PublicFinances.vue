<template>
  <QuestionTitle>
    What is the contribution of the value chain to the
    <strong>public finances</strong>?
  </QuestionTitle>
  <div class="flex flex-row flex-wrap items-center ml-4 md:ml-12 -mt-8 -mb-8">
    <div class="w-full lg:w-1/4">
      <InfoTitle
        title="Public Funds Balance"
        information="The public funds balance is given by the amount of taxes received by the State minus the subsidies."
      />
      <div class="uppercase font-semibold text-[#303030] text-xl" />
      <div class="font-semibold text-2xl text-[#C1C1C1]">{{ publicFundsBalance }}</div>
      <div class="uppercase font-semibold text-[#C1C1C1] text-2xl mt-4">
        {{ formatPercent(parseFloat(studyData.ecoData.macroData?.publicFundsBalance)) }}
      </div>
      <div class="uppercase font-semibold text-[#656565] text-base">
        Public Funds Balance / Public Budget
      </div>
      <div class="mt-2">Net share of the public funds balance in government budget</div>
    </div>
    <div class="w-full lg:w-3/4">
      <BarChart
        v-if="studyData"
        :options="publicFinancesBarData"
        @chart-series-click="handleDataChartSeriesClick"
      />
    </div>
  </div>
  <div v-if="selectedStage">
    <MiniChartContainer :currentStage="selectedStage" title="Contribution to the public finances">
      <div class="flex flex-row w-full justify-evenly mt-6">
        <div class="w-full flex flex-row justify-center">
          <Ring :options="currentStagePublicFinancesData" />
        </div>
      </div>
    </MiniChartContainer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import { getPublicFinancesData, getMiniBarChart } from '@/charts/charts'
import { getColor } from '@utils/colors.js'
import { useCurrencyUtils, formatPercent } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import QuestionTitle from '@components/study/QuestionTitle.vue'
import InfoTitle from '@typography/InfoTitle.vue'


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

const publicFundsBalance = computed(() => {
  const balanceValue = convertAmount.value(props.studyData.ecoData.addedValue.government)
  return (balanceValue > 0 ? '+' : '') + prettyAmount.value(balanceValue)
})

const publicFinancesBarData = computed(() => {
  return getPublicFinancesData(stages, actors, convertAmount, prettyAmount, selectedStage)
})

const currentStagePublicFinancesData = computed(() => {
  const currentStageActors = actors.value.filter((actor) => actor.stage === selectedStage.value)
  const tooltip = {}
  const items = currentStageActors
    .map((actor) => {
      const subTotal = convertAmount.value(actor.publicFundsBalance || 0)
      tooltip[actor.name] = `${prettyAmount.value(subTotal)}`
      return {
        name: actor.name,
        value: subTotal
      }
    })
    .filter((item) => !!item && item.value > 0)
  return getMiniBarChart(items, tooltip, prettyAmount.value, getColor(selectedStage.value))
})
</script>

<style scoped lang="scss">
</style>
