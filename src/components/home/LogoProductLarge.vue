<script setup>
import { getProductLogo } from '@utils/logos';
import Svg from '@components/Svg.vue';
const props = defineProps({
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
.logo {
    filter: saturate(0);
    opacity: 0.5;
}
</style>
