<template>
  <template v-if="impacts.length > 0">
    <ComparisonTitle title="Environmental Indicators" :studies="studies" />
    <ComparisonRow
      v-for="impact in impacts"
      :key="`impact_${impact.name}`"
      :studies="studies"
      :title="impact.name"
      :subtitle="`in ${getUnitImpact(impact.name)}`"
      :getValue="(study) => getImpactValue(impact, study)"
    >
      <template #default="{ value }">
        <ComparisonDefaultCell :value="value" valueType="number" reverseColors />
      </template>
    </ComparisonRow>
  </template>
</template>

<script setup>

import { ACVImpacts } from '@utils/misc.js'
import { computed } from 'vue';
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonRow from './ComparisonRow.vue';
import ComparisonDefaultCell from './ComparisonDefaultCell.vue';
const props = defineProps({
    studies: Array,
})

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
