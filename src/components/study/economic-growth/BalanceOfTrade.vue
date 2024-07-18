<template >
  <QuestionTitle :class="{'TODO': !hasData}">What is the contribution of the value chain to the <strong>balance of trade</strong>?</QuestionTitle>
  <div v-if="hasData" class="ml-4 md:ml-12">
    <div class="w-3/4 md:w-2/3 mb-4">
      <div class="uppercase font-semibold text-[#303030] text-xl">Balance of trade of the value chain</div>
      <div class="font-semibold text-2xl text-[#C1C1C1]">{{  balanceOfTrade  }}</div>
      <div class="mt-2">
        exported value chain products minus imported value chain inputs
      </div>
    </div>
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
</template>

<script setup>
import BarChart from '@charts/BarChart.vue'
import { getImportedProductsData, getExportedProductsData } from '@/charts/charts'
import { computed } from 'vue';
import { useCurrencyUtils } from '@utils/format'
import QuestionTitle from '@components/study/QuestionTitle.vue';
const props = defineProps({
  studyData: Object,
  currency: String
})

const { prettyAmount, convertAmount } = useCurrencyUtils(props);

const hasData = computed(() => {
  if (!props.studyData?.ecoData?.importExport) {
    return false
  }
  return props.studyData?.ecoData?.importExport.export.length  > 0 || props.studyData?.ecoData?.importExport.import.length  > 0
})

const balanceOfTrade = computed(() => {
  if (!hasData.value) {
    return null
  }
  const imports = props.studyData?.ecoData?.importExport.import.reduce((total, item) => total + item.amount, 0)
  const exports = props.studyData?.ecoData?.importExport.export.reduce((total, item) => total + item.amount, 0)
  return prettyAmount.value(convertAmount.value(exports - imports))
})

const optionsImported = computed(() => getImportedProductsData(props.studyData?.ecoData, prettyAmount.value, convertAmount.value))
const optionsExported = computed(() => getExportedProductsData(props.studyData?.ecoData, prettyAmount.value, convertAmount.value))
</script>

<style ></style>
