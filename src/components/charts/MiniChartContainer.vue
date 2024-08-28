<template>
  <div :style="divStyle" class="rounded-2xl px-12 py-12 w-full">
    <template v-if="currentStage !== ''">
      <span class="text-[#303030] text-xl"><strong>{{ title }}</strong> in {{ currentStage }}</span>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getColor } from '@utils/colors.js'

const props = defineProps({
    currentStage: String,
    title: String,
    isEnvironment: {
        type: Boolean,
        required: false,
        default: false
    }
})

const divStyle = computed(() => {
    return {
        border: "1rem solid",
        borderColor: getColor(props.currentStage, props.isEnvironment),
    }
})
</script>

<style scoped lang="scss">
</style>
