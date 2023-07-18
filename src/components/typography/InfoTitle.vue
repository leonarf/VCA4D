<script setup>
import QuestionMark from '../../images/icons/info-question.svg'

const props = defineProps({
    title: String,
    information: String
});
</script>

<template>
    <div class="bg-[#EDEDED] py-2 px-4 inline-block" :title="information">
        <div class="flex flex-row space-x-4">
            <h3 class="text-lg uppercase text-[#6B6B6B] font-semibold mb-0">{{ title }}</h3>
            <img :src="QuestionMark" style="height: 27px; width: 27px;">
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>