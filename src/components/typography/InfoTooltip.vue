<template>
  <div>
    <Svg
      class="question-mark"
      :svg="QuestionMark"
    />
    <Tooltip
      :contenu="text"
      :options="{ placement: 'right', maxWidth: 350 }"
    />
  </div>
</template>

<script setup>
import Tooltip from "@components/Tooltip.vue";
import Svg from "@components/Svg.vue";
import QuestionMark from '../../images/icons/info-question.svg'

defineProps({
  text: String,
})
</script>

<style scoped lang="scss">
  .question-mark {
    height: 1em;
  }
</style>
