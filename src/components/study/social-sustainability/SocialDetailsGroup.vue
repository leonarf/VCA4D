<template>
  <div
    class="social-details-group flex flex-row items-center rounded-3xl px-3 py-2 max-w-[650px] my-8 cursor-pointer"
    :style="{ '--color': getSocialScoreColor(group.averageValue) + '81', '--color-hover': getSocialScoreColor(group.averageValue) }"
    @click="isOpen = !isOpen"
  >
    <div class="tag-number">
      {{ getNumberInTitle(group.title) }}
    </div>
    <div class="font-bold flex-grow">{{ removeNumberFromTitle(group.title) }}</div>
    <Tag :scale="parseFloat(group.averageValue)" />
  </div>
  <template v-if="isOpen">
    <div
      v-for="question in group.questions"
      :key="question.text.split(' ')[0]"
      class="flex flex-row items-start w-full my-3 pl-10 w-full md:w-4/5"
    >
      <div class="tag-number">
        {{ getNumberInTitle(question.text) }}
      </div>
      <div class="flex-grow">{{ removeNumberFromTitle(question.text) }}</div>
      <Tag :scale="parseFloat(question.scoreValue)" />
    </div>
  </template> 
</template>

<script setup>
import { ref } from 'vue';
import Tag from './Tag.vue'
import { getSocialScoreColor } from '@utils/social.js'

defineProps({
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
.social-details-group{
    background-color: var(--color);   
}
.social-details-group:hover{
    background-color: var(--color-hover);   
}
</style>
