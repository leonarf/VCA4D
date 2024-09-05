<template>
  <div>
    <InfoTitle
      title="Jobs"
      class="mt-8"
      information="
              The number of jobs is based on the wages paid to workers by the direct self-employed value chain actors
              (self-employed and companies).<br> It does not include family work."
    />
    <div class="flex flex-col mb-8">
      <div class="flex flex-row flex-wrap items-center justify-center">
        <div class="w-1/2 md:w-1/5 flex flex-col space-y-4 pt-8">
          <NiceMetric label="Waged employment" :description="fteDefinition" :value="totalNumberOfJobs" />
          <NiceMetric label="% female employment" :value="percentFemaleEmployment" />
        </div>
        <div class="w-full md:w-4/5">
          <BarChart
            v-if="studyData"
            :options="numberOfJobsData"
            @chart-series-click="handleDataChartSeriesClick"
          />
        </div>
      </div>
      <div v-if="selectedStage">
        <MiniChartContainer :currentStage="selectedStage" title="Employment">
          <div class="flex flex-row w-full justify-evenly mt-6">
            <template v-if="studyData">
              <template v-if="currentStageEmploymentByTypeOfActorData">
                <div class="w-1/3 aspect-w-1 aspect-h-1">
                  <Ring
                    :options="currentStageEmploymentByTypeOfActorData"
                    style="height: 300px;"
                  />
                </div>
              </template>
              <template v-else>
                <p>No data about number of jobs</p>
              </template>
              <template v-if="currentStageEmploymentByQualificationData">
                <div class="w-1/3 aspect-w-1 aspect-h-1">
                  <Ring
                    v-if="studyData"
                    :options="currentStageEmploymentByQualificationData"
                    style="height: 300px;"
                  />
                </div>
              </template>
              <template v-else>
                <p>No data about job's qualification</p>
              </template>
              <template v-if="currentStageEmploymentByGenderData">
                <div class="w-1/3 aspect-w-1 aspect-h-1">
                  <Ring v-if="studyData" :options="currentStageEmploymentByGenderData" style="height: 300px;" />
                </div>
              </template>
              <template v-else>
                <p>No data about job's gender</p>
              </template>
            </template>
          </div>
        </MiniChartContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BarChart from '@charts/BarChart.vue'
import { 
    getSelectableBarChart,
    getMiniPieChart,
} from '@/charts/charts'
import { formatNumber, formatPercent } from '@utils/format.js'
import { useActorsAndStages } from '@utils/misc.js'
import Ring from '@charts/Ring.vue'
import NiceMetric from '@typography/NiceMetric.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import MiniChartContainer from '@charts/MiniChartContainer.vue'

const props = defineProps({
    studyData: Object,
    currency: String
})

const selectedStage = ref(null)
const handleDataChartSeriesClick = (event) => {
  if (selectedStage.value == event.name) {
    selectedStage.value = null
  }
  else {
    selectedStage.value = event.name
  }
}

const { stages } = useActorsAndStages(props);

const numberOfJobsData = computed(() => {
  let tooltip = {}
  const items = stages.value.map(stage => {
    const stageEmployment = props.studyData.metrics.eco.employment?.employmentByStage[stage.name];
    if (!stageEmployment) { return; }

    const subTotal = sumAllEmployments(stageEmployment);
    if (subTotal === 0) { return; }

    let toolTipValue = "";
    toolTipValue += `<b>Male temporary</b>: ${formatNumber(stageEmployment.tempMale)}<br>`
    toolTipValue += `<b>Female temporary</b>: ${formatNumber(stageEmployment.tempFemale)}<br>`
    toolTipValue += `<b>Male unskilled</b>: ${formatNumber(stageEmployment.unskilledMale)}<br>`
    toolTipValue += `<b>Female unskilled</b>: ${formatNumber(stageEmployment.unskilledFemale)}<br>`
    toolTipValue += `<b>Male skilled</b>: ${formatNumber(stageEmployment.skilledMale)}<br>`
    toolTipValue += `<b>Female skilled</b>: ${formatNumber(stageEmployment.skilledFemale)}<br>`
    tooltip[stage.name] = toolTipValue
    return {
        name: stage.name,
        value: subTotal
    };
  })
  .filter(item => !!item)

            return getSelectableBarChart(items, selectedStage.value, tooltip)

  function sumAllEmployments(employment) {
    return employment.tempFemale +
      employment.tempMale +
      employment.unskilledFemale +
      employment.unskilledMale +
      employment.skilledFemale +
      employment.skilledMale;
  }
})

const totalNumberOfJobs = computed(() => {
    return formatNumber(numberOfJobsData.value.series[0].data.map(itemData => itemData.value).reduce((res, item) => res + item, 0))
})

const percentFemaleEmployment = computed(() => {
  if (! props.studyData.ecoData.consistencyDisplay.employment.genderRatio) { return null; }

  return formatPercent(props.studyData.metrics.eco.employment.femaleRatio);
})

const fteDefinition = computed(() => {
  const definitionHtml = props.studyData?.ecoData?.macroData?.FTE_Definition || "<i>No FTE definition provided</i>"
  return `
    <div><b>Full-time equivalent (FTE) definition</b></div>
    <div>${definitionHtml}</div>
  `;
})

const currentStageEmploymentByTypeOfActorData = computed(() => {
  if (! selectedStageEmployment.value) { return null; }
  
  const employmentActorDistribution = selectedStageEmployment.value?.employmentActorDistribution;
  if (! employmentActorDistribution) { return null;}


  let data = employmentActorDistribution.map(actor => ({
    value: actor.total,
    name: actor.name
  }))
  return getMiniPieChart(data, 'By type of actor');
})

const selectedStageEmployment = computed(() => {
  if (! selectedStage.value) { return; }

  return props.studyData.metrics.eco.employment?.employmentByStage[selectedStage.value];
})

const currentStageEmploymentByQualificationData = computed(() => {
  if (! props.studyData.ecoData.consistencyDisplay.employment.contractRatio) { return null; }
  if (! selectedStageEmployment.value) { return null; }

  const { tempFemale, tempMale, unskilledFemale, unskilledMale, skilledFemale, skilledMale } = selectedStageEmployment.value;

  let data = [
      {
          value: skilledFemale + skilledMale,
          name: 'Permanent qualified'
      },
      {
          value: unskilledFemale + unskilledMale,
          name: 'Permanent unqualified'
      },
      {
        value: tempFemale + tempMale,
          name: 'Temporary'
      }
  ];
  return getMiniPieChart(data, 'By qualification');
});

const currentStageEmploymentByGenderData = computed(() => {
  if (! props.studyData.ecoData.consistencyDisplay.employment.genderRatio) { return null; }
  if (! selectedStageEmployment.value) { return null; }

  const { tempFemale, tempMale, unskilledFemale, unskilledMale, skilledFemale, skilledMale } = selectedStageEmployment.value;
  let data = [
      {
          value: tempMale + unskilledMale + skilledMale,
          name: 'Male'
      },
      {
          value: tempFemale + unskilledFemale + skilledFemale,
          name: 'Female'
      }
  ]
  return getMiniPieChart(data, 'By gender');
})
</script>

<style scoped lang="scss"></style>
