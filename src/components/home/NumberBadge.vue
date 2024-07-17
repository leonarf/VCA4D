<script setup>
const props = defineProps({
    value: Number
})
</script>

<template>
    <div class="bg-[#6C6C6C] text-white w-[1.75rem] h-[1.75rem] text-center rounded-full text-sm leading-[1.75rem] font-semibold number-badge"
        >
        {{ value }}
    </div>
</template>

<style scoped lang="scss">
.number-badge{
    height: 28px;
    width: 28px;
}
</style>
