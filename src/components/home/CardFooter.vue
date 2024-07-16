<script setup>
const props = defineProps({
    text: String
})
</script>

<template>
    <div class="card-footer">
        <div class="fixed-height-logo">
            <slot name="logo"></slot>
        </div>
        <span class="">{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
.card-footer {
    display: flex;
    gap: 5px;

    justify-content: left;

    .fixed-height-logo {
        height: 30px;
    }
}
</style>