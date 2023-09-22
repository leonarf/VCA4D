<template>
    <div v-for="(part, index) in studyData.socialData" :key="part.title">
        <h2 class="text-xl underline decoration-4 underline-offset-4 text-[#151515]">{{ part.title }}</h2>
        <a :id="`social_anchor_${index + 1}`"></a>
        <template v-for="group in part.groups" :key="group.title">
            <div class="flex flex-row items-center rounded-3xl px-3 py-2 max-w-[650px] my-8"
                :style="{ background: getTagColor(group.averageValue) + '81' }">
                <div class="tag-number">{{ getNumberInTitle(group.title) }}
                </div>
                <div class="font-bold flex-grow">{{ removeNumberFromTitle(group.title) }}</div>
                <Tag :scale="group.averageValue" :appreciation="group.averageText" />
            </div>
            <div v-for="question in group.questions" :key="question.text.split(' ')[0]"
                class="flex flex-row items-start w-full my-3 pl-10">
                <div class="tag-number">{{ getNumberInTitle(question.text) }}
                </div>
                <div class="flex-grow">{{ removeNumberFromTitle(question.text) }}</div>
                <Tag :scale="question.scoreValue" :appreciation="question.scoreText" />
            </div>
        </template>
    </div>
</template>

<script setup>
import Tag from './Tag.vue'
import { getTagColor } from '@/utils/utils.js'

const props = defineProps({
    studyData: Object
})

const getNumberInTitle = (title) => title.split(' ')[0]
const removeNumberFromTitle = (title) => title.split(' ').slice(1).join(' ')

console.log('studyData.socialData', props.studyData.socialData)
</script>

<style scoped lang="scss">
.tag-number {
    @apply bg-[#8a8a8a] text-white py-0 px-3 mr-3 font-bold rounded-2xl
}
</style>