<template>
  <article>
    <SectionTitle>
      <h1>Is the value chain environmentally sustainable?</h1>
    </SectionTitle>

    <h2>Which step in the chain has most impact ?</h2>
    <p>
      Environmental sustainability of a value chain should rather be assessed by product. And yet,
      specific policies or project may be developped in order to improve the sustainability of a
      step or of some actors to improve the overall sustainability of the value chain.
    </p>
    <template v-if="studyData">
      <div v-for="barChartOption, index in allBarChartsData" :key="index">
        <BarChart :options="barChartOption" @chartSeriesClick="handleDataChartSeriesClick" />
      </div>
    </template>
  </article>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import SectionTitle from '@typography/SectionTitle.vue'
import { getSelectableBarChart } from '@/charts/charts'
import BarChart from '@charts/BarChart.vue'
import { ACVImpacts } from '@/utils/misc.js'

const props = defineProps({
  studyData: Object
})

const allBarChartsData = computed(() => {
  let tooltip = {}
  var majorImpactsnames = ACVImpacts.map((impact) => impact.name)
  console.log(majorImpactsnames)
  var impactsToDrawOnGraph = props.studyData.acvData.impacts.filter((impact) => {
    return majorImpactsnames.includes(impact.name)
  })
  var series = []
  for (var impact of impactsToDrawOnGraph) {
    var valuesByChain = {}
    for (var value of impact.values) {
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
    series.push({
      ...ret,
      yAxis: {
        type: 'value',
        name: `${impact.name} (${impact.unit})`,
        axisLine: {
          show: true
        }
      }
    })
  }
  return series
})
</script>

<style scoped lang="scss"></style>
