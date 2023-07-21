<template>
    <div class="flex flex-col max-w-[300px]">
        <div class="text-3xl text-[#303030]">{{ value }}</div>
        <div class="uppercase text-base font-semibold text-[#656565]">{{ label }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  value: String
})
</script>

<style scoped lang="scss">
</style>