import { getTotalAddedValue } from '@utils/economics.js'
import _ from 'lodash'

export const economicsConfig = [
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
    title: 'Value added',
    subtitle: 'Total value added of value chain',
    getValue: getTotalAddedValue,
    format: 'amount'
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
    title: 'Net operating profit per producer',
    subtitle: 'Average net operating profit per actor at each stage',
    getValue: getNetOperatingProfitPerProducer,
    getSubValues: getNetOperatingProfitForOtherStages,
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

function getNetOperatingProfitPerProducer(studyData) {
  if (!studyData.metrics.eco?.netOperatingProfitPerActor) {
    return null
  }

  return studyData.metrics.eco.netOperatingProfitPerActor?.Producers?.profitPerActor
}

function getNetOperatingProfitForOtherStages(studyData) {
  if (!studyData.metrics.eco?.netOperatingProfitPerActor) {
    return {}
  }

  const netOperatingProfitForOtherStages = {}
  const nonProducerStages = Object.keys(studyData.metrics.eco?.netOperatingProfitPerActor).filter(
    (stageName) => stageName !== 'Producers'
  )
  nonProducerStages.forEach((stageName) => {
    netOperatingProfitForOtherStages[buildPerStageName(stageName)] =
      studyData.metrics.eco.netOperatingProfitPerActor?.[stageName]?.profitPerActor
  })
  return netOperatingProfitForOtherStages
}

function buildPerStageName(stageName) {
  const lowercaseStageName = _.lowerCase(stageName)
  const singularStageName = lowercaseStageName.replace(/s$/, '')
  return `Per ${singularStageName}`
}