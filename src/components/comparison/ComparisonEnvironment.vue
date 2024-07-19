<template>
    <template v-if="impacts.length > 0">
        <ComparisonTitle title="Environmental Indicators" :studies="studies" />
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
    </template>
</template>

<script setup>

import { formatNumber } from '@utils/format.js'
import { ACVImpacts } from '@utils/misc.js'
import { computed } from 'vue';
import ComparisonTitle from './ComparisonTitle.vue';
const props = defineProps({
    studies: Array,
})

const getAddedValueClass = (value) => {
    if (!value) {
        return "gray"
    }
    if (value > 0) {
        return "negative"
    }
    return "positive"
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

<style scoped lang="scss">
    .negative {
        background-color: #ffac9e;
    }
    .positive {
        background-color: #94d99d;
    }
</style>
