<script setup>
const props = defineProps({
    isoCode: String,
})

</script>

<template>
    <div :class="`fib fi-${isoCode} bg-cover rounded-full logo-country-small` "></div>
</template>

<style scoped lang="scss">
.logo-country-small{
    height: 25px;
    width: 25px;
    display: inline-block;
    position: relative;
    top: 6px;
    margin-right: 5px;
}
</style>