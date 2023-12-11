import { ECO_SHEET_NAMES } from "./eco"

let ImportErrors = []

export const clearImportErrors = () => {
  ImportErrors = []
}

export const setImportErrors = (message, level = "error") => {
  console.log("Following error during import :", message)
  ImportErrors.push({
    level: level,
    message: message
  })
}

export const getImportErrors = () => {
  return ImportErrors
}


export const parseActorTypes = (json) => {
  var sheetAsJson = json[ECO_SHEET_NAMES.ActorTypes]
  return sheetAsJson.map(actor => ({
    name: actor['Actor type name'],
    stage: actor['Stage'] || '',
    id: actor['Actor type code']
  }))
}

export const doColumnExist = (excelDataAsJson, columnName) => {
  var filteredItems = excelDataAsJson.find(row => !!row[columnName])
  return !!filteredItems
}