<template >
    <div class="flex flex-col w-1/2 ml-36 relative">
        <div class="bg-gradient-to-r from-green-300 via-yellow-200 to-red-300 w-full h-[40px] mt-10"></div>
        <div class="absolute top-20 transform -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: leftPosition }">
            <div class="bg-[#EDEDED] text-black text-2xl font-bold p-2 rounded shadow">{{ value }}</div>
            <div class="bg-red-500 w-[3px] h-[50px] shadow-md" />
        </div>
        <div class="bg-gradient-to-r from-green-300/40 via-yellow-200/40 to-red-300/40 w-full pb-8 mb-4">
            <div class="w-full flex flex-row justify-between text-gray-700 px-4">
                <div>0</div>
                <div>0.5</div>
                <div>1</div>
                <div>1.5</div>
                <div>2</div>
            </div>
            <div class="w-full flex flex-row text-left">
                <div class="w-1/2 mt-2 px-10 "><b>Viable in the global economy :</b><br /> the cost of domestic factors (labour, capital, land, environmental goods) is lower than the value they produce.</div>
                <div class="w-1/2 mt-2 px-10 "><b>Considered not viable within the gobal economy :</b><br /> inefficient use of domestic resources, poor remuneration of domestic factors, this a non-competitive VC into the international economy.</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  value: Number,
})

const leftPosition = computed(() => `${100 * props.value / 2.0}%`)
</script>

<style>
    
</style>