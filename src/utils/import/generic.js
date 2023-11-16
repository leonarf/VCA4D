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
  var sheetAsJson = json["Actor types"]
  return sheetAsJson.map(actor => ({
    name: actor['Actor type name'],
    stage: actor['Stage'] || '',
    id: actor['Actor type code']
  }))
}