<script setup>
const props = defineProps({
    text: String
})
</script>

<template>
    <div class="card-footer">
        <slot name="logo"></slot>
        <span class="">{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
.card-footer {
    display: flex;
    gap: 5px;

    justify-content: left;
}
</style>