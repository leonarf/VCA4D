<script setup>
import { getProductLogo } from '@utils/logos';
import Svg from '@components/Svg.vue';
defineProps({
    productName: String,
    alt: {
        required: false,
        type: String
    }
})
</script>

<template>
  <Svg 
    :svg="getProductLogo(productName)" 
    class="logo"
    style="height: 50px; width: 50px"
  />
</template>

<style scoped lang="scss">
</style>
