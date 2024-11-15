<template>
  <div class="mt-8">
    <DataTable :rows="rowsWithRatio" :columns="columns" />
  </div>
</template>

<script setup>
import DataTable from '@components/charts/DataTable.vue'
import { formatPercent } from '@utils/format.js'
import { computed } from 'vue'
import { useCurrencyUtils } from '@utils/format'

const props = defineProps({
  data: Array,
  currency: String,
  studyData: Object
})

const { prettyAmount, convertAmount } = useCurrencyUtils(props)

const rowsWithRatio = computed(() => {
  return props.data.map((item) => ({
    ...item,
    ratio: item.farmPrice / item.endPrice
  }))
})

const columns = [
  {
    label: 'Case',
    field: 'label',
    sortable: true
  },
  {
    label: 'Farm gate price',
    field: 'farmPrice',
    display: (item) => formatProductPriceCell(item.farmProduct, item.farmPrice),
    sortable: true
  },
  {
    label: 'End products unit value',
    field: 'endPrice',
    display: (item) => formatProductPriceCell(item.endProducts, item.endPrice),
    sortable: true
  },
  {
    label: 'Farm value part',
    field: 'ratio',
    display: (item) => formatPercent(item.ratio),
    sortable: true
  }
]

function formatProductPriceCell(productName, productPrice) {
  const pricePrettyAmount = prettyAmount.value(convertAmount.value(productPrice))
  return `
    <b>${productName}</b><br>
    ${pricePrettyAmount} per kg
  `
}
</script>

<style></style>
