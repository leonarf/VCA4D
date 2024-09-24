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
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="number" />
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
    title="Benefit/Cost ratio" 
    subtitle="-" 
    :getValue="study => study.metrics.eco?.benefitCostRatio.benefitCostRatio"
    :getSubValues="getBenefitCostRatioByStage"
  >
    <template #default="{ value }">
      <ComparisonDefaultCell :value="value" valueType="percent" />
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
import { getTotalAddedValue } from '@utils/economics.js'
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonRow from './ComparisonRow.vue';
import ComparisonExpandableRow from './ComparisonExpandableRow.vue';
import ComparisonDefaultCell from './ComparisonDefaultCell.vue';
defineProps({
    studies: Array,
})

function getBenefitCostRatioByStage(studyData) {
  if (! studyData.metrics.eco) { return {}; }
  const stagesWithBenefit = studyData.metrics.eco?.benefitCostRatio.stages
    .filter(stage => stage.netOperatingProfits !== 0);

  const benefitCostRatioByStage = {};
  stagesWithBenefit.forEach(stage => {
    benefitCostRatioByStage[stage.name] = stage.benefitCostRatio;
  });
  return benefitCostRatioByStage;
}

</script>

<style lang="scss">
</style>
