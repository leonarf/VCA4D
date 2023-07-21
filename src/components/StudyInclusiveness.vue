<template>
    <article class="mt-8">
        <SectionTitle>
            <h1>Is the economic growth <strong>inclusive</strong>?</h1>
        </SectionTitle>
        <p>A value chain is inclusive in one country not only by the number of jobs created, but also considering these
            jobs' quality. The way the income is distributed across the value chain from the samll producers to the
            consumers also tell about the power dynamics and the policies that may be improved for more inclusiveness. For
            detailed information on the value chain's impact on the most vulnerable groups, like women and youth, please go
            directly to Social sustainability part (*link).</p>

        <h3 class="mt-8">How is <strong>employment</strong> distributed across the value chain?</h3>

        <p>Methodology</p>
        <p>Employment data only relate to full time equivalent jobs for this specific value chain and do not include total
            employment of each actor. In addition, the informal family workforce at the agricultural production level is not
            accounted for.</p>
        <InfoTitle title="Number of actors" class="mb-4 mt-8" />
        <div class="flex flex-row items-center mt-4">
            <div class="w-1/5">
                <NiceMetric label="Number of actors" :value="totalNumberOfActors" />
            </div>
            <div class="w-4/5">
                <BarChart v-if="studyData" :options="numberOfActorsData"></BarChart>
            </div>
        </div>
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

        <h3>How is <strong>income</strong> distributed across actors of the value chain?</h3>
        <p>Actors that are in small numbers but receive an important share of the value chain's net operating profit are in
            a stronger position of negociation in front of actore that are more divided.</p>
        <p>NB: The income data only relate to this specific value chain: the data do not include any other income from any
            other activity.</p>
        <InfoTitle title="Net operating profit across actor types" class="mb-4 mt-8" />
        <div class="flex flex-row items-center mt-4 mb-4">
            <div class="w-full">
                <BarChart v-if="studyData" :options="netOperatingProfitData"></BarChart>
            </div>
        </div>
        <InfoTitle title="Net operating profit by number of actors across actor types" class="mb-4 mt-8" />
        <div class="flex flex-row items-center mt-4">
            <div class="w-full">
                <BarChart v-if="studyData" :options="netOperatingProfitByNumberActorsData"></BarChart>
            </div>
        </div>
        <br>
        <p class="TODO">Number of actors : c'est le même graphique qu'en haut de la page, est-ce qu'on le remet vraiment?
        </p>

        <h3>What is the impact of the <strong>governance systems</strong> on income distribution?</h3>
        <InfoTitle title="Share of farm gate price in final price" class="mb-4 mt-8" />
        <p class="TODO">Missing data to be able to display graphic</p>
        <InfoTitle title="Gini index" class="mb-4 mt-8" />
        <p class="TODO">Missing data to be able to display graphic</p>
    </article>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import BarChart from './charts/BarChart.vue'
import { 
    getNumberOfActorsData, 
    getNumberOfJobsData, 
    getEmploymentByTypeOfActorData, 
    getEmploymentByQualificationData, 
    getEmploymentByGenderData,
    getNetOperatingProfitData,
    getNetOperatingProfitByNumberActorsData
} from '@/charts/charts'
import Ring from './charts/Ring.vue'
import NiceMetric from './NiceMetric.vue'
import SectionTitle from './typography/SectionTitle.vue'
import InfoTitle from './typography/InfoTitle.vue'
import CurrencyUtils from '@/utils/currencyUtils.js'

const props = defineProps({
    studyData: Object,
    currency: String
})

const currentStage = ref('')

const prettyAmount = computed(() => {
    return (amount) => CurrencyUtils.prettyFormatAmount(amount, props.currency)
})

const convertAmount = computed(() => {
    return (amount) => CurrencyUtils.getValueInCurrency(amount, props.studyData.localCurrency, props.currency, props.studyData.year)
})

const formatNumber = (value) => value ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"

const stages = computed(() => props.studyData.data.stages)
const actors = computed(() => props.studyData.data.actors)

const numberOfActorsData = computed(() => {
    return getNumberOfActorsData(stages, actors)
})

const totalNumberOfActors = computed(() => {
    return formatNumber(numberOfActorsData.value.series[0].data.reduce((res, item) => res + item, 0))
})

const numberOfJobsData = computed(() => getNumberOfJobsData(stages, actors, currentStage))

const availableStages = computed(() => numberOfJobsData.value.xAxis.data)


const totalNumberOfJobs = computed(() => {
    return formatNumber(numberOfJobsData.value.series[0].data.map(itemData => itemData.value).reduce((res, item) => res + item, 0))
})

const percentFemaleEmployment = computed(() => {
    let femaleTotal = 0
    let total = 0
    for (const actor of actors.value) {
        femaleTotal += actor.employment?.femaleTotal || 0
        total += actor.employment?.total || 0
    }
    return parseInt(femaleTotal / total * 100)
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


const netOperatingProfitData = computed(() => getNetOperatingProfitData(stages, actors, convertAmount, prettyAmount))


const netOperatingProfitByNumberActorsData = computed(() => getNetOperatingProfitByNumberActorsData(stages, actors, convertAmount, prettyAmount))

const handleNumberOfJobsDataChartSeriesClick = (event) => currentStage.value = event.name

onMounted(() => {
    currentStage.value = availableStages.value[0]
})
</script>

<script>
//@ts-check

import '../types.js'
export default {
    name: 'StudyEconomicGrowth',
    props: ['studyData'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss"></style>