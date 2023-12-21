<template>
    <table class="w-full">
        <tbody>
            <ComparisonHeader :studies="studies" />
            <tr>
                <td class="title">
                    Macro-Economic Indicators
                </td>
                <td v-for="study in studies" :key="study.id">
                </td>   
            </tr>
            <tr class="rounded">
                <td>
                    <div class="subtitle">Value added</div>
                    <div class="definition">Definition of total value added</div>
                </td>
                <td v-for="study in studies" :key="`value_added__${study.id}`">
                    <div :class="getAddedValueClass(getTotalAddedValue(study))">
                        {{ formatNumber(getTotalAddedValue(study)) }}
                    </div>
                </td>
            </tr>
            <tr class="rounded">
                <td>
                    <div class="subtitle">Share of agricultural GDP</div>
                    <div class="definition">Value chain GDP divided by national agricultural GDP</div>
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    <div :class="`${getGdpClass(study.ecoData?.macroData?.valueAddedShareAgriculturalGdp)}`"
                    >
                        {{ formatPercent(+study.ecoData?.macroData?.valueAddedShareAgriculturalGdp) }}
                    </div>
                </td>
            </tr>
            
            <ComparisonSeparator :studies="studies" />

            <ComparisonSocial :studies="studies" />
            
            <ComparisonSeparator :studies="studies" />
            
            <tr>
                <td class="title">
                    Environmental Indicators
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    
                </td>
            </tr>
            <tr v-for="impact in impacts" :key="`impact_${impact.name}`" class="rounded">
                <td>
                    <div class="subtitle">{{ impact.name }}</div>
                    <div class="definition">in {{ getUnitImpact(impact.name) }}</div>
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    <div :class="getAddedValueClass(getImpactValue(impact, study))">
                        {{ formatNumber(getImpactValue(impact, study)) }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div>
    </div>
</template>

<script setup>

import { formatPercent, formatNumber } from '@utils/format.js'
import { ACVImpacts } from '@utils/misc.js'
import ComparisonHeader from '@components/comparison/ComparisonHeader.vue'
import ComparisonSocial from '@components/comparison/ComparisonSocial.vue'
import ComparisonSeparator from '@components/comparison/ComparisonSeparator.vue'
import { computed } from 'vue';
const props = defineProps({
    studies: Array,
})

const getTotalAddedValue = (study) => study.ecoData?.actors.map(actor => actor.directAddedValue || 0).reduce((res, curr) => res + curr, 0)

const getGdpClass = (value) => {
    if (!value) {
        return "gray"
    }
    if (value < 0.1) {
        return "light-blue"
    }
    return "dark-blue"
}

const getAddedValueClass = (value) => {
    if (!value) {
        return "gray"
    }
    if (value < 0) {
        return "light-red"
    }
    return "light-green"
}

const availableImpacts = computed(() => props.studies.reduce((arr, study) => arr.concat(study.acvData?.impacts), [])
.filter(item => !!item)
.filter(item => item.unit !== 'Pt')
)

const impacts = computed(() => ACVImpacts.filter(item => availableImpacts.value.map(availableImpact => availableImpact.name).includes(item.name)))

const getUnitImpact = (impactName) => availableImpacts.value.find(impact => impact.name === impactName).unit

const getImpactValue = (impact, study) => {
    if (!study.acvData) {
        return 0
    }
    const valueChains = study.acvData.valuechains
    let total = 0
    for (const { name, volume} of valueChains) {
        const totalChainPerT = study.acvData.impacts
            .filter(i => i.name === impact.name)
            .filter(i => i.unit !== 'Pt')
            .reduce((arr, item) => arr.concat(item.values), [])
            .filter(val => val.valuechain_name === name)
            .map(val => val.value * volume).reduce((s, item) => s + item, 0)
        total += totalChainPerT
    }
    return total
}

</script>

<style lang="scss">
td {
    box-sizing: border-box;
}
td {
    @apply w-1/5
}
td.title {
    @apply uppercase text-[#8A8A8A] font-bold text-sm
}
tr {
    @apply flex flex-row
}
.definition {
    @apply text-[#9B9B9B] italic
}

.light-blue {
    @apply bg-blue-200
}
.mid-blue {
    @apply bg-blue-400
}
.dark-blue {
    @apply bg-blue-500
}
.gray {
    @apply bg-gray-300 text-gray-500
}
.light-green {
    @apply bg-green-200
}
.dark-green {
    @apply bg-green-700
}
.light-red {
    @apply bg-red-500
}
.dark-red {
    @apply bg-red-700
}
.right-border {
    @apply border-r-2
}
tr td:not(:first-child):not(:last-child) {
  @apply border-r-2
}
tr.rounded td:not(:first-child) div {
  @apply text-center text-sm py-1.5
}
tr.rounded td:nth-child(2) div{
    @apply rounded-l-full
}
tr.rounded td:last-child div {
    @apply rounded-r-full
}
</style>