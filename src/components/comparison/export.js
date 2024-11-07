import { comparisonConfig } from './comparisonConfig'
import { getAllSubKeys } from './utils'
import { slugify } from '@utils/format.js'
import { getCountry, getProduct } from '@utils/data'

export function downloadComparisonXlsx(studies) {
  const csv = [
    ...getHeaderRows(studies),
    getSectionTitleRow('Macro-economic indicators'),
    ...unfoldIndicators(studies, comparisonConfig.economics),
    getSectionTitleRow('Social Sustainability'),
    ...unfoldIndicators(studies, comparisonConfig.social),
    getSectionTitleRow('Environmental Indicators'),
    ...unfoldIndicators(studies, comparisonConfig.environment)
  ]

  // WIP
  navigator.clipboard.writeText(csv.map((row) => row.join(',')).join('\n'))
}

function getHeaderRows(studies) {
  const productRow = [
    '',
    ...studies.map((study) => getProduct(study?.commodity?.toLowerCase()).prettyName)
  ]
  const countryRow = [
    '',
    ...studies.map((study) => getCountry(slugify(study?.country))?.prettyName)
  ]
  return [productRow, countryRow]
}

function getSectionTitleRow(title) {
  return [title.toUpperCase()]
}

function unfoldIndicators(studies, indicators) {
  const rows = []
  indicators.forEach((indicator) => rows.push(...unfoldIndicator(studies, indicator)))
  return rows
}

function unfoldIndicator(studies, indicator) {
  return [getMainRow(studies, indicator), ...getSubRows(studies, indicator)]
}

function getMainRow(studies, indicator) {
  return [indicator.title, ...studies.map((study) => indicator.getValue(study, studies))]
}

function getSubRows(studies, indicator) {
  if (!indicator.getSubValues) {
    return []
  }

  const subKeys = getAllSubKeys(studies, indicator.getSubValues)
  return subKeys.map((subKey) => [
    `---- ${subKey}`,
    ...studies.map((study) => indicator.getSubValues(study, studies)[subKey])
  ])
}
