<template>
    <ComparisonTitle title="Macro-Economic Indicators" :studies="studies" />
    <ComparisonRow 
        :studies="studies" 
        title="Value added" 
        subtitle="Definition of total value added" 
        :get-value="getTotalAddedValue"
        valueType="number"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Share of agricultural GDP" 
        subtitle="Value chain GDP divided by agricultural GDP" 
        :get-value="(study) => study.ecoData?.macroData?.valueAddedShareAgriculturalGdp"
        valueType="percent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Share of national GDP" 
        subtitle="Value chain GDP divided by national GDP" 
        :get-value="(study) => study.ecoData?.macroData?.valueAddedShareNationalGdp"
        valueType="percent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Gini Index" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.giniIndex"
        valueType="percent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Rate Of Integration" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.rateOfIntegration"
        valueType="percent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Nominal Protection Coefficient" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.nominalProtectionCoefficient"
        valueType="percent"
        />
</template>

<script setup>
import { getTotalAddedValue } from '@utils/economics.js'
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonRow from './ComparisonRow.vue';
const props = defineProps({
    studies: Array,
})

</script>

<style lang="scss">
</style>
