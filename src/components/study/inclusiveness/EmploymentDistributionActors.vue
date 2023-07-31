<template>
    <InfoTitle title="Number of actors" class="mb-4 mt-8" />
    <div class="flex flex-row items-start mt-4">
        <div class="w-1/5">
            <NiceMetric label="Number of actors" :value="totalNumberOfActors" />
        </div>
        <div class="w-4/5">
            <BarChart v-if="studyData" :options="numberOfActorsData"
                        @chartSeriesClick="handleDataChartSeriesClick"></BarChart>
            <div class="bg-[#F7E9EB] rounded-2xl px-12 py-12 w-full">
                <template v-if="currentStage !== ''">
                    <span class="text-[#303030] text-xl"><strong>Number of actors</strong> in {{ currentStage }}</span>
                    <div class="flex flex-row w-full justify-evenly mt-6">
                        <div class="w-full flex flex-row justify-center">
                            <Ring :options="currentStageNumberOfActorsByTypeOfActorData"
                                style="height: 300px; width: 450px"></Ring>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BarChart from '@charts/BarChart.vue'
import { 
    getNumberOfActorsData,
    getNumberOfActorsByTypeOfActorData,
} from '@/charts/charts'
import { formatNumber } from '@/utils/utils.js'
import Ring from '@charts/Ring.vue'
import NiceMetric from '@typography/NiceMetric.vue'
import InfoTitle from '@typography/InfoTitle.vue'

const props = defineProps({
    studyData: Object,
})

const currentStage = ref('')

const stages = computed(() => props.studyData.data.stages)
const actors = computed(() => props.studyData.data.actors)

const numberOfActorsData = computed(() => {
    return getNumberOfActorsData(stages, actors, currentStage)
})

const availableStages = computed(() => numberOfActorsData.value.xAxis.data)


const totalNumberOfActors = computed(() => {
    return formatNumber(numberOfActorsData.value.series[0].data.reduce((res, item) => res + item.value, 0))
})

const currentStageNumberOfActorsByTypeOfActorData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getNumberOfActorsByTypeOfActorData(currentStageActors)
})

const handleDataChartSeriesClick = (event) => currentStage.value = event.name

onMounted(() => {
    currentStage.value = availableStages.value[0]
})

</script>

<style scoped lang="scss"></style>