<script setup>
import QuestionMark from '../../images/icons/info-question.svg'
import Svg from '@components/Svg.vue';

const props = defineProps({
    title: String,
    information: String
});
</script>

<template>
    <div class="bg-[#EDEDED] py-2 px-4 inline-block" :title="information">
        <div class="flex flex-row space-x-4">
            <h3 class="text-lg uppercase text-[#6B6B6B] font-semibold mb-0">{{ title }}</h3>
            <Svg :svg="QuestionMark" class="svg"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .svg {
        height: 27px;
        width: 27px;
        fill: #979797;
        stroke: #979797;
    }
</style>
