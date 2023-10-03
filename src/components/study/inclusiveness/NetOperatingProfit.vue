<template>
    <InfoTitle title="Net operating profit across actor types"/>
    <div class="flex flex-row items-center mt-4 mb-4">
        <div class="w-full">
            <BarChart v-if="studyData" :options="netOperatingProfitData"
            @chartSeriesClick="handleNetOperatingProfitDataChartSeriesClick"></BarChart>
            <MiniChartContainer :currentStage="currentStage" title="Net Operating Profit">
                <div class="flex flex-row w-full justify-evenly mt-6">
                    <div class="w-full flex flex-row justify-center">
                        <Ring :options="currentStageNetOperatingProfitByTypeOfActorData"
                            style="height: 300px; width: 450px"></Ring>
                    </div>
                </div>
            </MiniChartContainer>
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
import { useCurrencyUtils } from '@/utils/format.js'
import { useActorsAndStages } from '@/utils/misc.js'
import MiniChartContainer from '@charts/MiniChartContainer.vue'

const props = defineProps({
    studyData: Object,
    currency: String
})

const currentStage = ref('')

const { prettyAmount, convertAmount } = useCurrencyUtils(props);
const { stages, actors } = useActorsAndStages(props);

const netOperatingProfitData = computed(() => getNetOperatingProfitData(stages, actors, convertAmount, prettyAmount, currentStage))

const handleNetOperatingProfitDataChartSeriesClick = (event) => currentStage.value = event.name

const availableStages = computed(() => netOperatingProfitData.value.xAxis.data)

const currentStageNetOperatingProfitByTypeOfActorData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)
    return getNetOperatingProfitByTypeOfActorData(currentStageActors, convertAmount.value, prettyAmount.value)
})

onMounted(() => {
    currentStage.value = availableStages.value[0]
})
</script>

<style scoped lang="scss"></style>