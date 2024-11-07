import { ACVImpacts } from '@utils/misc.js'
import _ from 'lodash'

export const environmentConfig = [
  {
    title: 'Total impact per year',
    subtitle: 'Value chain total impact (in pt)',
    getValue: (study, studies) => getTotalImpacts(study, studies, true),
    getSubValues: (study, studies) => getValuesByImpact(study, studies, true),
    format: 'number'
  },
  {
    title: 'Impact per functional unit',
    subtitle: 'Value chain total impact / volume',
    getValue: (study, studies) => getTotalImpacts(study, studies, false),
    getSubValues: (study, studies) => getValuesByImpact(study, studies, false),
    format: 'number'
  }
]

function getAvailableImpacts(studies) {
  return studies
    .reduce((arr, study) => arr.concat(study.acvData?.impacts), [])
    .filter((item) => !!item)
    .filter((item) => item.unit === 'Pt')
}

function getImpacts(studies) {
  const availableImpacts = getAvailableImpacts(studies)
  return ACVImpacts.filter((item) =>
    availableImpacts.map((availableImpact) => availableImpact.name).includes(item.name)
  )
}

export function getTotalImpacts(study, studies, sumTotalPerYear = false) {
  const valuesByImpact = getValuesByImpact(study, studies, sumTotalPerYear)
  if (_.isEmpty(valuesByImpact)) {
    return null
  }

  return _.sumBy(Object.values(valuesByImpact))
}

export function getValuesByImpact(study, studies, sumTotalPerYear = false) {
  const valuesByImpact = {}
  const impacts = getImpacts(studies)
  impacts.forEach((impact) => {
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
