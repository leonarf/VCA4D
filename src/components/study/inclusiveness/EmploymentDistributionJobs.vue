<template>
    <InfoTitle title="Jobs" class="mt-8" />
    <div class="flex flex-col mb-8">
        <div class="flex flex-row flex-wrap items-start justify-center">
            <div class="w-1/2 md:w-1/5 flex flex-col space-y-4 pt-8">
                <NiceMetric label="Waged employment" :value="totalNumberOfJobs" />
                <NiceMetric label="% female employment" :value="`${percentFemaleEmployment}`" />
            </div>
            <div class="w-full md:w-4/5">
                <BarChart v-if="studyData" :options="numberOfJobsData"
                    @chartSeriesClick="handleNumberOfJobsDataChartSeriesClick"></BarChart>
            </div>
        </div>
        <div>
            <MiniChartContainer :currentStage="currentStage" title="Employment">
                <div class="flex flex-row w-full justify-evenly mt-6">
                    <template v-if="studyData">
                        <template v-if="currentStageEmploymentByTypeOfActorData">
                            <div class="w-1/3 aspect-w-1 aspect-h-1">
                            <Ring :options="currentStageEmploymentByTypeOfActorData"
                            style="height: 300px;"></Ring>
                        </div>
                    </template>
                    <template v-if="currentStageEmploymentByQualificationData">
                        <div class="w-1/3 aspect-w-1 aspect-h-1">
                            <Ring v-if="studyData" :options="currentStageEmploymentByQualificationData"
                            style="height: 300px;"></Ring>
                        </div>
                    </template>
                    <template v-if="currentStageEmploymentByGenderData">
                        <div class="w-1/3 aspect-w-1 aspect-h-1">
                            <Ring v-if="studyData" :options="currentStageEmploymentByGenderData" style="height: 300px;">
                            </Ring>
                        </div>
                    </template>
                </template>
                    
                </div>
            </MiniChartContainer>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BarChart from '@charts/BarChart.vue'
import { 
    getNumberOfJobsData, 
    getEmploymentByTypeOfActorData, 
    getEmploymentByQualificationData, 
    getEmploymentByGenderData,
} from '@/charts/charts'
import { formatNumber, formatPercent } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import Ring from '@charts/Ring.vue'
import NiceMetric from '@typography/NiceMetric.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'

const props = defineProps({
    studyData: Object,
    currency: String
})

const currentStage = ref('')

const { stages, actors } = useActorsAndStages(props);

const numberOfJobsData = computed(() => getNumberOfJobsData(stages, actors, currentStage))

const availableStages = computed(() => numberOfJobsData.value.xAxis.data)

const totalNumberOfJobs = computed(() => {
    return formatNumber(numberOfJobsData.value.series[0].data.map(itemData => itemData.value).reduce((res, item) => res + item, 0))
})

const percentFemaleEmployment = computed(() => {
    const totalFemale = actors.value.reduce((res, actor) => res + (actor.employment?.totalFemale), 0)
    if (isNaN(totalFemale)) {
        return "-"
    }
    const total = actors.value.reduce((res, actor) => res + (actor.employment?.total || 0), 0)
    return formatPercent(totalFemale / total)
})

const currentStageEmploymentByTypeOfActorData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getEmploymentByTypeOfActorData(currentStageActors) 
})


const currentStageEmploymentByQualificationData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getEmploymentByQualificationData(currentStageActors)
})


const currentStageEmploymentByGenderData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getEmploymentByGenderData(currentStageActors)
})

const handleNumberOfJobsDataChartSeriesClick = (event) => currentStage.value = event.name

onMounted(() => {
    currentStage.value = availableStages.value[0]
})
</script>

<style scoped lang="scss"></style>