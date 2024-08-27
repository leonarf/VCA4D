<template >
  <div class="flex flex-col w-4/5 lg:w-3/4 xl:w-1/2 ml-4 lg:ml-18 xl:ml-36 relative mt-8">
    <div class="bg-gradient-to-r from-green-300 via-yellow-200 to-red-300 w-full h-[40px] mt-10"></div>
    <div class="absolute top-20 transform -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: leftPosition }">
      <div class="bg-[#EDEDED] text-black text-2xl font-bold p-2 rounded shadow">{{ value }}</div>
      <div class="bg-red-500 w-[3px] h-[50px] shadow-md" />
    </div>
    <div :class="`w-full pb-8 mb-4 ${hasBackground ? 'bg-gradient-to-r from-green-300/40 via-yellow-200/40 to-red-300/40' : ''}`">
      <div class="w-full flex flex-row justify-between text-gray-700 px-2">
        <div v-for="tick in ticks" :key="`tick_${tick}`">{{ tick }}</div>
      </div>
      <div class="w-full flex flex-row text-left">
        <div class="mt-2 px-2 w-full" v-for="(text, index) in texts" :key="index" v-html="text" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  value: Number,
  minValue: {type: Number, default: 0},
  maxValue: {type: Number, default: 2},
  ticks: {type: Array, default: () => [0, 1, 2]},
  texts: Array,
  hasBackground: {
    type: Boolean,
    default: false
  }
})

const leftPosition = computed(() => `${100 * props.value / (props.maxValue - props.minValue)}%`)
</script>

<style>
    
</style>