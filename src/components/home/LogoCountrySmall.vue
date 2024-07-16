<script setup>
const props = defineProps({
    isoCode: String,
})

</script>

<template>
    <div :class="`fib fi-${isoCode} bg-cover rounded-full logo-country-small shrink-0`"></div>
</template>

<style scoped lang="scss">
.logo-country-small{
    height: 25px;
    width: 25px;
    display: inline-block;
    position: relative;
    margin-right: 5px;
}
</style>