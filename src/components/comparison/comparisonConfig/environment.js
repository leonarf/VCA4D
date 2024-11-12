import { ACVImpacts } from '@utils/misc.js'
import _ from 'lodash'

export const environmentConfig = [
  {
    title: 'Total impact per year',
    subtitle: 'Value chain total impact (in pt)',
    getValue: (study, studies) => {
      const impactNames = getPtImpactsNames(studies)
      return getTotalImpacts(study, impactNames, true)
    },
    getSubValues: (study, studies) => {
      const impactNames = getPtImpactsNames(studies)
      return getPtValuesByImpact(study, impactNames, true)
    },
    format: 'number'
  },
  {
    title: 'Impact per functional unit',
    subtitle: 'Value chain total impact / volume',
    getValue: (study, studies) => {
      const impactNames = getPtImpactsNames(studies)
      return getTotalImpacts(study, impactNames, false)
    },
    getSubValues: (study, studies) => {
      const impactNames = getPtImpactsNames(studies)
      return getPtValuesByImpact(study, impactNames, false)
    },
    format: 'number'
  },
  {
    title: 'Total impact per year on Global warming',
    subtitle: 'Value chain total impact in kg eqCO2',
    getValue: (study) =>
      getImpactValue('Global warming', study, {
        singleScore: false,
        sumTotalPerYear: true
      }),
    format: 'number'
  },
  {
    title: 'Impact per functional unit on Global warming',
    subtitle: 'Value chain total impact / volume',
    getValue: (study) =>
      getImpactValue('Global warming', study, {
        singleScore: false,
        sumTotalPerYear: false
      }),
    format: 'number'
  }
]

function getAvailablePtImpacts(studies) {
  return studies
    .reduce((arr, study) => arr.concat(study.acvData?.impacts), [])
    .filter((item) => !!item)
    .filter((item) => item.unit === 'Pt')
}

function getPtImpactsNames(studies) {
  const availableImpacts = getAvailablePtImpacts(studies)
  return ACVImpacts.filter((item) =>
    availableImpacts.map((availableImpact) => availableImpact.name).includes(item.name)
  ).map((impact) => impact.name)
}

function getTotalImpacts(study, impactNames, sumTotalPerYear = false) {
  const valuesByImpact = getPtValuesByImpact(study, impactNames, sumTotalPerYear)
  if (_.isEmpty(valuesByImpact)) {
    return null
  }

  return _.sumBy(Object.values(valuesByImpact))
}

function getPtValuesByImpact(study, impactNames, sumTotalPerYear = false) {
  const valuesByImpact = {}
  impactNames.forEach((impactName) => {
    const impactValue = getImpactValue(impactName, study, {
      singleScore: true,
      sumTotalPerYear
    })
    if (_.isNull(impactValue)) {
      return
    }
    var label = ACVImpacts.find((item) => item.name == impactName).label
    if (label) {
      valuesByImpact[label] = impactValue
    } else {
      valuesByImpact[impactName] = impactValue
    }
  })
  return valuesByImpact
}

function getImpactValue(impactName, study, { singleScore, sumTotalPerYear = false }) {
  if (!study.acvData) {
    return null
  }
  const valueChains = study.acvData.valuechains
  let totalPerYear = 0
  let totalVolume = 0
  for (const { name, volume } of valueChains) {
    const totalChainPerYear = study.acvData.impacts
      .filter((i) => i.name === impactName)
      .filter((i) => (singleScore ? i.unit === 'Pt' : i.unit !== 'Pt'))
      .reduce((arr, item) => arr.concat(item.values), [])
      .filter((val) => val.valuechain_name === name)
      .map((val) => val.value * volume)
      .reduce((s, item) => s + item, 0)
    totalVolume += volume
    totalPerYear += totalChainPerYear
  }
  return sumTotalPerYear ? totalPerYear : totalPerYear / totalVolume
}
