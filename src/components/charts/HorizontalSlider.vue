<template >

<div class="flex flex-col w-[90%] lg:w-2/3 xl:w-1/2 ml-4 md:ml-12 relative mt-12">
    <div class="relative">
        <div class="bg-gray-200 w-full h-[40px]"></div>
        <div class="bg-yellow-300 absolute top-0 h-[40px]" :style="{ width: leftPosition }"></div>
    </div>
    <div class="absolute top-10 transform -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: leftPosition }">
        <div class="bg-[#EDEDED] text-black text-2xl font-bold p-2 rounded shadow">{{ label }}</div>
        <div class="bg-red-500 w-[3px] h-[50px] shadow-md" />
    </div>
    <div class="w-full pb-8 mb-4">
        <div class="w-full flex flex-row justify-between text-gray-700">
            <div v-for="l in labels" :key="l">{{ l }}</div>
        </div>
        <div class="w-full flex flex-row text-left justify-between">
            <div class="w-1/3 mt-2" v-html="textLeft" />
            <div class="w-1/3 mt-2 text-right" v-html="textRight" />
        </div>
    </div>
</div>  
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  value: Number,
  min: Number,
  max: Number,
  labels: Array,
  textLeft: String,
  textRight: String,
  isPercent: Boolean
})

const leftPosition = computed(() => `${100 * props.value / (props.max - props.min)}%`)
const label = computed(() => props.isPercent ? `${100 * props.value} %`: props.value)
</script>

<style>
</style>