<template>
  <div class="mt-8">
    <DataTable
      :rows="rowsWithRatio"
      :columns="columns"
    />
  </div>
</template>

<script setup>

import DataTable from "@components/charts/DataTable.vue";
import { formatPercent } from '@utils/format.js'
import { computed } from "vue";
import { useCurrencyUtils } from '@utils/format';

const props = defineProps({
    data: Array,
    currency: String,
    studyData: Object
})

const { prettyAmount, convertAmount } = useCurrencyUtils(props);

const rowsWithRatio = computed(() => {
  return props.data.map(item => ({
    ...item,
    ratio: item.farmPrice / item.endPrice
  }))
})

const columns = [{
    label: "Case",
    field: "label",
    sortable: true,
  }, {
    label: "Farm product",
    field: "farmProduct",
    sortable: true,
  }, {
    label: "Farm gate price",
    field: "farmPrice",
    display: (item) => `${prettyAmount.value(convertAmount.value(item.farmPrice))} per kg`,
    sortable: true,
  }, {
    label: "End products",
    field: "endProducts",
    sortable: true,
  }, {
    label: "End products unit value",
    field: "endPrice",
    display: (item) => `${prettyAmount.value(convertAmount.value(item.endPrice))} per kg`,
    sortable: true,
  }, {
    label: "Farm value part",
    field: "ratio",
    display: item => formatPercent(item.ratio),
    sortable: true,
  }
]
</script>

<style>
</style>
