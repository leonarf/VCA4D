<template>
    <Radar :options="chartData" />
</template>

<script setup>
import { computed } from 'vue';
import { getSocialAverageGroup } from '@/utils/misc.js'

import Radar from '@charts/Radar.vue'
const props = defineProps({
    studyData: Object
})

const averageWorking = computed(() => getSocialAverageGroup(props.studyData.socialData, 0))
const averageLand = computed(() => getSocialAverageGroup(props.studyData.socialData, 1))
const averageGender = computed(() => getSocialAverageGroup(props.studyData.socialData, 2))
const averageFood = computed(() => getSocialAverageGroup(props.studyData.socialData, 3))
const averageSocial = computed(() => getSocialAverageGroup(props.studyData.socialData, 4))
const averageLiving = computed(() => getSocialAverageGroup(props.studyData.socialData, 5))

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