import { getTotalAddedValue } from '@utils/economics.js'
import _ from 'lodash'

export const economicsConfig = [
  {
    title: 'Value added',
    subtitle: 'Total value added of value chain',
    getValue: getTotalAddedValue,
    format: 'amount'
  },
  {
    title: 'Share of national GDP',
    subtitle: 'Value chain GDP divided by national GDP',
    getValue: (study) => study.ecoData?.macroData?.valueAddedShareNationalGdp,
    format: 'percent'
  },
  {
    title: 'Share of agricultural GDP',
    subtitle: 'Value chain GDP divided by agricultural GDP',
    getValue: (study) => study.ecoData?.macroData?.valueAddedShareAgriculturalGdp,
    format: 'percent'
  },
  {
    title: 'Rate of Integration',
    subtitle: 'Below 70%: depends on imports',
    getValue: (study) => study.ecoData?.macroData?.rateOfIntegration,
    format: 'percent'
  },
  {
    title: 'Jobs',
    subtitle: 'Total waged employement, excluding family work',
    getValue: getTotalJobs,
    getSubValues: getJobsByStage,
    format: 'number'
  },
  {
    title: 'Total net operating profit at production stage',
    subtitle: 'Total net operating profit per stage',
    getValue: (studyData) => getNetOperatingProfitPerProducer(studyData, false),
    getSubValues: (studyData) => getNetOperatingProfitForOtherStages(studyData, false),
    format: 'amount'
  },
  {
    title: 'Net operating profit per producer',
    subtitle: 'Average net operating profit per actor at each stage',
    getValue: (studyData) => getNetOperatingProfitPerProducer(studyData, true),
    getSubValues: (studyData) => getNetOperatingProfitForOtherStages(studyData, true),
    format: 'amount'
  },
  {
    title: 'Gini Index',
    subtitle: 'Ranges from equality (0) to inequality (1)',
    getValue: (study) => study.ecoData?.macroData?.giniIndex,
    format: 'number'
  }
]

function getTotalJobs(studyData) {
  const jobByStage = getJobsByStage(studyData)
  if (_.isEmpty(jobByStage)) {
    return
  }

  return _.sumBy(Object.values(jobByStage))
}

function getJobsByStage(studyData) {
  if (!studyData.metrics.eco?.employment?.employmentByStage) {
    return {}
  }

  const employmentByStage = studyData.metrics.eco.employment?.employmentByStage
  if (!employmentByStage) {
    return {}
  }

  const jobsByStage = {}
  Object.keys(employmentByStage).forEach((stage) => {
    if (!employmentByStage[stage].total) {
      return
    }
    jobsByStage[stage] = employmentByStage[stage].total
  })
  return jobsByStage
}

function getNetOperatingProfitPerProducer(studyData, perActor = false) {
  if (!studyData.metrics.eco?.netOperatingProfit) {
    return null
  }

  return studyData.metrics.eco.netOperatingProfit?.Producers?.[
    perActor ? 'profitPerActor' : 'totalProfit'
  ]
}

function getNetOperatingProfitForOtherStages(studyData, perActor = false) {
  if (!studyData.metrics.eco?.netOperatingProfit) {
    return {}
  }

  const netOperatingProfitForOtherStages = {}
  const nonProducerStages = Object.keys(studyData.metrics.eco?.netOperatingProfit).filter(
    (stageName) => stageName !== 'Producers'
  )
  nonProducerStages.forEach((stageName) => {
    netOperatingProfitForOtherStages[buildPerStageName(stageName)] =
      studyData.metrics.eco.netOperatingProfit?.[stageName]?.[
        perActor ? 'profitPerActor' : 'totalProfit'
      ]
  })
  return netOperatingProfitForOtherStages
}

function buildPerStageName(stageName) {
  const lowercaseStageName = _.lowerCase(stageName)
  const singularStageName = lowercaseStageName.replace(/s$/, '')
  return `Per ${singularStageName}`
}
