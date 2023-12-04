<script setup>
const props = defineProps({
    text: String
})
</script>

<template>
    <div class="flex flex-row w-full items-center">
        <slot name="logo"></slot>
        <div class="max-w-[112px] pl-2 flex-grow">{{ text }}</div>
    </div>
</template>

<style scoped lang="scss"></style>