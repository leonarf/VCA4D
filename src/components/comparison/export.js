import { comparisonConfig } from './comparisonConfig'
import { getAllSubKeys } from './utils'
import { slugify } from '@utils/format.js'
import { getCountry, getProduct } from '@utils/data'
import * as XLSX from 'xlsx'
import _ from 'lodash'
import { getSocialScoreLabel } from '@utils/social.js'
import { useCurrencyUtils } from '../../utils/format'

export function downloadComparisonXlsx(studies) {
  const dataTable = [
    ...getHeaderRows(studies),
    getSectionTitleRow('Macro-economic indicators'),
    ...unfoldIndicators(studies, comparisonConfig.economics),
    getSectionTitleRow('Social Sustainability'),
    ...unfoldIndicators(studies, comparisonConfig.social),
    getSectionTitleRow('Environmental Indicators'),
    ...unfoldIndicators(studies, comparisonConfig.environment)
  ]

  const worksheet = buildSheet(dataTable)
  worksheet['!cols'] = [{ wch: 40 }, ...studies.map(() => ({ wch: 20 }))]
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Comparison data')
  XLSX.writeFile(workbook, 'Studies Comparison.xlsx', { compression: true })
}

function buildSheet(dataTable) {
  const sheet = XLSX.utils.aoa_to_sheet([])
  dataTable.forEach((row, rowIndex) => setRow(sheet, row, rowIndex))
  return sheet
}
function setRow(sheet, row, rowIndex) {
  const rowValues = row.map((cell) => cell.value)
  XLSX.utils.sheet_add_aoa(sheet, [rowValues], {
    origin: XLSX.utils.encode_cell({ c: 0, r: rowIndex })
  })
  const rowCells = getRow(sheet, rowIndex)

  row.forEach((cellData, cellIndex) => {
    if (!rowCells[cellIndex]) {
      return
    }
    rowCells[cellIndex].z = getFormat(cellData)
  })
}
function getFormat({ type = 'number', value }) {
  switch (type) {
    case 'string':
      return ''
    case 'number':
      return value > 100 ? '#,##0' : '0.00'
    case 'social':
      return '0'
    case 'percent':
      return '0.00%'
    case 'amount':
      return '"$"#,##0.00_);\\-"$"#,##0.00'
    default:
      return ''
  }
}

function getRow(sheet, rowIndex) {
  const { columnIndex } = getSheetLastCellIndexes()
  const rowCells = _.range(0, columnIndex + 1).map(
    (column) => sheet[XLSX.utils.encode_cell({ c: column, r: rowIndex })]
  )
  return rowCells

  function getSheetLastCellIndexes() {
    const ref = sheet['!ref']
    const { e: endCell } = XLSX.utils.decode_range(ref)
    return {
      rowIndex: endCell.r,
      columnIndex: endCell.c
    }
  }
}
function getHeaderRows(studies) {
  const productRow = [
    getCell(''),
    ...studies.map((study) => getCell(getProduct(study?.commodity?.toLowerCase()).prettyName))
  ]
  const countryRow = [
    getCell(''),
    ...studies.map((study) => getCell(getCountry(slugify(study?.country))?.prettyName))
  ]
  return [productRow, countryRow]
}

function getSectionTitleRow(title) {
  return [getCell(title.toUpperCase())]
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
  return [
    getCell(indicator.title),
    ...studies.map((study) =>
      getDataCell(indicator.getValue(study, studies), indicator.format, study)
    )
  ]
}

function getSubRows(studies, indicator) {
  if (!indicator.getSubValues) {
    return []
  }

  const subKeys = getAllSubKeys(studies, indicator.getSubValues)
  return subKeys.map((subKey) => [
    getCell(`---- ${subKey}`),
    ...studies.map((study) =>
      getDataCell(indicator.getSubValues(study, studies)[subKey], indicator.format, study)
    )
  ])
}

function getDataCell(value, format, study) {
  if (format === 'amount') {
    const { convertAmount } = useCurrencyUtils({
      studyData: study,
      currency: 'USD'
    })
    return getCell(value ? convertAmount.value(value) : null, 'amount')
  } else if (format === 'social') {
    return getCell(getSocialScoreLabel(value), 'social')
  }

  return getCell(value, format)
}

function getCell(value, type = 'string') {
  return {
    value,
    type
  }
}
