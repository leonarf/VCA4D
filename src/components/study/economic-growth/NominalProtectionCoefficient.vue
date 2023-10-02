<template >
    <div class="flex flex-col w-1/2 ml-36 relative">
        <div class="bg-gradient-to-r from-green-300 via-yellow-200 to-red-300 w-full h-[40px] mt-10"></div>
        <div class="absolute top-20 transform -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: leftPosition }">
            <div class="bg-[#EDEDED] text-black text-2xl font-bold p-2 rounded shadow">{{ value }}</div>
            <div class="bg-red-500 w-[3px] h-[50px] shadow-md" />
        </div>
        <div class="w-full pb-8 mb-4">
            <div class="w-full flex flex-row justify-between text-gray-700 px-2">
                <div>0</div>
                <div>1</div>
                <div>2</div>
            </div>
            <div class="w-full flex flex-row text-left">
                <div class="w-1/3 mt-2 px-2"><b>Cheaper than market :</b><br /> Domestic price lower than international parity price. The value chain is somewhat competitive and has a potential for export.</div>
                <div class="w-1/3 mt-2 px-2"><b>Equal to market :</b><br /> Domestic price aligned to international parity price. Corresponds to absence of governement protection on the value chain prices. Global remuneration of the chain doesn’t exceed parity prices.</div>
                <div class="w-1/3 mt-2 px-2"><b>More expensive than market :</b><br />  Domestic price higher than international parity price.  The local production is less competitive than the imported one.</div>
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