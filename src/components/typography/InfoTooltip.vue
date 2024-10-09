<template>
  <Svg
    v-tooltip.right="{
      content: sanitize(text),
      html: true,
      distance: 10
    }"
    class="question-mark"
    :svg="QuestionMark"
  />
</template>

<script setup>
import { vTooltip } from "floating-vue";
import Svg from "@components/Svg.vue";
import QuestionMark from '../../images/icons/info-question.svg'
import sanitize from "sanitize-html";

defineProps({
  text: String,
})
</script>

<style scoped lang="scss">
  .question-mark {
    height: 1em;
  }
</style>
