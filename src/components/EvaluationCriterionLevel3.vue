<template>
    <li class="evaluation-criterion-level-3"><div class="evaluation-criterion-level-3__content"><div class="evaluation-criterion-level-3__counter"></div><div class="evaluation-criterion-level-3__label">{{ label }}</div><div class="evaluation-criterion-level-3__scale-container"><EvaluationCriterionLevel3ScaleTag :scale="scale"></EvaluationCriterionLevel3ScaleTag></div></div></li>
</template>

<script setup>
import EvaluationCriterionLevel3ScaleTag from './EvaluationCriterionLevel3ScaleTag.vue';

const props = defineProps({
  label: String,
  scale: {
    type: Number,
    validator(value){
      return value >= 0 && value < 4; // 4 corresponds to scaleLabels.length
    }
  }
});

</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

%rounded-tag {
  background: #8a8a8a;
  border-radius: 12px;
  color: white;
  margin-right: 7px;
  padding: 0px 7px;
  font-weight: bold;
}

li.evaluation-criterion-level-3 {
  display: block;
  padding: 7px;
  margin-top: 5px;
  margin-bottom: 12px;
  font-weight: normal;
  width: 100%;
}
.evaluation-criterion-level-3__content {
  display: flex;
  max-width: 700px;
}
/*
li.evaluation-criterion-level-3:before {
  @extend %rounded-tag;
  content: counters(item, ".") "";
  counter-increment: item;
}
*/
.evaluation-criterion-level-3__counter:before {
  @extend %rounded-tag;
  content: counters(item, ".") "";
  counter-increment: item;
}

.evaluation-criterion-level-3__label {
  flex-grow: 1;
  margin-right: 15px;
  max-width: 470px;
}

.evaluation-criterion-level-3__scale-container {
  width: 100px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: baseline;
  text-align: center;
}

</style>