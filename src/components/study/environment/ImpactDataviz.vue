<template>
  <div>
    <div v-for="barChartOption, unit in populatedBarChartData" :key="unit">
      <p>{{ impactName }} {{ unit }}</p>
      <BarChart :options="barChartOption" @chartSeriesClick="handleDataChartSeriesClick" />
      <div>
        <MiniChartContainer :currentStage="selectedValueChain" :title="`${impactName} (${unit})`">
            <div class="flex flex-row w-full justify-evenly mt-6">
                <div class="w-full flex flex-row justify-center">
                  <Ring :options="populatedRingChartData[unit]"></Ring>
                </div>
            </div>
        </MiniChartContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getSelectableBarChart, getRingChart } from '@/charts/charts'
import MiniChartContainer from '@charts/MiniChartContainer.vue'
import BarChart from '@charts/BarChart.vue'
import Ring from '@charts/Ring.vue'

const props = defineProps({
    impactData: Object,
    impactName: String
})

const selectedValueChain = ref('')
const handleDataChartSeriesClick = (event) => selectedValueChain.value = event.name

const populatedRingChartData = computed(() => {
  var tooltip = {}
  console.log("selectedValueChain", selectedValueChain)
  var series = {}
  for (var unit in props.impactData) {
    var items = props.impactData[unit].values.filter(item => item.valuechain_name == selectedValueChain.value)
    .map(item => {
      return {
        name: item.actor_name,
        value: item.value
      }
    })
    series[unit] = getRingChart(items, tooltip, "ceci est un titre")
  }
  return series
})

const populatedBarChartData = computed(() => {
  console.log("props.impactData", props.impactData)
  var tooltip = {}
  var series = {}
  for (var unit in props.impactData) {
    var valuesByChain = {}
    var impactValues = props.impactData[unit].values
    for (var value of impactValues) {
      if (!(value.valuechain_name in valuesByChain)) {
        valuesByChain[value.valuechain_name] = 0
      }
      valuesByChain[value.valuechain_name] += value.value
    }

    const items = Object.keys(valuesByChain).map((chainName) => {
      return {
        name: chainName,
        value: valuesByChain[chainName]
      }
    })

    const ret = getSelectableBarChart(items, null, tooltip, null)
    series[unit] = {
      ...ret,
      yAxis: {
        type: 'value',
        name: `${props.impactName} (${unit})`,
        axisLine: {
          show: true
        }
      }
    }
  }
  return series
})
</script>

<style scoped lang="scss">
</style>