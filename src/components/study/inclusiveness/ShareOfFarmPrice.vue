<template >
  <div>
    <DataTable
      :rows="tableRows"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import DataTable from "@components/charts/DataTable.vue";
import { formatPercent } from '@utils/format.js'
const props = defineProps({
    data: Array,
})

const tableRows = computed(() => {
  return props.data.map(item => {
    return {
      "Case": item.label,
      "Farm product": item.farmProduct,
      "Farm gate price": `${item.farm} per kg`,
      "End products": item.endProducts,
      "End products unit value": `${item.final} per kg`,
      "Farm value part": formatPercent(item.ratio),
    }
  })
})
</script>

<style>
</style>
