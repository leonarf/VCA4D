<template >
  <Gauge
    :value="value"
    :minValue="0"
    :maxValue="2"
    :ticks="[0, 0.5, 1, 1.5, 2]"
    :hasBackground="false"
    :texts="[
      '<b>Viable in the global economy :</b><br /> the cost of domestic factors (labour, capital, land, environmental goods) is lower than the value they produce.',
      '<b>Considered not viable within the gobal economy :</b><br /> inefficient use of domestic resources, poor remuneration of domestic factors, this a non-competitive Value Chain into the international economy.'
    ]"
  />
</template>

<script setup>
import Gauge from '@charts/Gauge.vue'
const props = defineProps({
  value: Number
})
</script>

<style>
</style>
