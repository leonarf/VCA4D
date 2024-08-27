<script setup>
const props = defineProps({
    isoCode: String,
})

</script>

<template>
  <div :class="`fib fi-${isoCode} w-[5rem] h-[3.75rem] rounded bg-cover`"></div>
</template>

<style scoped lang="scss">

</style>