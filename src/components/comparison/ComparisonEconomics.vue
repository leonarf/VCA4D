<template>
  <ComparisonTitle title="Macro-Economic Indicators" :studies="studies" />

  <ComparisonRow 
    :studies="studies" 
    title="Share of national GDP" 
    subtitle="Value chain GDP divided by national GDP" 
    :getValue="(study) => study.ecoData?.macroData?.valueAddedShareNationalGdp"
  >
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="percent" />
    </template>
  </ComparisonRow>

  <ComparisonRow 
    :studies="studies" 
    title="Share of agricultural GDP" 
    subtitle="Value chain GDP divided by agricultural GDP" 
    :getValue="(study) => study.ecoData?.macroData?.valueAddedShareAgriculturalGdp"
  >
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="percent" />
    </template>
  </ComparisonRow>

  <ComparisonRow 
    :studies="studies" 
    title="Value added" 
    subtitle="Total value added of value chain" 
    :getValue="getTotalAddedValue"
  >
    <template #default="{ value, studyData }">
      <ComparisonDefaultCell
        :value="value"
        :studyData="studyData"
        valueType="amount"
        currency="USD"
      />
    </template>
  </ComparisonRow>

  <ComparisonRow 
    :studies="studies" 
    title="Rate of Integration" 
    subtitle="Below 70%: depends on imports" 
    :getValue="(study) => study.ecoData?.macroData?.rateOfIntegration"
  >
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="percent" />
    </template>
  </ComparisonRow>

  <!-- To replace by jobs and net operating profit per actor dropdown -->
  <ComparisonExpandableRow
    :studies="studies" 
    title="Jobs" 
    subtitle="Total waged employement, excluding family work" 
    :getValue="getTotalJobs"
    :getSubValues="getJobsByStage"
  >
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="number" />
    </template>
  </ComparisonExpandableRow>

  <ComparisonExpandableRow
    :studies="studies" 
    title="Net operating profit per producer" 
    subtitle="Average net operating profit per actor at each stage" 
    :getValue="getNetOperatingProfitPerProducer"
    :getSubValues="getNetOperatingProfitForOtherStages"
  >
    <template #default="{ value, studyData }">
      <ComparisonDefaultCell
        :value="value"
        valueType="amount"
        :studyData="studyData"
        currency="USD"
      />
    </template>
  </ComparisonExpandableRow>

  <ComparisonRow 
    :studies="studies" 
    title="Gini Index" 
    subtitle="Ranges from equality (0) to inequality (1)" 
    :getValue="(study) => study.ecoData?.macroData?.giniIndex"
  >
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="number" />
    </template>
  </ComparisonRow>
</template>

<script setup>
import _ from "lodash";
import { getTotalAddedValue } from '@utils/economics.js'
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonRow from './ComparisonRow.vue';
import ComparisonExpandableRow from './ComparisonExpandableRow.vue';
import ComparisonDefaultCell from './ComparisonDefaultCell.vue';
defineProps({
    studies: Array,
})

function getTotalJobs(studyData) {
  const jobByStage = getJobsByStage(studyData);
  if (_.isEmpty(jobByStage)) { return; }

  return _.sumBy(Object.values(jobByStage));
}
function getJobsByStage(studyData) {
  if (! studyData.metrics.eco?.employment?.employmentByStage) { return {}; }

  const employmentByStage = studyData.metrics.eco.employment?.employmentByStage;
  if (! employmentByStage) { return {}; }

  const jobsByStage = {};
  Object.keys(employmentByStage).forEach(stage => {
    if (! employmentByStage[stage].total) { return; }
    jobsByStage[stage] = employmentByStage[stage].total;
  })
  return jobsByStage
}

function getNetOperatingProfitPerProducer(studyData) {
  if (! studyData.metrics.eco?.netOperatingProfitPerActor) { return null; }

  return studyData.metrics.eco.netOperatingProfitPerActor?.Producers?.profitPerActor;
}

function getNetOperatingProfitForOtherStages(studyData) {
  if (! studyData.metrics.eco?.netOperatingProfitPerActor) { return {}; }

  const netOperatingProfitForOtherStages = {};
  const nonProducerStages = Object.keys(studyData.metrics.eco?.netOperatingProfitPerActor).filter(stageName => stageName !== "Producers");
  nonProducerStages.forEach(stageName => {
    netOperatingProfitForOtherStages[buildPerStageName(stageName)] = studyData.metrics.eco.netOperatingProfitPerActor?.[stageName]?.profitPerActor;
  })
  return netOperatingProfitForOtherStages;
}

function buildPerStageName(stageName) {
  const lowercaseStageName = _.lowerCase(stageName);
  const singularStageName = lowercaseStageName.replace(/s$/, "");
  return `Per ${singularStageName}`;
}
</script>

<style lang="scss">
</style>
