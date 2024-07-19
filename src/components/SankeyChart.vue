<template>
    <div class="sankey-chart">
      <v-chart class="chart" :option="options" />
    </div>
</template>

<script setup>
import { onErrorCaptured } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { SankeyChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";

const props = defineProps({
  options: Object
}); // Question: It looks like if I use use "ref" or "reactive" to declare options, it does not get updated afer data is retrieved from network. Why?

use([
  CanvasRenderer,
  SankeyChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

const IGNORED_SANKEY_ERRORS = [
  "nodes[data.getRawIndex(...)] is undefined"
];
onErrorCaptured((err) => {
  if (IGNORED_SANKEY_ERRORS.includes(err.message)) {
    return false;
  }
});

</script>

<style scoped lang="scss">
.sankey-chart {
  height: 800px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.chart {
  height: 800px;
}
</style>
