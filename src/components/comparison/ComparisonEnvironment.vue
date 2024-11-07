<template>
  <template v-if="impacts.length > 0">
    <ComparisonTitle title="Environmental Indicators" :studies="studies" />
    <ComparisonExpandableRow
      :studies="studies"
      title="Total impact per year"
      subtitle="Value chain total impact (in pt)"
      :getValue="(study) => getTotalImpacts(study, true)"
      :getSubValues="(study) => getValuesByImpact(study, true)"
    >
      <template #default="{ value, isSubRow }">
        <ComparisonDefaultCell :value="value" valueType="number" :lightVersion="isSubRow" />
      </template>
    </ComparisonExpandableRow>
    <ComparisonExpandableRow
      :studies="studies"
      title="Impact per functional unit"
      subtitle="Value chain total impact / volume"
      :getValue="(study) => getTotalImpacts(study, false)"
      :getSubValues="(study) => getValuesByImpact(study, false)"
    >
      <template #default="{ value, isSubRow }">
        <ComparisonDefaultCell :value="value" valueType="number" :lightVersion="isSubRow" />
      </template>
    </ComparisonExpandableRow>
  </template>
</template>

<script setup>
import _ from 'lodash'
import { ACVImpacts } from '@utils/misc.js'
import { computed } from 'vue'
import ComparisonTitle from './ComparisonTitle.vue'
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
import ComparisonDefaultCell from './ComparisonDefaultCell.vue'
const props = defineProps({
  studies: Array
})

const availableImpacts = computed(() =>
  props.studies
    .reduce((arr, study) => arr.concat(study.acvData?.impacts), [])
    .filter((item) => !!item)
    .filter((item) => item.unit === 'Pt')
)

const impacts = computed(() =>
  ACVImpacts.filter((item) =>
    availableImpacts.value.map((availableImpact) => availableImpact.name).includes(item.name)
  )
)

function getTotalImpacts(study, sumTotalPerYear = false) {
  const valuesByImpact = getValuesByImpact(study, sumTotalPerYear)
  if (_.isEmpty(valuesByImpact)) {
    return null
  }

  return _.sumBy(Object.values(valuesByImpact))
}

function getValuesByImpact(study, sumTotalPerYear = false) {
  const valuesByImpact = {}
  impacts.value.forEach((impact) => {
    const impactValue = getImpactValue(impact, study, sumTotalPerYear)
    if (_.isNull(impactValue)) {
      return
    }
    var label = ACVImpacts.find((item) => item.name == impact.name).label
    if (label) {
      valuesByImpact[label] = impactValue
    } else {
      valuesByImpact[impact.name] = impactValue
    }
  })
  return valuesByImpact
}

function getImpactValue(impact, study, sumTotalPerYear = false) {
  if (!study.acvData) {
    return null
  }
  const valueChains = study.acvData.valuechains
  let totalPerYear = 0
  let totalVolume = 0
  for (const { name, volume } of valueChains) {
    const totalChainPerYear = study.acvData.impacts
      .filter((i) => i.name === impact.name)
      .filter((i) => i.unit === 'Pt')
      .reduce((arr, item) => arr.concat(item.values), [])
      .filter((val) => val.valuechain_name === name)
      .map((val) => val.value * volume)
      .reduce((s, item) => s + item, 0)
    totalVolume += volume
    totalPerYear += totalChainPerYear
  }
  return sumTotalPerYear ? totalPerYear : totalPerYear / totalVolume
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
