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
        style="height: 30px; width: 30px;"
        class="bg-[#DFDFDF] rounded-full px-1 py-1"
        >
</template>

<style scoped lang="scss">

</style>