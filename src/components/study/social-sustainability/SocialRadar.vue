<template>
    <Radar :options="chartData" />
</template>

<script setup>
import { computed } from 'vue';
import { getSocialAverageGroup } from '@utils/misc.js'

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
            radius: '100%',
            splitNumber: 4,
            splitArea: {
                areaStyle: {
        color: [
          'rgba(255, 0, 0, 0.3)', 
          'rgba(255, 165, 0, 0.3)',
          'rgba(124, 252, 0, 0.3)',
          'rgba(0, 230, 65, 0.3)', 
        ],
      },
            },
            axisLine: {
                lineStyle: {
                    color: '#941B33'
                }
            },
            axisLabel: {
                show: false,
            },
            axisName: {
                fontWeight: 'bold',
                fontSize: '18px'
        },
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
                    color: "#FFFFFF66"
                },
                itemStyle: {
                    color: "#941B33"
                },
                data: [
                    {
                        value: values,
                    }
                    
                ]
            }
        ],
    };
})
</script>

<style lang="">
    
</style>