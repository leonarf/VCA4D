<script setup>
import { computed } from 'vue'
import { getStageColor } from '@/utils/colors.js'

const props = defineProps({
    currentStage: String,
    title: String
})

const bgColor = computed(() => {
    return {
        backgroundColor: getStageColor(props.currentStage) 
    }
})
</script>

<template>
    <div :style="bgColor" class="rounded-2xl px-12 py-12 w-full">
        <template v-if="currentStage !== ''">
            <span class="text-[#e2e0e0] text-xl"><strong>{{ title }}</strong> in {{ currentStage }}</span>
            <slot></slot>
        </template>
    </div>
</template>

<style scoped lang="scss">
</style>