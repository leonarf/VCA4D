<template>
    <div class="browsable-radar-chart__item__question">
        <div class="browsable-radar-chart__item__question__highlight"></div>
        <div class="browsable-radar-chart__item__question__label">{{ label }}</div>
        <div class="browsable-radar-chart__item__question__answer__container"><EvaluationCriterionLevel3ScaleTag :scale="scale" :appreciation="appreciation"></EvaluationCriterionLevel3ScaleTag></div>
    </div>
</template>

<script setup>
import EvaluationCriterionLevel3ScaleTag from './EvaluationCriterionLevel3ScaleTag.vue';
const props = defineProps({
  label: String,
  scale: Number,
  appreciation: String
})
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

.browsable-radar-chart__item__question {
    display: flex;
    margin-bottom: 5px;
}

.browsable-radar-chart__item__question__label {
  width: 300px;
  margin-right: 15px;
}

.browsable-radar-chart__item__question__highlight {
    background: #444;
    width: 5px;
    margin: 5px 7px 5px 0;
    box-sizing: border-box;
    padding: 2px;
    border-radius: 5px;
}

.browsable-radar-chart__item__question__answer__container {
  flex-grow: 1;
  display: flex;
  text-align: center;
  align-content: center;
  align-items: baseline;
}

</style>