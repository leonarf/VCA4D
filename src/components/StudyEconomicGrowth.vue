<template>
  <article>
    <SectionTitle>
      <h1>What is the contribution of the value chain to <strong>economic growth</strong>?</h1>
    </SectionTitle>
    <p>
      VCA4D analyses show not only the value chain's contribution to the national wealth and to the
      wealth in agriculture. The methodology has also developped data on the distribution of the net
      benefits across the various actors of the value chain, including the contribution left to the
      state budget, after public investment in the value chain.
    </p>

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
    <h3>How <strong>profitable</strong> and viable are the value chain activities for the actors involved?</h3>
    <InfoTitle title="Return on investment (%)" information="percentage of net operating profit in total costs (NB : for
      producers this includes actor revenue)" class="mb-4" />
    <BarChart v-if="studyData" :options="populatedBarChartData"></BarChart>
    <a v-else class="TODO">Data are missing to display this GraphBar</a>
    <h3 class="mt-12">What is the contribution of the value chain to the <strong>public finances</strong>?</h3>
    <div class="flex flex-row items-center ml-12">
      <div class="w-1/3">
        <div class="uppercase font-semibold text-[#303030] text-xl">Public Funds Balance</div>
        <div class="font-semibold text-2xl text-[#C1C1C1]">{{ publicFundsBalance }}</div>
        <div class="mt-2">
          Taxes - Subventions<br>
          Positive if the sector contributes to the government income more than it receives in subsidies and tax break
        </div>
        <div class="TODO uppercase font-semibold text-red-500 text-2xl mt-4 ">-5 % (TODO)</div>
        <div class="uppercase font-semibold text-[#656565] text-base">Public Funds Balance / Public Budget</div>
        <div class="mt-2">
          Net share of the public funds balance in government budget
        </div>
      </div>
      <div class="w-2/3">
        <BarChart v-if="studyData" :options="publicFinancesBarData"></BarChart>
      </div>
    </div>

    <h3 class="mt-12">What is the contribution of the value chain to the <strong>balance of trade</strong>?</h3>
    <p class="TODO">Missing data to be able to display graphic</p>

    <h3 class="mt-12">Is the value chain <strong>viable in the international economy</strong>?</h3>
    <p>
      The VCA4D methodology assesses for each value chain its dependency on international exports as
      well as its capacity to export on international markets with competitive price or on the
      contrary a higher remuneration of the actors supported by porection policies.
    </p>
    <h1>Is it financially attractive to sell abroad ?</h1>

    <InfoTitle title="Domestic resource cost ratio" class="mb-4" />
    <p class="TODO">Missing data to be able to display graphic</p>
    <InfoTitle title="Nominal protection Coefficient" information="Domestic price / Internation parity price"
      class="mb-4" />
    <p class="TODO">Missing data to be able to display graphic</p>
  </article>
</template>

<script setup>
import { computed } from 'vue'

import NiceMetric from '@typography/NiceMetric.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import BarChart from '@charts/BarChart.vue'
import { getReturnOnInvestmentData, getAddedValueCreatorsData, getAddedValueReceiversData, getPublicFinancesData } from '@/charts/charts'
import CurrencyUtils from '@/utils/currencyUtils.js'
import Ring from '@charts/Ring.vue'
import SectionTitle from '@typography/SectionTitle.vue'

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

const stages = computed(() => {
  return props.studyData.data.stages
})

const actors = computed(() => {
  return props.studyData.data.actors
})

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

const publicFundsBalance = computed(() => {
  const balanceValue = convertAmount.value(props.studyData.data.addedValue.government)
  return (balanceValue > 0 ? "+" : "") + prettyAmount.value(balanceValue)
})

const publicFinancesBarData = computed(() => {
  return getPublicFinancesData(stages, actors, convertAmount, prettyAmount)
})

const populatedBarChartData = computed(() => {
  return getReturnOnInvestmentData(stages, actors, convertAmount, prettyAmount)
})
</script>

<style scoped lang="scss"></style>
