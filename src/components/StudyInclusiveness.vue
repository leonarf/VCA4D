<template>
    <article class="study-section">
        <h1>Is the economic growth <strong>inclusive</strong>?</h1>

        <p>A value chain is inclusive in one country not only by the number of jobs created, but also considering these jobs' quality. The way the income is distributed across the value chain from the samll producers to the consumers also tell about the power dynamics and the policies that may be improved for more inclusiveness. For detailed information on the value chain's impact on the most vulnerable groups, like women and youth, please go directly to Social sustainability part (*link).</p>

        <h2>How is <strong>employment</strong> distributed across the value chain?</h2>

        <p>Methodology</p>
        <p>Employment data only relate to full time equivalent jobs for this specific value chain and do not include total employment of each actor. In addition, the informal family workforce at the agricultural production level is not accounted for.</p>

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
                <div class="title mt-2">{{ percentFemaleEmployment }}%</div>
                <div class="subtitle">% female employment</div>
            </div>
            <div class="w-4/5">
                <BarChart v-if="studyData" :options="numberOfJobsData"></BarChart>
                <div>
                    <div class="flex flex-row justify-evenly">
                        <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" v-for="stage in availableStages" @click="currentStage = stage" v-bind:key="stage">
                            {{ stage }}
                        </div>
                    </div>
                    <template v-if="currentStage !== ''">
                        <div>Employment in {{ currentStage }}</div>
                            <div class="flex flex-row">
                                <div>
                                    <Ring v-if="studyData" :options="currentStageEmploymentByTypeOfActorData" style="height: 300px; width: 300px;"></Ring>
                            </div>
                            <div>
                                <Ring v-if="studyData" :options="currentStageEmploymentByQualificationData" style="height: 300px; width: 300px;"></Ring>
                            </div>
                            <div>
                                <Ring v-if="studyData" :options="currentStageEmploymentByGenderData" style="height: 300px; width: 300px;"></Ring>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>


        <h2>How is <strong>income</strong> distributed across actors of the value chain?</h2>
        <p>Actors that are in small numbers but receive an important share of the value chain's net operating profit are in a stronger position of negociation in front of actore that are more divided.</p>
        <p>NB: The income data only relate to this specific value chain: the data do not include any other income from any other activity.</p>
        <p>net operating profit across actor types</p>
        <p class="TODO">Prendre les données dans l'excel économique, feuille Indicator by actor type, colonne Net operating profit (local currency)</p>
        <p class="TODO">Number of actors : c'est le même graphique qu'en haut de la page, est-ce qu'on le remet vraiment?</p>

        <h2>What is the impact of the <strong>governance systems</strong> on income distribution?</h2>
        <p>Share of farm gate price in final price</p>
        <p class="TODO">Missing data to be able to display graphic</p>
        <p>Gini index</p>
        <p class="TODO">Missing data to be able to display graphic</p>
    </article>

</template>

<script setup>
import { computed, ref } from 'vue'
import BarChart from './charts/BarChart.vue'
import Ring from './charts/Ring.vue'

const props = defineProps({
    studyData: Object
    })

const currentStage = ref('')

const formatNumber = (value) => value ? value.toLocaleString(undefined, { maximumFractionDigits: 2}) : "-"

const stages = computed(() => props.studyData.data.stages)
const actors = computed(() => props.studyData.data.actors)

