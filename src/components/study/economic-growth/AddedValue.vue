<template>
    <div class="flex flex-row flex-wrap justify-evenly w-full items-center my-8 gap-y-8">
      <NiceMetric 
        label="Total value added" 
        :value="totalAddedValueCreators" 
      />
      <NiceMetric
        label="Value added share of the agricultural sector GDP"
        :value="formatPercent(+studyData.valueAddedShareAgriculturalGdp)"
      />
      <NiceMetric
        label="Value added share of national GDP"
        :value="formatPercent(+studyData.valueAddedShareNationalGdp)"
      />
    </div>

    <h2>Is the value chain independent from foreign imports?</h2>

    <InfoTitle title="Rate of integration into domestic economy" information="Total value added / value of production"
      class="mb-4" :class="{'TODO': !studyData.rateOfIntegration}" />
    <HorizontalSlider
        v-if="!!studyData.rateOfIntegration"
        :value="studyData.rateOfIntegration" 
        :min="0.0" 
        :max="1.0" 
        :labels="['0%', '100%']"
        textLeft="<b>Total value added / value of production  &lt; 70 % :</b><br>The chain depends on imports and is not well integrated into the local economy"
        textRight="<b>> 70% :</b><br> Only few goods need to be imported"
        :is-percent="true"
    />
    <h3>Who <strong>creates and receives</strong> value added?</h3>
    <div class="flex flex-row flex-wrap gap-y-8 justify-evenly my-12">
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
import { useCurrencyUtils } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import InfoTitle from '@typography/InfoTitle.vue'
import HorizontalSlider from '@components/charts/HorizontalSlider.vue'
import { formatPercent } from '@utils/format.js'


const props = defineProps({
    studyData: Object,
    currency: String
})

const { prettyAmount, convertAmount } = useCurrencyUtils(props);
const { stages, actors } = useActorsAndStages(props);

const addedValueCreatorsRingChartData = computed(() => {
  return getAddedValueCreatorsData(stages, actors, convertAmount, prettyAmount)
})

const addedValueReceiversRingChartData = computed(() => {
  return getAddedValueReceiversData(stages, actors, convertAmount, prettyAmount, props.studyData.ecoData.addedValue)
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