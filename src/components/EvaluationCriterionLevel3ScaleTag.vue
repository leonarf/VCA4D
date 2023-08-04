<template>
    <div class="rounded-xl min-w-[9rem] font-bold py-1 text-center" :style="{ background: scaleColor }">{{ appreciation }}</div>
</template>

<script setup>
import { computed } from 'vue';

const scaleColors = [
  "#ffac9e",
  "#fec875",
  "#d7e275",
  "#94d99d",
];
const props = defineProps({
  scale: Number,
  appreciation: String
});

const scaleColor = computed( () => {
  return scaleColors[parseInt(props.scale)  - 1];
});

</script>

<style scoped lang="scss">
</style>