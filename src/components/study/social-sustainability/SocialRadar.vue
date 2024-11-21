<template>
  <Radar class="radar" :options="chartData" />
</template>

<script setup>
import { computed } from 'vue'
import { getSocialAverageGroup, getSocialScoreColor } from '@utils/social.js'

import Radar from '@charts/Radar.vue'
const props = defineProps({
  studyData: Object
})

const averageWorking = computed(() => getSocialAverageGroup(props.studyData.socialData[0]))
const averageLand = computed(() => getSocialAverageGroup(props.studyData.socialData[1]))
const averageGender = computed(() => getSocialAverageGroup(props.studyData.socialData[2]))
const averageFood = computed(() => getSocialAverageGroup(props.studyData.socialData[3]))
const averageSocial = computed(() => getSocialAverageGroup(props.studyData.socialData[4]))
const averageLiving = computed(() => getSocialAverageGroup(props.studyData.socialData[5]))

const indicators = [
  'Working conditions',
  'Living\nconditions',
  'Social\ncapital',
  'Food & nutrition security',
  'Gender\nequality',
  'Land &\nwater\nrights'
]
const chartData = computed(() => {
  const values = [
    averageWorking.value,
    averageLiving.value,
    averageSocial.value,
    averageFood.value,
    averageGender.value,
    averageLand.value
  ]

  return {
    radar: {
      indicator: indicators.map((indicatorTitle) => ({ name: indicatorTitle, max: 4 })),
      center: ['50%', '50%'],
      radius: '80%',
      splitNumber: 4,
      splitArea: {
        areaStyle: {
          color: [
            getSocialScoreColor(1),
            getSocialScoreColor(2),
            getSocialScoreColor(3),
            getSocialScoreColor(4)
          ]
        }
      },
      axisLine: {
        lineStyle: {
          color: '#941B33'
        }
      },
      axisLabel: {
        show: false
      },
      axisName: {
        show: true,
        color: 'black'
      }
    },
    tooltip: {
      show: false
    },
    series: [
      {
        type: 'radar',
        areaStyle: {
          color: 'transparent'
        },
        itemStyle: {
          color: '#941B33'
        },
        data: [
          {
            value: values,
            label: {
              show: false
            }
          }
        ]
      }
    ]
  }
})
</script>

<style scoped lang="scss">
.radar {
  width: 430px;
}
</style>
