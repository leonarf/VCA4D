<template>
    <div class="flex mb-2">
        <div class="bg-[#888] w-2 my-1.5 mr-2 ml-0 p-0.5 box-border rounded-md"></div>
        <div class="mr-3.5 w-[300px]">{{ label }}</div>
        <div class="flex grow text-center content-center items-baseline">
            <Tag :scale="parseFloat(question.scoreValue)" :appreciation="question.scoreText" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Tag from './Tag.vue'
const props = defineProps({
  question: Object,
})
const label = computed(() => props.question.text.split(' ').slice(1).join(' '))
</script>

<style scoped lang="scss">
</style>