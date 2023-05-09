<template>
    <li class="evaluation-criterion-level-2" :style="{ background: scaleColor + '81'}">{{ label }}<span class="evaluation-criterion-level-2__scale" :style="{ background: scaleColor }">{{ scaleLabel }}</span></li>
    <ol class="evaluation-criterion-level-2__children">
      <slot></slot>
    </ol>
</template>

<script setup>
import { computed } from 'vue';

const scaleLabels = [
  "Poor",
  "Rather poor",
  "Rather good",
  "Good",
];
const scaleColors = [
  "#ffac9e",
  "#fec875",
  "#d7e275",
  "#94d99d"
];
const props = defineProps({
  label: String,
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
@import '../../style/colors.scss';

%rounded-tag {
  background: #8a8a8a;
  border-radius: 12px;
  color: white;
  margin-right: 7px;
  padding: 0px 7px;
  font-weight: bold;
}

ol.evaluation-criterion-level-2__children {
  counter-reset: item;
  margin-left: 45px;
}
li.evaluation-criterion-level-2 {
  display: block;
  background: #ffa500a1;
  border-radius: 100px;
  padding: 7px;
  margin-top: 5px;
  margin-bottom: 12px;
  font-weight: bold;
  width: fit-content;
}
li.evaluation-criterion-level-2:before {
  @extend %rounded-tag;
  content: counters(item, ".") "";
  counter-increment: item;
}

.evaluation-criterion-level-2__scale {
  display: inline-block;
  background: orange;
  border-radius: 100px;
  padding: 2px 7px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: bold;
  margin-left: 15px;
  white-space: nowrap;
}

</style>