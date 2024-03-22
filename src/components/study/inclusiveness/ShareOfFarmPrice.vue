<template >
  <div>
    <TableauDeDonnées
            :données="donnéesPourLeTableau"
          />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import TableauDeDonnées from "@components/charts/TableauDeDonnées.vue";
import { formatPercent } from '@utils/format.js'
const props = defineProps({
    data: Array,
})

const donnéesPourLeTableau = computed(() => {
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
