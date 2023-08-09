<template>
    <div class="flex flex-row justify-evenly w-full items-center my-8">
      <NiceMetric label="Total value added" :value="`${totalAddedValueCreators}`" />
      <NiceMetric class="TODO" label="Value added share of the agricultural sector GDP" value="%" />
      <NiceMetric class="TODO" label="Value added share of national GDP" value="%" />
    </div>

    <h2>Is the chain independent from foreign imports?</h2>

    <InfoTitle title="Rate of integration into domestic economy" information="Total value added / value of production"
      class="mb-4" />
    <p class="TODO mb-6">Missing data to be able to display graphic</p>
    <h3>Who <strong>creates and receives</strong> value added?</h3>
    <div class="flex flex-row justify-evenly my-12">
      <div class="flex flex-col items-center">
        <Ring v-if="studyData" :options="addedValueCreatorsRingChartData" style="height: 400px; width: 500px;"></Ring>
        <div class="font-semibold">{{ totalAddedValueCreators }}</div>
      </div>
      <div class="flex flex-col items-center">
        <Ring v-if="studyData" :options="addedValueReceiversRingChartData" style="height: 400px; width: 500px;"></Ring>
        <div class="font-semibold">{{ totalAddedValueReceivers }}</div>
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Ring from '@charts/Ring.vue'
import { 
  getAddedValueCreatorsData, 
  getAddedValueReceiversData
} from '@/charts/charts'
import NiceMetric from '@typography/NiceMetric.vue'
import CurrencyUtils from '@/utils/currencyUtils.js'

const props = defineProps({
    studyData: Object,
    currency: String
})
const prettyAmount = computed(() => (amount) => CurrencyUtils.prettyFormatAmount(amount, props.currency))
const convertAmount = computed(() => (amount) => CurrencyUtils.getValueInCurrency(amount, props.studyData.localCurrency, props.currency, props.studyData.year))
const stages = computed(() => props.studyData.data.stages)
const actors = computed(() => props.studyData.data.actors)


const addedValueCreatorsRingChartData = computed(() => {
  return getAddedValueCreatorsData(stages, actors, convertAmount, prettyAmount)
})

const addedValueReceiversRingChartData = computed(() => {
  return getAddedValueReceiversData(stages, actors, convertAmount, prettyAmount, props.studyData.data.addedValue)
})

const totalAddedValueReceivers = computed(() => {
  return prettyAmount.value(addedValueReceiversRingChartData.value.series[0].data.reduce((res, item) => res + item.value, 0))
})

const totalAddedValueCreators = computed(() => {
  return prettyAmount.value(addedValueCreatorsRingChartData.value.series[0].data.reduce((res, item) => res + item.value, 0))
})
</script>

<style scoped lang="scss">
</style>