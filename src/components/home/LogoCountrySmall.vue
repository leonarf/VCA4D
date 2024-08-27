<script setup>
const props = defineProps({
    isoCode: String,
})

</script>

<template>
  <div :class="`fib fi-${isoCode} bg-cover rounded-full logo-country-small`"></div>
</template>

<style scoped lang="scss">
.logo-country-small{
    height: 30px;
    width: 30px;
    display: inline-block;
    position: relative;
}
</style>
