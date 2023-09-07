<template >
    <div class="text-red-500">Default value for now</div>
    <div class="flex flex-col w-1/2 ml-36 relative mt-12">
        <div class="relative">
            <div class="bg-gray-200 w-full h-[40px]"></div>
            <div class="bg-yellow-300 absolute top-0 h-[40px]" :style="{ width: leftPosition }"></div>
        </div>
        <div class="absolute top-10 transform -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: leftPosition }">
            <div class="bg-[#EDEDED] text-black text-2xl font-bold p-2 rounded shadow">{{ value }}</div>
            <div class="bg-red-500 w-[3px] h-[50px] shadow-md" />
        </div>
        <div class="w-full pb-8 mb-4">
            <div class="w-full flex flex-row justify-between text-gray-700">
                <div>0</div>
                <div>1</div>
            </div>
            <div class="w-full flex flex-row text-left justify-between">
                <div class="w-1/3 mt-2">0 indicates <b>perfect equality</b> (where everyone receives an equal share) </div>
                <div class="w-1/3 mt-2 text-right">1 indicates <b>perfect inequality</b> (where only one recipient or group of recipients receives all the income)</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  value: Number,
})

const leftPosition = computed(() => `${100 * props.value / 1.0}%`)
</script>

<style>
</style>