const numberOfActorsData = computed(() => {

  let tooltip = {}
  let labels = []
  let values = []
  stages.value.map(stage => {
    const stageActors = actors.value.filter(actor => actor.stage === stage.name)
    
    const subTotal = stageActors
      .reduce((res, actor) => res + actor.numberOfActors, 0) 
    if (subTotal !== 0) {
        labels.push(stage.name)
        values.push(subTotal)
        let toolTipValue = `${stage.name}: ${formatNumber(subTotal)}`
        for (const actor of stageActors) {
            toolTipValue += `<br>${actor.name}: ${formatNumber(actor.numberOfActors)}`
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
    return formatNumber(numberOfActorsData.value.series[0].data.reduce((res, item) => res + item, 0))
})

const numberOfJobsData = computed(() => {

    let tooltip = {}
    let labels = []
    let values = []
    stages.value.map(stage => {
        const stageActors = actors.value.filter(actor => actor.stage === stage.name && actor.employment)

        const subTotal = stageActors.map(actor => actor.employment.total)
            .reduce((res, curr) => res + curr, 0)

        if (subTotal !== 0) {
            labels.push(stage.name)
            const color = currentStage.value === stage ? 'orange' : 'lightBlue'
            values.push({
                value: subTotal,
                itemStyle: {
                    color
                }
            })
            let toolTipValue = `${stage.name}: ${subTotal}`
            toolTipValue += `<br>Male temp: ${stageActors.map(actor => actor.employment.male_temp)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female temp: ${stageActors.map(actor => actor.employment.female_temp)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Male unskilled: ${stageActors.map(actor => actor.employment.male_perm_unskilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female unskilled: ${stageActors.map(actor => actor.employment.female_perm_unskilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Male skilled: ${stageActors.map(actor => actor.employment.male_perm_skilled)
                .reduce((res, curr) => res + curr, 0)}`
            toolTipValue += `<br>Female skilled: ${stageActors.map(actor => actor.employment.female_perm_skilled)
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
            return formatNumber(d.data.value)
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

const availableStages = computed(() => {
    return numberOfJobsData.value.xAxis.data
})

const totalNumberOfJobs = computed(() => {
  return formatNumber(numberOfJobsData.value.series[0].data.map(itemData => itemData.value).reduce((res, item) => res + item, 0))
})


const percentFemaleEmployment = computed(() => {
    let femaleTotal = 0
    let total = 0
    for (const actor of actors.value) {
        femaleTotal += actor.employment?.femaleTotal || 0
        total += actor.employment?.total || 0
    }
    return parseInt(femaleTotal / total * 100)
})

const currentStageEmploymentByTypeOfActorData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)

    const title = {
        text: 'By type of actor',
        left: 'center',
        top: 50
    }

    let data = currentStageActors.map(actor => {
        return {
            value: actor.employment.total,
            name: actor.name
        }
    })

    data = data.filter(item => item.value !== 0)

    return {
        title,
        series: [
            {
                type: 'pie',
                data,
                radius: ['30%', '40%']
            }
        ]
    };
})


const currentStageEmploymentByQualificationData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)

    const title = {
        text: 'By qualification',
        left: 'center',
        top: 50
    }

    let data = [
        {
            value: currentStageActors.map(actor => actor.employment.skilledTotal).reduce((res, curr) => res + curr, 0),
            name: 'Permanent qualified'
        },
        {
            value: currentStageActors.map(actor => actor.employment.unskilledTotal).reduce((res, curr) => res + curr, 0),
            name: 'Permanent unqualified'
        },
        {
            value: currentStageActors.map(actor => actor.employment.tempTotal).reduce((res, curr) => res + curr, 0),
            name: 'Temporary'
        }
    ]

    data = data.filter(item => item.value !== 0)

    return {
        title,
        series: [
            {
                type: 'pie',
                data,
                radius: ['30%', '40%']
            }
        ]
    };
})


const currentStageEmploymentByGenderData = computed(() => {
    const currentStageActors = actors.value.filter(actor => actor.stage === currentStage.value)

    const title = {
        text: 'By gender',
        left: 'center',
        top: 50
    }

    let data = [
        {
            value: currentStageActors.map(actor => actor.employment.maleTotal).reduce((res, curr) => res + curr, 0),
            name: 'Male'
        },
        {
            value: currentStageActors.map(actor => actor.employment.femaleTotal).reduce((res, curr) => res + curr, 0),
            name: 'Female'
        }
    ]

    data = data.filter(item => item.value !== 0)

    return {
        title,
        series: [
            {
                type: 'pie',
                data,
                radius: ['30%', '40%']
            }
        ]
    };
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