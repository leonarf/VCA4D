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
          @chartSeriesClick="handleDataChartSeriesClick"
        ></BarChart>
        <MiniChartContainer v-if="selectedStage" :currentStage="selectedStage" title="Net Operating Profit">
          <div class="flex flex-row w-full justify-evenly mt-6">
            <div class="w-full flex flex-row justify-center">
              <Ring
                :options="currentStageNetOperatingProfitByTypeOfActorData"
                style="height: 300px; width: 450px"
              ></Ring>
            </div>
          </div>
        </MiniChartContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BarChart from '@charts/BarChart.vue'
import { 
    getNetOperatingProfitData,
    getNetOperatingProfitByTypeOfActorData
} from '@/charts/charts'
import Ring from '@charts/Ring.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import { useCurrencyUtils } from '@utils/format.js'
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

const netOperatingProfitData = computed(() => getNetOperatingProfitData(stages, actors, convertAmount, prettyAmount, selectedStage))

const availableStages = computed(() => netOperatingProfitData.value.xAxis.data)

const currentStageNetOperatingProfitByTypeOfActorData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === selectedStage.value)
    return getNetOperatingProfitByTypeOfActorData(currentStageActors, convertAmount.value, prettyAmount.value)
})
</script>

<style scoped lang="scss"></style>
