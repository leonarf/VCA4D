<script setup>
import Tooltip from "@components/Tooltip.vue";
import QuestionMark from '../../images/icons/info-question.svg'
import Svg from '@components/Svg.vue';

const props = defineProps({
    title: String,
    information: String
});
</script>

<template>
  <div class="bg-[#EDEDED] py-2 px-4 inline-block">
    <div class="flex flex-row space-x-4">
      <h3 class="text-lg uppercase text-[#6B6B6B] font-semibold mb-0">{{ title }}</h3>
      <Svg v-if="information" :svg="QuestionMark" class="svg"/>
    </div>
    <Tooltip
      v-if="information"
      :contenu="information"
      :options="{ placement: 'right', maxWidth: 350 }"
    />
  </div>
</template>

<style scoped lang="scss">
    .svg {
        height: 27px;
        width: 27px;
        color: #979797;
    }
</style>
