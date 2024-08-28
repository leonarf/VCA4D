<template>
  <HorizontalSlider 
    :value="value" 
    :min="0.0" 
    :max="1.0" 
    :labels="['0', '1']"
    textLeft="0 indicates <b>perfect equality</b> (where everyone receives an equal share)"
    textRight="1 indicates <b>perfect inequality</b> (where only one recipient or group of recipients receives all the income)"
  />
</template>

<script setup>
import HorizontalSlider from '../../charts/HorizontalSlider.vue';
defineProps({
  value: Number,
})

</script>

<style>
</style>
