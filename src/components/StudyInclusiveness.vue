<template>
    <article class="study-section">
        <h1>Is the economic growth <strong>inclusive</strong>?</h1>

        <p>A value chain is inclusive in one country not only by the number of jobs created, but also considering these jobs' quality. The way the income is distributed across the value chain from the samll producers to the consumers also tell about the power dynamics and the policies that may be improved for more inclusiveness. For detailed information on the value chain's impact on the most vulnerable groups, like women and youth, please go directly to Social sustainability part (*link).</p>

        <h2>How is <strong>employment</strong> distributed across the value chain?</h2>
        <h3>Number of actors</h3>
        <div class="flex flex-row items-center mt-4">
            <div class="w-1/5">
                <div class="title">{{ totalNumberOfActors }}</div>
                <div class="subtitle">Number of actors</div>
            </div>
            <div class="w-4/5">
                <BarChart v-if="studyData" :options="numberOfActorsData"></BarChart>
            </div>
        </div>
        <br>
        <h3>Number of jobs</h3>
        <div class="flex flex-row items-center mt-4">
            <div class="w-1/5">
                <div class="title">{{ totalNumberOfJobs }}</div>
                <div class="subtitle">Waged employment</div>
                <div class="title mt-2">30%</div>
                <div class="subtitle">% female employment</div>
            </div>
            <div class="w-4/5">
                <BarChart v-if="studyData" :options="numberOfJobsData"></BarChart>
            </div>
        </div>


        <h2>How is <strong>income</strong> distributed across actors of the value chain?</h2>
        <p>Actors that are in small numbers but receive an important share of the value chain's net operating profit are in a stronger position of negociation in front of actore that are more divided.</p>
        <p>NB: The income data only relate to this specific value chain: the data do not include any other income from any other activity.</p>

        <h2>What is the ompact of the <strong>governance systems</strong> on income distribution?</h2>
    </article>

</template>

<script setup>
import { computed } from 'vue'
import Utils from '@/utils/utils.js'
import BarChart from './charts/BarChart.vue'

const props = defineProps({
    studyData: Object
    })

const formatNumber = (value) => value.toLocaleString(undefined, { maximumFractionDigits: 2})


const stages = computed(() => {
  Utils.sortDataStudyArrays(props.studyData.data)
  return [...new Set(props.studyData.data['Actor types'].map(actorType => actorType.Stage))]
})

const numberOfActorsData = computed(() => {

  let tooltip = {}
  let labels = []
  let values = []
  stages.value.map(stage => {
    const actorNames = props.studyData.data['Actor types'].filter(actorType => actorType.Stage === stage).map(actorType => actorType['Actor type name'])
    const stageItems = props.studyData.data['Indicator by actor type'].filter(element => actorNames.includes(element['Actor type name']))
    
    const subTotal = stageItems
      .map(stageItem => stageItem['Number Of actors In the value chain'])
      .reduce((res, value) => res + value, 0) 
    if (subTotal !== 0) {
        labels.push(stage)
        values.push(subTotal)
        let toolTipValue = `${stage}: ${formatNumber(subTotal)}`
        for (const stageItem of stageItems) {
            toolTipValue += `<br>${stageItem['Actor type name']}: ${formatNumber(stageItem['Number Of actors In the value chain'])}`
        }

        tooltip[stage] = toolTipValue
    }
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

const totalNumberOfActors = computed(() => {
    console.log('numberOfActorsData.value.series[0].data', numberOfActorsData.value.series[0].data)
    return formatNumber(numberOfActorsData.value.series[0].data.reduce((res, item) => res + item, 0))
})

const jobsByActors = computed(() => {
    return props.studyData.data['Employment'].map(item => {
        const actorName = item['Actor type name']
        let stage = ""
        const actorTypeEntries = props.studyData.data['Actor types'].filter(element => element['Actor type name'] === actorName)
        console.log('actorTypeEntries', actorTypeEntries)
        if (actorTypeEntries && actorTypeEntries.length === 1) {
            stage = actorTypeEntries[0]['Stage']
        }
        return {
            actorName,
            stage,
            male_temp: item['Temporary Male'],
            female_temp: item['Temporary Female'],
            male_perm_unskilled: item['Permanent Unskilled Male'],
            female_perm_unskilled: item['Permanent Unskilled Female'],
            male_perm_skilled: item['Permanent Skilled Male'],
            female_perm_skilled: item['Permanent Skilled Female'],
        }
    })
})


const numberOfJobsData = computed(() => {

    let tooltip = {}
    let labels = []
    let values = []
    stages.value.map(stage => {
        const jobItems = jobsByActors.value.filter(item => item.stage === stage)
        console.log('jobItems', jobItems)

        const subTotal = jobItems.map(jobItem => 
            jobItem.male_temp 
            + jobItem.female_temp
            + jobItem.male_perm_unskilled
            + jobItem.female_perm_unskilled
            + jobItem.male_perm_skilled
            + jobItem.female_perm_skilled
        ).reduce((res, curr) => res + curr, 0)

        if (subTotal !== 0) {
            labels.push(stage)
            values.push(subTotal)
            let toolTipValue = `${stage}: ${subTotal}`
            toolTipValue += `<br>Male temp: ${jobItems.map(jobItem => jobItem.male_temp)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female temp: ${jobItems.map(jobItem => jobItem.female_temp)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Male unskilled: ${jobItems.map(jobItem => jobItem.male_perm_unskilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female unskilled: ${jobItems.map(jobItem => jobItem.female_perm_unskilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Male skilled: ${jobItems.map(jobItem => jobItem.male_perm_skilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female skilled: ${jobItems.map(jobItem => jobItem.female_perm_skilled)
                .reduce((res, curr) => res + curr, 0)}`
            tooltip[stage] = toolTipValue
        }
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

const totalNumberOfJobs = computed(() => {
  return formatNumber(numberOfJobsData.value.series[0].data.reduce((res, item) => res + item, 0))
})
</script>

<script>
//@ts-check

import '../types.js'
export default {
    name: 'StudyEconomicGrowth',
    props: ['studyData'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

.subtitle {
    @apply uppercase text-base font-semibold text-[#656565]
}

.title {
    @apply text-3xl text-[#303030];
}

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