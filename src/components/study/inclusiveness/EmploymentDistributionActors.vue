<template>
  <div>
    <InfoTitle
      title="Number of actors"
      class="mb-4 mt-8"
      information="
              It is the number of the actors (self-employed and companies) directly involved in the value chain.<br>
              It is to be noted that family workers are excluded."
    />
    <div class="flex flex-col mt-4">
      <div class="flex flex-row flex-wrap items-center justify-center">
        <div class="w-1/2 md:w-1/5">
          <NiceMetric label="Number of actors" :value="totalNumberOfActors" />
        </div>
        <div class="w-full md:w-4/5">
          <BarChart
            v-if="studyData"
            :options="numberOfActorsData"
            @chart-series-click="handleDataChartSeriesClick"
          />
        </div>
      </div>
      <div v-if="selectedStage">
        <MiniChartContainer :currentStage="selectedStage" title="Number of actors">
          <div class="flex flex-row w-full justify-evenly mt-6">
            <div class="w-full flex flex-row justify-center">
              <Ring :options="currentStageNumberOfActorsByTypeOfActorData" />
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
import { getNumberOfActorsData, getNumberOfActorsByTypeOfActorData } from '@/charts/charts'
import { formatNumber } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import Ring from '@charts/Ring.vue'
import NiceMetric from '@typography/NiceMetric.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'

const props = defineProps({
  studyData: Object
})

const selectedStage = ref(null)

const handleDataChartSeriesClick = (event) => {
  if (selectedStage.value == event.name) {
    selectedStage.value = null
  } else {
    selectedStage.value = event.name
  }
}

const { stages, actors } = useActorsAndStages(props)

const numberOfActorsData = computed(() => {
  return getNumberOfActorsData(stages, actors, selectedStage)
})

const totalNumberOfActors = computed(() => {
  return formatNumber(
    numberOfActorsData.value.series[0].data.reduce((res, item) => res + item.value, 0)
  )
})

const currentStageNumberOfActorsByTypeOfActorData = computed(() => {
  const currentStageActors = actors.value.filter((actor) => actor.stage === selectedStage.value)
  return getNumberOfActorsByTypeOfActorData(currentStageActors)
})
</script>

<style scoped lang="scss"></style>
