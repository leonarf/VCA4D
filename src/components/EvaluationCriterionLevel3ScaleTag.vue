<template>
    <span class="evaluation-criterion-level-3__scale" :style="{ background: scaleColor }">{{ scaleLabel }}</span>
</template>

<script setup>
import { computed } from 'vue';

const scaleLabels = [
  "Not at all",
  "Rather not",
  "Rather yes",
  "Yes",
];
const scaleColors = [
  "#ffac9e",
  "#fec875",
  "#d7e275",
  "#94d99d"
];
const props = defineProps({
  scale: {
    type: Number,
    validator(value){
      return value >= 0 && value < 4; // 4 corresponds to scaleLabels.length
    }
  }
});

const scaleLabel = computed( () => {
  return scaleLabels[props.scale];
});

const scaleColor = computed( () => {
  return scaleColors[props.scale];
});

</script>

<style scoped lang="scss">

.evaluation-criterion-level-3__scale {
  display: inline-block;
  background: orange;
  border-radius: 100px;
  padding: 2px 14px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: bold;
  white-space: nowrap;
  flex-grow: 1;
}

</style>