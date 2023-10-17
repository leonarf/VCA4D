<template>
  <div :title="`Rating: ${scale}`" class="rounded-xl min-w-[9rem] font-bold py-1 text-center" :style="{ background: scaleColor }">{{ appreciation }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getTagColor } from '@/utils/colors.js'

const props = defineProps({
  scale: Number,
  appreciation: String
});

const scaleColor = computed(() => getTagColor(props.scale))

</script>

<style scoped lang="scss"></style>