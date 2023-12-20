<template>
    <InfoTitle title="Net operating profit by number of actors across actor types"/>
    <div class="flex flex-row items-center mt-4">
        <div class="w-full">
            <BarChart v-if="studyData" :options="netOperatingProfitByNumberActorsData"
            @chartSeriesClick="handleChartSeriesClick"></BarChart>
            <MiniChartContainer :currentStage="currentStage" title="Net Operating Profit per actor">
                <div class="flex flex-row w-full justify-evenly mt-6">
                    <div class="w-full flex flex-row justify-center">
                        <Ring :options="currentStageSplitData"></Ring>
                    </div>
                </div>
            </MiniChartContainer>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import { 
    getNetOperatingProfitByNumberActorsData,
    getNetOperatingProfitPerActorOfStage
} from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import { useCurrencyUtils } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import MiniChartContainer from '@charts/MiniChartContainer.vue'

const props = defineProps({
    studyData: Object,
    currency: String
})

const currentStage = ref('')

const { prettyAmount, convertAmount } = useCurrencyUtils(props);
const { stages, actors } = useActorsAndStages(props);

const netOperatingProfitByNumberActorsData = computed(() => getNetOperatingProfitByNumberActorsData(stages, actors, convertAmount, prettyAmount, currentStage))
const currentStageSplitData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getNetOperatingProfitPerActorOfStage(currentStageActors, convertAmount.value, prettyAmount.value)
})

const availableStages = computed(() => netOperatingProfitByNumberActorsData.value.xAxis.data)

const handleChartSeriesClick = (event) => currentStage.value = event.name

onMounted(() => {
    currentStage.value = availableStages.value[0]
})
</script>

<style scoped lang="scss"></style>