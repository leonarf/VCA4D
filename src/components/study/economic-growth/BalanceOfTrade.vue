<template >
  <h3 class="mt-12">What is the contribution of the value chain to the <strong>balance of trade</strong>?</h3>
  <div class="text-red-500">Default value for now</div>
  <div class="ml-4 md:ml-12">
    <div class="w-3/4 md:w-2/3 mb-4">
      <div class="uppercase font-semibold text-[#303030] text-xl">Balance of trade of the value chain</div>
      <div class="font-semibold text-2xl text-[#C1C1C1]">-1 000 000 &euro;</div>
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
import { ref } from 'vue';
import { useUtils } from '@/utils/utils.js'
const props = defineProps({
  studyData: Object,
  currency: String
})

const { prettyAmount, convertAmount } = useUtils(props);

const optionsImported = ref(getImportedProductsData(prettyAmount.value, convertAmount.value))
const optionsExported = ref(getExportedProductsData(prettyAmount.value, convertAmount.value))
</script>

<style ></style>