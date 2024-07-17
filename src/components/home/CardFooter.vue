<script setup>
const props = defineProps({
    text: String
})
</script>

<template>
    <div class="card-footer">
        <div class="logo">
            <slot name="logo"></slot>
        </div>
        <span class="text">{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
.card-footer {
    display: flex;
    gap: 5px;

    justify-content: left;
    align-items: start;

    .logo {
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }

    .text {
        margin-top: 3px;
    }
}
</style>
