<template>
    <div class="flex flex-col max-w-[300px]" :class="{'TODO': !value}" >
        <div class="text-3xl text-[#303030]">{{ (value ? value : "") + (isPercent ? " %" : "" )}}</div>
        <div class="uppercase text-base font-semibold text-[#656565]">{{ label }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
  value: String,
  label: String,
  isPercent: Boolean
})
</script>

<style scoped lang="scss">
</style>