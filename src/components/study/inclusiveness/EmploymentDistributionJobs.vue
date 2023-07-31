<template>
    <InfoTitle title="Jobs" class="mt-8" />
    <div class="flex flex-row items-start mb-8">
        <div class="w-1/5 flex flex-col space-y-4 pt-8">
            <NiceMetric label="Waged employment" :value="totalNumberOfJobs" />
            <NiceMetric label="% female employment" :value="`${percentFemaleEmployment}%`" />
        </div>
        <div class="w-4/5">
            <BarChart v-if="studyData" :options="numberOfJobsData"
                @chartSeriesClick="handleNumberOfJobsDataChartSeriesClick"></BarChart>
            <div class="bg-[#F7E9EB] rounded-2xl px-12 py-12">
                <template v-if="currentStage !== ''">
                    <span class="text-[#303030] text-xl"><strong>Employment</strong> in {{ currentStage }}</span>
                    <div class="flex flex-row w-full justify-evenly mt-6">
                        <div class="w-1/3 aspect-w-1 aspect-h-1">
                            <Ring v-if="studyData" :options="currentStageEmploymentByTypeOfActorData"
                                style="height: 300px;"></Ring>
                        </div>
                        <div class="w-1/3 aspect-w-1 aspect-h-1">
                            <Ring v-if="studyData" :options="currentStageEmploymentByQualificationData"
                                style="height: 300px;"></Ring>
                        </div>
                        <div class="w-1/3 aspect-w-1 aspect-h-1">
                            <Ring v-if="studyData" :options="currentStageEmploymentByGenderData" style="height: 300px;">
                            </Ring>
                        </div>
                    </div>
                </template>
            </div>
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
import { formatNumber } from '@/utils/utils.js'
import Ring from '@charts/Ring.vue'
import NiceMetric from '@typography/NiceMetric.vue'
import InfoTitle from '@typography/InfoTitle.vue'

const props = defineProps({
    studyData: Object,
    currency: String
})

const currentStage = ref('')

const stages = computed(() => props.studyData.data.stages)
const actors = computed(() => props.studyData.data.actors)

const numberOfJobsData = computed(() => getNumberOfJobsData(stages, actors, currentStage))

const availableStages = computed(() => numberOfJobsData.value.xAxis.data)


const totalNumberOfJobs = computed(() => {
    return formatNumber(numberOfJobsData.value.series[0].data.map(itemData => itemData.value).reduce((res, item) => res + item, 0))
})

const percentFemaleEmployment = computed(() => {
    const totalFemale = actors.value.reduce((res, actor) => res + (actor.employment?.totalFemale || 0), 0)
    const total = actors.value.reduce((res, actor) => res + (actor.employment?.total || 0), 0)
    return parseInt(totalFemale / total * 100)
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