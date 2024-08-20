<template>
    <ComparisonTitle title="Macro-Economic Indicators" :studies="studies" />
    <ComparisonRow 
        :studies="studies" 
        title="Value added" 
        subtitle="Definition of total value added" 
        :get-value="getTotalAddedValue"
        :format="formatNumber"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Share of agricultural GDP" 
        subtitle="Value chain GDP divided by agricultural GDP" 
        :get-value="(study) => study.ecoData?.macroData?.valueAddedShareAgriculturalGdp"
        :format="formatPercent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Share of national GDP" 
        subtitle="Value chain GDP divided by national GDP" 
        :get-value="(study) => study.ecoData?.macroData?.valueAddedShareNationalGdp"
        :format="formatPercent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Gini Index" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.giniIndex"
        :format="formatPercent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Rate Of Integration" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.rateOfIntegration"
        :format="formatPercent"
        />
    <ComparisonRow 
        :studies="studies" 
        title="Nominal Protection Coefficient" 
        subtitle="-" 
        :get-value="(study) => study.ecoData?.macroData?.nominalProtectionCoefficient"
        :format="formatPercent"
        />
</template>

<script setup>

import { formatPercent, formatNumber } from '@utils/format.js'
import { getTotalAddedValue } from '@utils/economics.js'
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonRow from './ComparisonRow.vue';
const props = defineProps({
    studies: Array,
})

</script>

<style lang="scss">
</style>
