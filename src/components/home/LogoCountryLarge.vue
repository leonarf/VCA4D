<template>
  <div :class="`fib fi-${isoCode} w-[5rem] h-[3.75rem] rounded bg-cover`" />
</template>

<script setup>
defineProps({
    isoCode: String,
})

</script>

<style scoped lang="scss">

</style>
