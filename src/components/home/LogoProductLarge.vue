<script setup>
import { getProductLogo } from '../../utils/logos';
const props = defineProps({
    productName: String,
    alt: {
        required: false,
        type: String
    }
})
</script>

<template>
    <img 
        :src="getProductLogo(productName)" 
        :alt="alt"
        style="height: 75px; width: 75px;"
        class="w-24">
</template>

<style scoped lang="scss">

</style>