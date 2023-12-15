<template>
    <table class="w-full">
        <tbody>
            <tr>
                <td>-</td>
                <td v-for="(study) in studies" :key="`${study.id}`">
                    <div class="flex flex-col items-center gap-y-2"
                    >
                        <div class="flex flex-row items-center justify-center">
                            <LogoCountrySmall :iso-code="getCountry(study.country)?.iso || 'gr'" />
                            <div>
                                {{ getCountry(study.country)?.prettyName }}
                            </div>
                        </div>
                        <Card :is-local="false" :is-open="false" :title="getProduct(study)">
                            <template v-slot:logo>
                                <LogoProductLarge :product-name="getProduct(study)"/>
                            </template>
                        </Card>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="title">
                    Macro-Economic Indicators
                </td>
                <td v-for="study in studies" :key="study.id">
                </td>   
            </tr>
            <tr>
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
            <tr>
                <td>
                    <div class="subtitle">Share of agricultural GDP</div>
                    <div class="definition">Value chain GDP divided by national agricultural GDP</div>
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    <div :class="`${getGdpClass(study.valueAddedShareAgriculturalGdp)}`"
                    >
                        {{ formatPercent(+study.valueAddedShareAgriculturalGdp) }}
                    </div>
                </td>
            </tr>
            <tr class="h-12">
                <td></td>
                <td v-for="study in studies" :key="`${study.id}`"></td>
            </tr>
            <tr>
                <td class="title">
                    Social Sustainability
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                </td>
            </tr>
            <tr>
                <td>
                    <div class="subtitle">Working Conditions</div>
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    -
                </td>
            </tr>
            <tr class="h-12">
                <td></td>
                <td v-for="study in studies" :key="`${study.id}`"></td>
            </tr>
            <tr>
                <td class="title">
                    Environmental Indicators
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    
                </td>
            </tr>
            <tr>
                <td>
                    <div class="subtitle">Global warming</div>
                    <div class="definition">in kg CO2 eq</div>
                </td>
                <td v-for="study in studies" :key="`${study.id}`">
                    -
                </td>
            </tr>
        </tbody>
    </table>
    <div>
    </div>
</template>

<script setup>

import { formatPercent, formatNumber, slugify } from '@utils/format.js'
import LogoCountrySmall from '@components/home/LogoCountrySmall.vue';
import LogoProductLarge from '@components/home/LogoProductLarge.vue';
import Card from './home/Card.vue';
const props = defineProps({
    studies: Array,
    countries: Array
})

const getProduct = (study) => {
    console.log('study', study)
    return study.commodity.toLowerCase()
}

const getCountry = (countryId) => {
    return props.countries.find(country => country.id === slugify(countryId))
}

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

</script>

<style scoped lang="scss">
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
tr td:not(:first-child) div {
  @apply text-center text-sm py-1.5
}
tr td:nth-child(2) div{
    @apply rounded-l-full
}
tr td:last-child div {
    @apply rounded-r-full
}
</style>