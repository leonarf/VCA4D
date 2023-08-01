<template>
  <div class="flex flex-row items-center rounded-3xl px-3 py-2 max-w-[650px] my-8" :style="{ background: scaleColor + '81'}">
    <div class="bg-[#8a8a8a] text-white py-0 px-3 mr-3 font-bold rounded-2xl">{{ counter }}</div>
    <div class="font-bold flex-grow">{{ label }}</div>
    <EvaluationCriterionLevel3ScaleTag :scale="scale" :appreciation="appreciation" />
  </div>
    <ol class="evaluation-criterion-level-2__children">
      <slot></slot>
    </ol>
</template>

<script setup>
import { computed } from 'vue';
import EvaluationCriterionLevel3ScaleTag from './EvaluationCriterionLevel3ScaleTag.vue';

const scaleColors = [
  "#ffac9e",
  "#fec875",
  "#d7e275",
  "#94d99d"
];
const props = defineProps({
  label: String,
  counter: String,
  scale: Number,
  appreciation: String
});

const scaleColor = computed( () => {
  return scaleColors[parseInt(props.scale) - 1];
});

</script>

<style scoped lang="scss">

ol.evaluation-criterion-level-2__children {
  counter-reset: item;
  margin-left: 45px;
}
</style>