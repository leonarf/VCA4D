<template>

    <SankeyChart :options="populatedSankeyChartData"></SankeyChart>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="toggleSankeyGraphDisplayMode">Switch unit</button>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getSankeyData } from '@/charts/sankey.js'

import SankeyChart from '../SankeyChart.vue';

const props = defineProps({
  studyData: Object
});

const sankeyGraphPossibleDisplayModesList = [
    "monetaryValue",
    "volumeExchanged"
];

const sankeyGraphDisplayModeIndex = ref(0);

const toggleSankeyGraphDisplayMode = () => {
    sankeyGraphDisplayModeIndex.value = (sankeyGraphDisplayModeIndex.value + 1) % sankeyGraphPossibleDisplayModesList.length;
};

const sankeyDisplayMode = computed(() => sankeyGraphPossibleDisplayModesList[sankeyGraphDisplayModeIndex.value])

const populatedSankeyChartData = computed(() => getSankeyData(props.studyData, sankeyDisplayMode.value))

</script>

<style scoped lang="scss">
</style>
