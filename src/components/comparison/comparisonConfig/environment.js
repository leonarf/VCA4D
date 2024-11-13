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
  let totalPerYear = 0
  let totalVolume = 0

  const studyImpactsToSum = study.acvData.impacts
    .filter((impact) => impact.name === impactName)
    .filter((impact) => (singleScore ? impact.unit === 'Pt' : impact.unit !== 'Pt'))

  studyImpactsToSum.forEach((impact) => {
    const impactValuesByChainName = _.groupBy(impact.values, (value) => value.valuechain_name)

    for (const valueChainName in impactValuesByChainName) {
      const valueChainTotalImpact = _.sumBy(impactValuesByChainName[valueChainName], 'value')
      const volume = findValueChainVolume(study.acvData.valuechains, valueChainName)
      totalVolume += volume
      totalPerYear += valueChainTotalImpact * volume
    }
  })
  return sumTotalPerYear ? totalPerYear : totalPerYear / totalVolume
}

function findValueChainVolume(valueChains, valueChainName) {
  const valueChain = valueChains.find((chain) => chain.name === valueChainName)
  return valueChain?.volume
}
