<template>
    <h3 class="mt-12">What is the contribution of the value chain to the <strong>public finances</strong>?</h3>
    <div class="flex flex-row flex-wrap items-center ml-12">
      <div class="w-full lg:w-1/4">
        <div class="uppercase font-semibold text-[#303030] text-xl">Public Funds Balance</div>
        <div class="font-semibold text-2xl text-[#C1C1C1]">{{ publicFundsBalance }}</div>
        <div class="mt-2">
          Taxes - Subventions<br>
          Positive if the sector contributes to the government income more than it receives in subsidies and tax break
        </div>
        <div class="uppercase font-semibold text-[#C1C1C1] text-2xl mt-4 ">{{ formatPercent(parseFloat(studyData.ecoData.macroData?.publicFundsBalance)) }}</div>
        <div class="uppercase font-semibold text-[#656565] text-base">Public Funds Balance / Public Budget</div>
        <div class="mt-2">
          Net share of the public funds balance in government budget
        </div>
      </div>
      <div class="w-full lg:w-3/4">
        <BarChart v-if="studyData" :options="publicFinancesBarData" 
        @chartSeriesClick="handleDataChartSeriesClick" />
      </div>
    </div>
    <div v-if="selectedStage">
      <MiniChartContainer :currentStage="selectedStage" title="Contribution to the public finances">
          <div class="flex flex-row w-full justify-evenly mt-6">
              <div class="w-full flex flex-row justify-center">
                  <Ring :options="currentStagePublicFinancesData"></Ring>
              </div>
          </div>
      </MiniChartContainer>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import {
  getPublicFinancesData,
  getPublicFinancesPerStage
} from '@/charts/charts'
import { useCurrencyUtils, formatPercent } from '@utils/format.js'
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
  }
  else {
    selectedStage.value = event.name
  }
}

const { prettyAmount, convertAmount } = useCurrencyUtils(props);
const { stages, actors } = useActorsAndStages(props);

const publicFundsBalance = computed(() => {
  const balanceValue = convertAmount.value(props.studyData.ecoData.addedValue.government)
  return (balanceValue > 0 ? "+" : "") + prettyAmount.value(balanceValue)
})

const publicFinancesBarData = computed(() => {
  return getPublicFinancesData(stages, actors, convertAmount, prettyAmount, selectedStage)
})

const availableStages = computed(() => publicFinancesBarData.value.xAxis.data)
const handleChartSeriesClick = (event) => selectedStage.value = event.name

const currentStagePublicFinancesData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === selectedStage.value)
    return getPublicFinancesPerStage(currentStageActors, convertAmount.value, prettyAmount.value)
})
</script>

<style scoped lang="scss">
</style>
