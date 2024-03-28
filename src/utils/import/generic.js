import { ECO_SHEET_NAMES } from "./eco"

let ImportErrors = []

export const clearImportErrors = () => {
  ImportErrors = []
}

export const ErrorLevels = Object.freeze({
  BreaksALot: 'BreaksALot',
  BreaksDataviz: 'BreaksDataviz',
  BreaksFunctionalities: 'BreaksFunctionalities',
  BreaksInformations: 'BreaksInformations',
  MayBreakNothing: 'MayBreakNothing'
})

export const setImportErrors = (spreadsheet, level, message) => {
  console.log("Following error during import :", message)
  ImportErrors.push({
    level: level,
    spreadsheet: spreadsheet,
    message: message
  })
}

export const getImportErrors = () => {
  return ImportErrors
}

export const getSheetNameContent = (json, sheetname) => {
  if (!Object.keys(json).includes(sheetname)) {
    setImportErrors(
      sheetname,
      ErrorLevels.BreaksALot,
      `Sheet '${sheetname}' is missing.`
    )
    return null
  }
  return json[sheetname]
}

export const parseActorTypes = (json) => {
  const ACTORS_SHEET_COLUMNS = {
    name : 'Actor type name',
    stage : 'Stage'
  }
  var sheetname = ECO_SHEET_NAMES.ActorTypes
  var sheetAsJson = json[ECO_SHEET_NAMES.ActorTypes]
  checkColumnsExistence(sheetAsJson, ACTORS_SHEET_COLUMNS, sheetname, ErrorLevels.BreaksALot)

  return sheetAsJson.filter(row => row['Actor type name'] != undefined).map(actor => ({
    name: actor['Actor type name'],
    stage: actor['Stage'] || '',
    id: actor['Actor type code']
  }))
}

export const doColumnExist = (excelDataAsJson, columnName) => {
  var filteredItems = excelDataAsJson.find(row => !!row[columnName])
  return !!filteredItems
}

export const checkColumnsExistence = (excelSheetAsJson, columnsDescription, sheetname, errorLevel) => {
  for (var column in columnsDescription) {
    if (!doColumnExist(excelSheetAsJson, columnsDescription[column])){
      setImportErrors(
        sheetname,
        errorLevel,
        `In spreadsheet '${sheetname}', column '${columnsDescription[column]}' is missing or empty`)
    }
  }
}