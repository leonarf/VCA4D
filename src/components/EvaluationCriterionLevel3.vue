<template>
  <li>
    <div class="flex flex-row items-start w-full my-3">
      <div class="bg-[#8a8a8a] text-white py-0 px-3 mr-3 font-bold rounded-2xl">{{ counter }}</div>
      <div class="flex-grow text-justify mx-3">{{ label }}</div>
      <EvaluationCriterionLevel3ScaleTag :scale="scale" :appreciation="appreciation" />
    </div>
  </li> 
</template>

<script setup>
import EvaluationCriterionLevel3ScaleTag from './EvaluationCriterionLevel3ScaleTag.vue';

const props = defineProps({
  label: String,
  counter: String,
  scale: Number,
  comment: String,
  appreciation: String
});

</script>

<style scoped lang="scss">
</style>