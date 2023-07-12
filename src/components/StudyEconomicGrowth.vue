<template>
  <article class="study-section">
    <h1>What is the contribution of the value chain to <strong>economic growth</strong>?</h1>

    <p>
      VCA4D analyses shows not only the value chain's contribution to the national wealth and to the
      wealth in agriculture. The methodology has also developped data on the distribution of the net
      benefits across the various actors of the value chain, includting the contribution left to the
      state budget, after public investment in the value chain.
    </p>

    <NiceMetricGroup>
      <NiceMetric label="Total value added" value="300 000 000 &euro;" />
      <NiceMetric label="Value added share of the agricultural sector GDP" value="1.9 %" />
      <NiceMetric label="Value added share of national GDP" value="0.3 %" />
    </NiceMetricGroup>

    <h3>Is the chain independent from foreign imports?</h3>

    <p>Rate of integration ito domestic economy</p>
    <p>= total value added / value of production</p>

    <h2>Who <strong>creates and receives</strong> value added?</h2>
    <div class="flex flex-row justify-evenly">
      <div class="flex flex-col items-center">
        <Ring v-if="studyData" :options="addedValueCreatorsRingChartData" style="height: 400px; width: 400px;"></Ring>
        <div class="font-semibold">{{ totalAddedValueCreators }}</div>
      </div>
      <div class="flex flex-col items-center">
        <Ring v-if="studyData" :options="addedValueReceiversRingChartData" style="height: 400px; width: 400px;"></Ring>
        <div class="font-semibold">{{ totalAddedValueReceivers }}</div>
      </div>
    </div>
    <h2>
      How <strong>profitable</strong> and viable are the value chain activities for the actors
      involved?
    </h2>
    <p>
      RETURN ON INVESTMENT (%) = percentage of net operating profit in total costs (NB : for
      producers this includes actor revenue)
    </p>
    <BarChart v-if="studyData" :options="populatedBarChartData"></BarChart>
    <a v-else class="TODO">Data are missing to display this GraphBar</a>
    <h2>What is the contribution of the value chain to the <strong>public finances</strong>?</h2>
    <div class="flex flex-row items-center ml-12">
      <div class="w-1/3">
        <div class="uppercase font-semibold text-[#303030] text-xl">Public Funds Balance</div>
        <div class="font-semibold text-2xl text-[#C1C1C1]">{{ publicFundsBalance }}</div>
        <div class="mt-2">
          Taxes - Subventions<br>
          Positive if the sector contributes to the government income more than it receives in subsidies and tax break
        </div>
        <div class="uppercase font-semibold text-red-500 text-2xl mt-4 ">-5 % (TODO)</div>
        <div class="uppercase font-semibold text-[#656565] text-base">Public Funds Balance / Public Budget</div>
        <div class="mt-2">
          Net share of the public funds balance in government budget
        </div>
      </div>
      <div class="w-2/3">
        <BarChart v-if="studyData" :options="publicFinancesBarData"></BarChart>
      </div>
    </div>
    
    <h2>What is the contribution of the value chain to the <strong>balance of trade</strong>?</h2>
    
    <h2>Is the value chain <strong>viable in the international economy</strong>?</h2>
    <p>
      The VCA4D methodology assesses for each value chain its dependency on international exports as
      well as its capacity to export on international markets with competitive price or on the
      contrary a higher remuneration of the actors supported by porection policies.
    </p>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'

import NiceMetricGroup from './NiceMetricGroup.vue'
import NiceMetric from './NiceMetric.vue'
import BarChart from './charts/BarChart.vue'
import Utils from '@/utils/utils.js'
import CurrencyUtils from '@/utils/currencyUtils.js'
import Ring from './charts/Ring.vue'

const props = defineProps({
  studyData: Object
})

const formatNumber = (value) => value.toLocaleString(undefined, { maximumFractionDigits: 2})

const stages = computed(() => {
  Utils.sortDataStudyArrays(props.studyData.data)
  return [...new Set(props.studyData.data['Actor types'].map(actorType => actorType.Stage))]
})

const actors = computed(() => {
  Utils.sortDataStudyArrays(props.studyData.data)
  return [...new Set(props.studyData.data['Actor types'].map(actorType => actorType['Actor type name']))]
})

const addedValueCreatorsRingChartData = computed(() => {

  const tooltip = {}
  const title = {
    text: 'Who creates the direct value added',
    left: 'center',
    top: 50
  }
  let data = stages.value.map(stage => {
    const actorNames = props.studyData.data['Actor types'].filter(actorType => actorType.Stage === stage).map(actorType => actorType['Actor type name'])
    const stageItems = props.studyData.data['Indicator by actor type']
      .filter(flow => actorNames.includes(flow['Actor type name']))
      
    const subTotal = stageItems
      .map(flow => flow['Direct added value (local currency)'])
      .reduce((res, value) => res + value, 0)

    let toolTip = `${stage}: ${formatNumber(subTotal)} (local ccy)`
    for (const stageItem of stageItems) {
      toolTip += `<br>${stageItem['Actor type name']}: ${formatNumber(stageItem['Direct added value (local currency)'])} (local ccy)`
    }
    tooltip[stage] = toolTip
    return {
      value: subTotal,
      name: stage
    }
  })

  data = data.filter(item => item.value !== 0)

  return {
    title,
    tooltip: {
      trigger: 'item',
      formatter: function (info) {
        return tooltip[info.name]
      }
    },
    series: [
      {
        type: 'pie',
        data,
        radius: ['30%', '40%']
      }
    ]
  };
})


