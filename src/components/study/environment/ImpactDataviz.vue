<template>
  <div>
      <InfoTitle :title="impact.name" :information="impact.method" class="my-4"/>
      <BarChart :options="populatedBarChartData" @chartSeriesClick="handleDataChartSeriesClick" />
      <div v-if="selectedValueChain">
        <MiniChartContainer :currentStage="selectedValueChain" :title="`${impact.name} (${impact.unit})`" :isEnvironment="true">
            <div class="flex flex-row w-full justify-evenly mt-6">
                <div class="w-full flex flex-row justify-center">
                  <Ring :options="populatedRingChartData"></Ring>
                </div>
            </div>
        </MiniChartContainer>
      </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getSelectableBarChart, getRingChart } from '@/charts/charts'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'
import InfoTitle from '@typography/InfoTitle.vue'

const props = defineProps({
    impact: Object,
    perUnit: String,
    volumes: Array
})


const selectedValueChain = ref(null)
const handleDataChartSeriesClick = (event) => {
  if (selectedValueChain.value == event.name) {
    selectedValueChain.value = null
  }
  else {
    selectedValueChain.value = event.name
  }
}

const populatedRingChartData = computed(() => {
  var tooltip = {}
  var series = {}
    var items = props.impact.values.filter(item => item.valuechain_name == selectedValueChain.value)
    .map(item => {
      return {
        name: item.actor_name,
        value: item.value,
        label: {
            width: 250,
            overflow: 'break',
            color: "#e2e0e0",
            fontSize: 16
        },
        labelLine: {
            length: 40,
            length2: 10,
            smooth: true,
        },
      }
    })
    series = getRingChart(items, tooltip, "", true)
  return series
})

const populatedBarChartData = computed(() => {
  var tooltip = {}
  var series = {}
  var valuesByChain = {}
  for (var value of props.impact.values) {
    if (!(value.valuechain_name in valuesByChain)) {
      valuesByChain[value.valuechain_name] = 0
    }
    valuesByChain[value.valuechain_name] += value.value
  }

  const items = Object.keys(valuesByChain).map((chainName) => {
    return {
      name: chainName,
      value: valuesByChain[chainName] * (props.perUnit === 'year' ? props.volumes.find(item => item.name === chainName).yearlyVolume : 1.0)
    }
  })

  const ret = getSelectableBarChart(items, null, tooltip, null, true)
  series = {
    ...ret,
    yAxis: {
      type: 'value',
      name: `${props.impact.unit} / ${props.perUnit}`,
      axisLine: {
        show: true
      }
    }
  }
  return series
})
</script>

<style scoped lang="scss">
</style>