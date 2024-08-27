<template>
  <div>
    <h3>What are the impacts of this value chain on {{detailsToDisplay.label ? detailsToDisplay.label : detailsToDisplay.name}}?</h3>
      <InfoTitle :title="detailsToDisplay.label ? detailsToDisplay.label : detailsToDisplay.name" :information="detailsToDisplay.helpBoxText" class="my-4"/>
      <BarChart :options="populatedBarChartData" @chartSeriesClick="handleDataChartSeriesClick" />
      <div v-if="selectedValueChain">
        <MiniChartContainer
          :currentStage="selectedValueChain"
          :title="`${detailsToDisplay.label ? detailsToDisplay.label : detailsToDisplay.name} (${impact.unit})`"
          :isEnvironment="true"
        >
          <div class="flex flex-row w-full justify-evenly mt-6">
              <div class="w-full flex flex-row justify-center">
                <BarChart :options="detailBarChartOptions"></BarChart>
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
import { formatNumber } from '@utils/format.js'
import { getColor } from '@utils/colors.js'
import { ACVImpacts } from '@utils/misc.js'

const props = defineProps({
    impact: Object,
    perUnit: String,
    volumes: Object
})

const detailsToDisplay = computed(() => {
  var details = ACVImpacts.find(item => item.name == props.impact.name)
  return details
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

const detailBarChartOptions = computed(() => {
  var tooltip = {}
  var labels = []
  var values = []
  props.impact.values.filter(item => item.valuechain_name == selectedValueChain.value)
  .forEach(item => {
    labels.push(item.actor_name)
    var color = getColor(item.actor_name)
    values.push({
        value: item.value,
        itemStyle: {
          color
        }
    })
    tooltip[item.actor_name] = `${formatNumber(item.value)} per functional unit`
  })
  let barChartExample = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (info) {
        return tooltip[info[0].axisValueLabel]
      }
    },
    grid: {
      top: 80,
      bottom: 30
    },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      data: labels
    },
    series: [
      {
        name: 'Cost',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          formatter: '{b}'
        },
        data: values
      }
    ]
  }
  return barChartExample
})

// Multiply by chain's annual volume if annual value wanted by user
function convertACVValue(value, chainName) {
  var factor = 1.0
  if (props.perUnit === 'year') {
    factor = props.volumes[chainName]
  }
  return value * factor
}

const populatedBarChartData = computed(() => {
  var tooltip = {}
  var series = {}
  var valuesByChain = {}
  for (var value of props.impact.values) {
    if (!(value.valuechain_name in valuesByChain)) {
      valuesByChain[value.valuechain_name] = 0
      tooltip[value.valuechain_name] = ""
    }
    valuesByChain[value.valuechain_name] += value.value
    tooltip[value.valuechain_name] += `<b>${value.actor_name}</b>: ${formatNumber(value.value)} per functional unit<br>`
  }

  const items = Object.keys(valuesByChain).map((chainName) => {
    return {
      name: chainName,
      value: convertACVValue(valuesByChain[chainName], chainName)
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
