<template>
    <Radar :options="chartData" />
</template>

<script setup>
import { computed } from 'vue';

import Radar from '@charts/Radar.vue'
const props = defineProps({
    studyData: Object
})

const average = (array) => array.reduce((a, b) => a + b) / array.length
const getAverageGroup = (index) => Math.round(average(props.studyData.socialData[index].groups.map(group => Number(group.averageValue) || 0)), 2)

const averageWorking = computed(() => getAverageGroup(0))
const averageLand = computed(() => getAverageGroup(1))
const averageGender = computed(() => getAverageGroup(2))
const averageFood = computed(() => getAverageGroup(3))
const averageSocial = computed(() => getAverageGroup(4))
const averageLiving = computed(() => getAverageGroup(5))

const chartData = computed(() => {
    const values = [averageWorking.value, averageLiving.value, averageSocial.value, averageFood.value, averageGender.value, averageLand.value]

    return {
        radar: {
            indicator: [
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 }
            ],
            center: ['50%', '50%'],
            radius: '75%',
            splitArea: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#FF9933'
                }
            },
            axisLabel: {
                show: false,
            }
        },
        tooltip: {
            show: true, 
            trigger: 'item',
            formatter: function () {
                return `Working: ${averageWorking.value}<br />
                Living: ${averageLiving.value}<br />
                Social: ${averageSocial.value}<br />
                Food: ${averageFood.value}<br />
                Gender: ${averageGender.value}<br />
                Land: ${averageLand.value}<br />
                `;
            }
        },
        series: [
            {
                type: 'radar',
                areaStyle: {
                    color: "#FFCC99"
                },
                itemStyle: {
                    color: "#FF9933"
                },
                data: [
                    {
                        value: values,
                    }
                    
                ]
            }
        ]
    };
})
</script>

<style lang="">
    
</style>