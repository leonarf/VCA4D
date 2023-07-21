<template>
    <InfoTitle title="Net operating profit by number of actors across actor types"/>
    <div class="flex flex-row items-center mt-4">
        <div class="w-full">
            <BarChart v-if="studyData" :options="netOperatingProfitByNumberActorsData"></BarChart>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import BarChart from '@charts/BarChart.vue'
import { 
    getNetOperatingProfitByNumberActorsData
} from '@/charts/charts'
import InfoTitle from '@typography/InfoTitle.vue'
import CurrencyUtils from '@/utils/currencyUtils.js'

const props = defineProps({
    studyData: Object,
    currency: String
})

const prettyAmount = computed(() => {
    return (amount) => CurrencyUtils.prettyFormatAmount(amount, props.currency)
})

const convertAmount = computed(() => {
    return (amount) => CurrencyUtils.getValueInCurrency(amount, props.studyData.localCurrency, props.currency, props.studyData.year)
})

const stages = computed(() => props.studyData.data.stages)
const actors = computed(() => props.studyData.data.actors)

const netOperatingProfitByNumberActorsData = computed(() => getNetOperatingProfitByNumberActorsData(stages, actors, convertAmount, prettyAmount))

</script>

<style scoped lang="scss"></style>