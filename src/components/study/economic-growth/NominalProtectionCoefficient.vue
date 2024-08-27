<template>
  <Gauge 
    :value="value" 
    :minValue="0" 
    :maxValue="2" 
    :ticks="[0, 1, 2]"
    :hasBackground="false"
    :texts="[
      '<b>Cheaper than market :</b><br /> Domestic price lower than international parity price. The value chain is somewhat competitive and has a potential for export.',
      '<b>Equal to market :</b><br /> Domestic price aligned to international parity price. The government protection on the value chain prices is absent. Global remuneration of the value chain is the same as it would be with international parity prices.',
      '<b>More expensive than market :</b><br /> Domestic price higher than international parity price. The domestic production is less competitive than the imported one.'
    ]"
  />
</template>

<script setup>
import Gauge from '@charts/Gauge.vue';
const props = defineProps({
  value: Number,
})

</script>

<style>
    
</style>
