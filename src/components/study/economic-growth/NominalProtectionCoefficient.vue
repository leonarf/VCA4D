<template >
    <Gauge 
        :value="value" 
        :minValue="0" 
        :maxValue="2" 
        :ticks="[0, 1, 2]"
        :hasBackground="false"
        :texts="[
            '<b>Cheaper than market :</b><br /> Domestic price lower than international parity price. The value chain is somewhat competitive and has a potential for export.',
            '<b>Equal to market :</b><br /> Domestic price aligned to international parity price. Corresponds to absence of governement protection on the value chain prices. Global remuneration of the chain doesn’t exceed parity prices.',
            '<b>More expensive than market :</b><br />  Domestic price higher than international parity price.  The local production is less competitive than the imported one.'
        ]"/>
</template>

<script setup>
import Gauge from '@charts/Gauge.vue';
const props = defineProps({
  value: Number,
})

</script>

<style>
    
</style>