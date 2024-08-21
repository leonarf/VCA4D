<template>
    <ComparisonTitle title="Macro-Economic Indicators" :studies="studies" />
    <ComparisonRow 
      :studies="studies" 
      title="Value added" 
      subtitle="Definition of total value added" 
      :get-value="getTotalAddedValue"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="number"/>
      </template>
    </ComparisonRow>

    <ComparisonRow 
      :studies="studies" 
      title="Benefit/Cost ratio" 
      subtitle="-" 
      :get-value="study => study.metrics.eco.returnOnInvestment.benefitCostRatio"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="percent"/>
      </template>
    </ComparisonRow>
  
    <ComparisonRow 
        :studies="studies" 
        title="Share of agricultural GDP" 
        subtitle="Value chain GDP divided by agricultural GDP" 
        :get-value="(study) => study.ecoData?.macroData?.valueAddedShareAgriculturalGdp"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="percent"/>
      </template>
    </ComparisonRow>
  
    <ComparisonRow 
        :studies="studies" 
        title="Share of national GDP" 
        subtitle="Value chain GDP divided by national GDP" 
        :get-value="(study) => study.ecoData?.macroData?.valueAddedShareNationalGdp"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="percent"/>
      </template>
    </ComparisonRow>
  
    <ComparisonRow 
        :studies="studies" 
        title="Gini Index" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.giniIndex"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="percent"/>
      </template>
    </ComparisonRow>
  
    <ComparisonRow 
        :studies="studies" 
        title="Rate Of Integration" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.rateOfIntegration"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="percent"/>
      </template>
    </ComparisonRow>
  
    <ComparisonRow 
        :studies="studies" 
        title="Nominal Protection Coefficient" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.nominalProtectionCoefficient"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="percent"/>
      </template>
    </ComparisonRow>
</template>

<script setup>
import { getTotalAddedValue } from '@utils/economics.js'
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonRow from './ComparisonRow.vue';
import ComparisonDefaultCell from './ComparisonDefaultCell.vue';
const props = defineProps({
    studies: Array,
})

</script>

<style lang="scss">
</style>
