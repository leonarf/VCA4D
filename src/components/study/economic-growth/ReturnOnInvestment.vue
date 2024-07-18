<template>
    <QuestionTitle>How <strong>profitable</strong> and sustainable are the value chain activities for the actors involved?</QuestionTitle>
    <InfoTitle
      title="Benefit/Cost Ratio (%)"
      information="percentage of net operating profit in total costs (NB : for producers this includes actor revenue)"
    />
      <template v-if="studyData">
        <BarChart
          :options="populatedBarChartData" 
          @chartSeriesClick="handleDataChartSeriesClick"
        />
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
        <NoDataBadge/>
      </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getReturnOnInvestmentData,
  getReturnOnInvestmentByActorsData } from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import { useCurrencyUtils } from '@utils/format.js'
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
  }
  else {
    selectedStage.value = event.name
  }
}

const { prettyAmount, convertAmount } = useCurrencyUtils(props);
const { stages, actors } = useActorsAndStages(props);


const populatedBarChartData = computed(() => {
  return getReturnOnInvestmentData(stages, actors, selectedStage, convertAmount, prettyAmount)
})

const currentStageReturnOnInvestmentData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === selectedStage.value)
    return getReturnOnInvestmentByActorsData(currentStageActors, convertAmount, prettyAmount, selectedStage.value === 'Producers')
})
</script>

<style scoped lang="scss">
</style>
