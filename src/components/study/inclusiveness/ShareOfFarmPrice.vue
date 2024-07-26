<template >
  <div>
    <DataTable
      :rows="props.data"
      :columns=columns
    />
  </div>
</template>

<script setup>

import DataTable from "@components/charts/DataTable.vue";
import { formatPercent } from '@utils/format.js'
const props = defineProps({
    data: Array,
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
    display: item => `${item.farm} per kg`,
    sortable: true,
  }, {
    label: "End products",
    field: "endProducts",
    sortable: true,
  }, {
    label: "End products unit value",
    display: item => `${item.final} per kg`,
    sortable: true,
  }, {
    label: "Farm value part",
    display: item => formatPercent(item.ratio),
    sortable: true,
  }
]
</script>

<style>
</style>
