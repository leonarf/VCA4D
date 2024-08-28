<template>
  <div class="bar-chart">
    <v-chart class="chart" :option="options" @click="$emit('chart-series-click', $event)" />
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart from "vue-echarts";

defineProps({
  options: Object
}); // Question: It looks like if I use use "ref" or "reactive" to declare options, it does not get updated afer data is retrieved from network. Why?

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

defineEmits(["chart-series-click"]);
</script>

<style scoped lang="scss">
.bar-chart {
  height: 500px;
  width: 100%;
}
.chart {
  height: 500px;
}
</style>
