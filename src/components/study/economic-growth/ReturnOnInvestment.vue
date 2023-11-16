<template>
    <h3>How <strong>profitable</strong> and viable are the value chain activities for the actors involved?</h3>
    <InfoTitle title="Return on investment (%)" information="percentage of net operating profit in total costs (NB : for
      producers this includes actor revenue)" class="mb-4" />
      <template v-if="studyData">
        <BarChart :options="populatedBarChartData" 
          @chartSeriesClick="handleDataChartSeriesClick" />
        <div>
          <MiniChartContainer :currentStage="currentStage" title="Return On Investment">
              <div class="flex flex-row w-full justify-evenly mt-6">
                  <div class="w-full flex flex-row justify-center">
                    <Ring :options="currentStageReturnOnInvestmentData"></Ring>
                  </div>
              </div>
          </MiniChartContainer>
        </div>
      </template>
      <template v-else>
        <a class="TODO">Data are missing to display this GraphBar</a>
      </template>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getReturnOnInvestmentData,
  getReturnOnInvestmentByActorsData } from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import { useCurrencyUtils } from '@/utils/format.js'
import { useActorsAndStages } from '@/utils/misc.js'

const props = defineProps({
    studyData: Object,
    currency: String
})
const currentStage = ref('')

const { prettyAmount, convertAmount } = useCurrencyUtils(props);
const { stages, actors } = useActorsAndStages(props);


const populatedBarChartData = computed(() => {
  return getReturnOnInvestmentData(stages, actors, currentStage, convertAmount, prettyAmount)
})
const handleDataChartSeriesClick = (event) => currentStage.value = event.name

onMounted(() => {
    currentStage.value = stages.value[0].name
})

const currentStageReturnOnInvestmentData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getReturnOnInvestmentByActorsData(currentStageActors, convertAmount, prettyAmount, currentStage.value === 'Producers')
})
</script>

<style scoped lang="scss">
</style>