const addedValueReceiversRingChartData = computed(() => {

  const tooltip = {}
  const title = {
    text: 'Who receives the direct value added',
    left: 'center',
    top: 50
  }

  let data = stages.value.map(stage => {
    const actorNames = props.studyData.data['Actor types'].filter(actorType => actorType.Stage === stage).map(actorType => actorType['Actor type name'])
    const stageItems = props.studyData.data['Direct value added receivers']
      .filter(element => actorNames.includes(element['Receiver Name']))

      console.log('stageItems', stageItems)


    const subTotal = stageItems
      .map(element => element['value (local currency)'])
      .reduce((res, value) => res + value, 0)

    let toolTip = `${stage}: ${formatNumber(subTotal)} (local ccy)`
    for (const stageItem of stageItems) {
      toolTip += `<br>${stageItem['Receiver Name']}: ${formatNumber(stageItem['value (local currency)'])} (local ccy)`
    }
    tooltip[stage] = toolTip

    return {
      value: subTotal,
      name: stage
    }
  })

  const noStageElements = props.studyData.data['Direct value added receivers'].filter(element => !actors.value.includes(element['Receiver Name']))
  data = data.concat(noStageElements.map(noStageElement => {
    tooltip[noStageElement['Receiver Name']] = `${noStageElement['Receiver Name']}: ${formatNumber(noStageElement['value (local currency)'])} (local ccy)` 
    return {
      value: noStageElement['value (local currency)'],
      name: noStageElement['Receiver Name']
    }
  })) 
  data = data.filter(item => item.value !== 0)

  return {
  title,
    tooltip: {
      trigger: 'item',
      formatter: function (info) {
        return tooltip[info.name]
      }
    },
  series: [
    {
      type: 'pie',
      data,
      radius: ['30%', '40%']
    }
  ]
};
})

const totalAddedValueReceivers = computed(() => {
  return formatNumber(addedValueReceiversRingChartData.value.series[0].data.reduce((res, item) => res + item.value, 0))
})

const totalAddedValueCreators = computed(() => {
  return formatNumber(addedValueCreatorsRingChartData.value.series[0].data.reduce((res, item) => res + item.value, 0))
})

const publicFundsBalance = computed(() => {
  const balanceItem = props.studyData.data['Direct value added receivers'].filter(item => item['Receiver Name'] === 'Government (taxes - subsidies)')
  console.log(balanceItem)
  if (!balanceItem || balanceItem.length === 0) {
    return 0
  }
  const balanceValue = balanceItem[0]['value (local currency)'] 
  return (balanceValue > 0 ? "+" : "-") + formatNumber(balanceValue)
})

const publicFinancesBarData = computed(() => {

  let tooltip = {}
  let labels = []
  let values = []
  stages.value.map(stage => {
    const actorNames = props.studyData.data['Actor types'].filter(actorType => actorType.Stage === stage).map(actorType => actorType['Actor type name'])
    const stageItems = props.studyData.data['Indicator by actor type'].filter(element => actorNames.includes(element['Actor type name']))
    
    labels.push(stage)
    const subTotal = stageItems
      .map(stageItem => stageItem['Public funds balance (local currency)'])
      .reduce((res, value) => res + value, 0) 
    values.push(subTotal)
    tooltip[stage] = `${formatNumber(subTotal)} (local ccy)`
    
  })

  return {
    xAxis: {
      data: labels,
      left: 0
    },
    label: {
      show: true,
      position: 'top',
      formatter: function (d) {
        if (!d.data) {
          return ""
        }
        return formatNumber(d.data)
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (info) {
        return tooltip[info.name]
      }
    },
    yAxis: {
      show: false
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: '100%'
      }
    ]
  };
})

const populatedBarChartData = computed(() => {
  var categories = []
  var values = []
  var tooltip = {}
  Utils.sortDataStudyArrays(props.studyData.data)

  for (var row of props.studyData.data['Indicator by actor type']) {
    categories.push(row['Actor type name'])
    var stageName = Utils.getCorrespondingStage(row['Actor type name'], props.studyData.data)
    const v1 = row['Net operating profit (local currency)']
    var v2 = row['Total costs (local currency)']
    if (stageName == 'Producers') {
      v2 = v1 + v2 // Profits are considered as cost for producer while computing Return On Investment
    }
    values.push(((100 * v1) / v2).toFixed(0))
    tooltip[row['Actor type name']] = `Net operating profit = ${CurrencyUtils.formatAmount(v1)}<br>
                                           Total costs = ${CurrencyUtils.formatAmount(v2)}<br>
                                           Return on investment = ${CurrencyUtils.formatPercent(
                                             (100 * v1) / v2
                                           )}`
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
      trigger: 'item',
      formatter: function (info) {
        return tooltip[info.name]
      }
    },
    yAxis: {
      type: 'value',
      name: 'RETURN ON INVESTMENT (%)',
      axisLine: {
        show: true,
        symbol: ['arrow', 'arrow']
      }
    },
    series: {
      type: 'bar',
      data: values,
      colorBy: 'data',
      label: {
        show: true,
        position: 'top'
      },
      itemStyle: {
        color: function (info) {
          return Utils.getStageColor(Utils.getCorrespondingStage(info.name, props.studyData.data))
        }
      }
    }
  }
  console.log('result:', result)
  return result
})
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
