<script setup>
const props = defineProps({
    text: String
})
</script>

<template>
    <div class="">
        <slot name="logo"></slot>
        <span class="">{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">


</style>