<template>
  <div :class="`fib fi-${isoCode} bg-cover rounded-full logo-country-small`" />
</template>

<script setup>
defineProps({
    isoCode: String,
})

</script>

<style scoped lang="scss">
.logo-country-small{
    height: 30px;
    width: 30px;
    display: inline-block;
    position: relative;
}
</style>
