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
      "Farm gate price": `${item.farm} per kg`,
      "Final price": `${item.final} per kg`,
      "Ratio": formatPercent(item.ratio),
    }
  })
})
</script>

<style>
</style>