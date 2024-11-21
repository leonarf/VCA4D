<template>
  <div class="rounded-lg p-4 max-w-[100%]" :style="bgColor">
    <div class="header">
      <div class="uppercase font-bold">{{ title }}</div>
      <Tag :scale="parseFloat(averageValue)" />
    </div>
    <div class="font-bold mb-1">Selected questions:</div>

    <slot />
    <div class="browsable-radar-chart__item__more-info">
      <a class="cursor-pointer font-bold text-[#2e6bad]" @click="slideTo(anchorLink)"
        >Explore all questions &rarr;</a
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getSocialScoreColor } from '@utils/social.js'
import Tag from './Tag.vue'
const props = defineProps({
  title: String,
  anchor: Number,
  averageValue: Number
})

const anchorLink = computed(() => `social_anchor_${props.anchor}`)

const slideTo = (id) => {
  var element = document.getElementById(id)
  window.scrollTo({
    top: element.offsetTop - 10,
    behavior: 'smooth'
  })
}

const bgColor = computed(() => {
  const color = getSocialScoreColor(props.averageValue)
  return {
    backgroundColor: color ? color + '81' : '#f1f1f1'
  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  gap: 5px;
  align-items: baseline;
  text-transform: uppercase;
  margin-bottom: 10px;
}
</style>
