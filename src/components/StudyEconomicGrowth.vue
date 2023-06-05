<template>
    <article class="study-section">
        <h1>What is the contribution of the value chain to <strong>economic growth</strong>?</h1>

        <p>VCA4D analyses shows not only the value chain's contribution to the national wealth and to the wealth in agriculture. The methodology has also developped data on the distribution of the net benefits across the various actors of the value chain, includting the contribution left to the state budget, after public investment in the value chain.</p>

        <NiceMetricGroup>
            <NiceMetric label="Total value added" value="300 000 000 &euro;"/>
            <NiceMetric label="Value added share of the agricultural sector GDP" value="1.9 %"/>
            <NiceMetric label="Value added share of national GDP" value="0.3 %"/>
        </NiceMetricGroup>


        <h3>Is the chain independent from foreign imports?</h3>

        <p>Rate of integration ito domestic economy</p>
        <p>= total value added / value of production</p>

        <h2>Who <strong>creates and receives</strong> value added?</h2>

        <h2>How <strong>profitable</strong> and viable are the value chain activities for the actors involved?</h2>
        <p>RETURN ON INVESTMENT (%) = percentage of net operating profit in total costs (NB : for producers this includes actor revenue)</p>
        <BarChart v-if="studyData" :options="populatedBarChartData"></BarChart>
        <a v-else class="TODO">Data are missing to display this GraphBar</a>

        <h2>What is the contribution of the value chain to the <strong>balance of trade</strong>?</h2>

        <h2>Is the value chain <strong>viable in the international economy</strong>?</h2>
        <p>The VCA4D methodology assesses for each value chain its dependency on international exports as well as its capacity to export on international markets with competitive price or on the contrary a higher remuneration of the actors supported by porection policies.</p>

    </article>

</template>

<script setup>
import { computed, ref } from 'vue';

import NiceMetricGroup from './NiceMetricGroup.vue';
import NiceMetric from './NiceMetric.vue';
import BarChart from './BarChart.vue';
import Utils from '@/utils/utils.js';
import CurrencyUtils from '@/utils/currencyUtils.js';

const props = defineProps({
  studyData: Object
});

const populatedBarChartData = computed(() => {
    var categories = []
    var values = []
    var tooltip = {}

    for (var row of props.studyData.data["Indicator by actor type"]) {
        categories.push(row["Actor type Name"])
        var stageName = Utils.getCorrespondingStage(row["Actor type Name"], props.studyData.data)
        const v1 = row['Net operating profit (local currency)'];
        var v2 = row['Total costs (local currency)'];
        if (stageName == "Producers") {
            v2 = v1 + v2 // Profits are considered as cost for producer while computing Return On Investment
        }
        values.push(100*v1/v2);
        tooltip[row["Actor type Name"]] = `Net operating profit = ${CurrencyUtils.formatAmount(v1)}<br>
                                           Total costs = ${CurrencyUtils.formatAmount(v2)}<br>
                                           Return on investment = ${CurrencyUtils.formatPercent(100*v1/v2)}`
    }
    let result = {
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate: -10,
                margin: 20
            },
            data: categories
        },
        tooltip: {
          trigger: "item",
          formatter: function (info) {
            return tooltip[info.name];
          }
        },
        yAxis: {
            type: 'value',
            name: 'RETURN ON INVESTMENT (%)',
            axisLine : {
                show: true,
                symbol: ['arrow', 'arrow']
            }
        },
        series: {
            type: 'bar',
            data: values
        }
    };
    console.log("result:", result);
    return result;
});
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

article.study-section {

    h1 {
        text-decoration: underline;
        text-decoration-thickness: 3px;
        font-weight: normal;
        font-size: 24px;
        color: #151515;
        text-underline-offset: 5px;
    }

    h2 {
        font-weight: normal;
        font-size: 22px;
        color: #151515;
    }

    h3 {
        padding-left: 80px;
        font-weight: bold;
        font-size: 17px;
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-thickness: 3px;
        text-decoration-color: #999;
    }
}

</style>
