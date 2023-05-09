<template>
    <div class="nice-metric">
        <div class="nice-metric__value">{{ value }}</div>
        <div class="nice-metric__label">{{ label }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  value: String
})
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

.nice-metric {
    display: flex;
    flex-direction: column;
    max-width: 240px;
}

.nice-metric__value {
    font-size: 20px
}

.nice-metric__label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
    color: #5c5c5c;
}

</style>