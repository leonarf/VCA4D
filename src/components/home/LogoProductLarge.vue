<script setup>
import { getProductLogo } from '@utils/logos';
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
        style="height: 50px; width: 50px;"
        >
</template>

<style scoped lang="scss">
img{
    filter: saturate(0);
    opacity: 0.5;
}
</style>