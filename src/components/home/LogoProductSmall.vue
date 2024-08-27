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
  <div class="logo">
    <Svg 
      :svg="getProductLogo(productName)" 
    />
  </div>
</template>

<style scoped lang="scss">
    .logo {
        height: 30px; width: 30px;
        background-color: #dfdfdf;
        border-radius: 100%;
        height: 30px; width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.3rem;
    }
</style>
