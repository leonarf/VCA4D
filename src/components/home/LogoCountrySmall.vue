<script setup>
const props = defineProps({
    isoCode: String,
})

</script>

<template>
    <div :class="`fib fi-${isoCode} w-[1.75rem] h-[1.75rem] bg-cover rounded-full mr-2`"></div>
</template>

<style scoped lang="scss">

</style>