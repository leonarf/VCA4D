<template>
  <QuestionTitle>What is the contribution of the value chain to the
    <strong>balance of trade</strong>?</QuestionTitle>
  <div v-if="hasData" class="ml-4 md:ml-12 mt-8">
    <InfoTitle
      title="Balance of trade of the value chain"
      information="Importing intermediate consumption goods for the value chain activities denotes losing
        foreign currency for the national economy while value chain exports (if any) bring foreign currency gains"
    />
    <div class="font-semibold text-2xl text-[#C1C1C1]">{{ balanceOfTrade }}</div>
    <div class="bg-[#DBEDDD] rounded-xl px-6 py-4">
      <div class="font-bold text-xl">Imported and exported goods</div>
      <div class="flex flex-row w-full">
        <div class="w-1/2 text-center">
          <BarChart v-if="studyData" :options="optionsImported" />
        </div>
        <div class="w-1/2">
          <BarChart v-if="studyData" :options="optionsExported" />
        </div>
      </div>
    </div>
  </div>
  <NoDataBadge v-else />
</template>

<script setup>
import BarChart from '@charts/BarChart.vue'
import { getStackedBarChart } from '@/charts/charts'
import { computed } from 'vue'
import { useCurrencyUtils } from '@utils/format'
import { COLORS_IMPORTED_PRODUCTS, COLORS_EXPORTED_PRODUCTS } from '@utils/colors.js'
import QuestionTitle from '@components/study/QuestionTitle.vue'
import NoDataBadge from '@components/study/NoDataBadge.vue'
import InfoTitle from '@typography/InfoTitle.vue'


const props = defineProps({
  studyData: Object,
  currency: String
})

const { prettyAmount, convertAmount } = useCurrencyUtils(props)

const hasData = computed(() => {
  if (!props.studyData?.ecoData?.importExport) {
    return false
  }
  return (
    props.studyData?.ecoData?.importExport.export.length > 0 ||
    props.studyData?.ecoData?.importExport.import.length > 0
  )
})

const balanceOfTrade = computed(() => {
  if (!hasData.value) {
    return null
  }
  const imports = props.studyData?.ecoData?.importExport.import.reduce(
    (total, item) => total + item.amount,
    0
  )
  const exports = props.studyData?.ecoData?.importExport.export.reduce(
    (total, item) => total + item.amount,
    0
  )
  return prettyAmount.value(convertAmount.value(exports - imports))
})

const maxImportExportValue = computed(() => {
  if (!hasData.value) {
    return null
  }
  const exportTotal = props.studyData?.ecoData?.importExport.export
    .map((item) => item.amount)
    .reduce((res, curr) => res + curr, 0)
  const importTotal = props.studyData?.ecoData?.importExport.import
    .map((item) => item.amount)
    .reduce((res, curr) => res + curr, 0)
  return Math.max(exportTotal, importTotal)
})

function sortProducts(products) {
  return products.sort((product1, product2) => {
    return product2.value - product1.value
  })
}

const optionsImported = computed(() => {
  const dataImported = props.studyData?.ecoData.importExport.import.map((importItem, index) => ({
    value: importItem.amount,
    name: importItem.label,
    color: COLORS_IMPORTED_PRODUCTS[index % COLORS_IMPORTED_PRODUCTS.length]
  }))

  let dataSorted = sortProducts(dataImported)

  let result = getStackedBarChart(
    'IMPORTED INPUTS',
    dataSorted,
    maxImportExportValue.value,
    prettyAmount.value,
    convertAmount.value
  )
  console.log('option pour iported', result)
  return result
})
const optionsExported = computed(() => {
  const dataExported = props.studyData?.ecoData.importExport.export.map((importItem, index) => ({
    value: importItem.amount,
    name: importItem.label,
    color: COLORS_EXPORTED_PRODUCTS[index % COLORS_EXPORTED_PRODUCTS.length]
  }))

  let dataSorted = sortProducts(dataExported)

  return getStackedBarChart(
    'EXPORTED PRODUCTS',
    dataSorted,
    maxImportExportValue.value,
    prettyAmount.value,
    convertAmount.value
  )
})
</script>

<style></style>
