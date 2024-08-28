<template>
  <div class="ring-chart">
    <v-chart class="chart" :option="options" />
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart from "vue-echarts";

defineProps({
  options: Object
});

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);
</script>

<style scoped lang="scss">
.ring-chart {
  width: 100%;
  height: 300px; 
}
</style>
