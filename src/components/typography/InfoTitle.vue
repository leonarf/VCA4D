<template>
  <div 
    v-tooltip.right="{
      content: sanitize(information),
      html: true,
      distance: 8
    }"
    class="bg-[#EDEDED] py-2 px-4 inline-block"
  >
    <div class="flex flex-row space-x-4">
      <h3 class="text-lg uppercase text-[#6B6B6B] font-semibold mb-0">{{ title }}</h3>
      <Svg v-if="information" :svg="QuestionMark" class="svg" />
    </div>
  </div>
</template>

<script setup>
import { vTooltip } from 'floating-vue'
import sanitize from "sanitize-html";
import QuestionMark from '../../images/icons/info-question.svg'
import Svg from '@components/Svg.vue';

defineProps({
    title: String,
    information: String
});
</script>

<style scoped lang="scss">
    .svg {
        height: 27px;
        width: 27px;
        color: #979797;
    }
</style>
