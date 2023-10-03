<template>
    <div class="flex flex-row items-center rounded-3xl px-3 py-2 max-w-[650px] my-8 cursor-pointer"
        @click="isOpen = !isOpen"
        :style="{ background: getTagColor(group.averageValue) + '81' }">
        <div class="tag-number">{{ getNumberInTitle(group.title) }}
        </div>
        <div class="font-bold flex-grow">{{ removeNumberFromTitle(group.title) }}</div>
        <Tag :scale="group.averageValue" :appreciation="group.averageText" />
    </div>
    <div v-if="isOpen" v-for="question in group.questions" :key="question.text.split(' ')[0]"
        class="flex flex-row items-start w-full my-3 pl-10">
        <div class="tag-number">{{ getNumberInTitle(question.text) }}
        </div>
        <div class="flex-grow">{{ removeNumberFromTitle(question.text) }}</div>
        <Tag :scale="question.scoreValue" :appreciation="question.scoreText" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tag from './Tag.vue'
import { getTagColor } from '@/utils/colors.js'

const props = defineProps({
    group: Object
})

const isOpen = ref(false)

const getNumberInTitle = (title) => title.split(' ')[0]
const removeNumberFromTitle = (title) => title.split(' ').slice(1).join(' ')

</script>

<style scoped lang="scss">
.tag-number {
    @apply bg-[#8a8a8a] text-white py-0 px-3 mr-3 font-bold rounded-2xl
}
</style>