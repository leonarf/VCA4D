import { ErrorLevels, setImportErrors, parseActorTypes, getSheetNameContent } from '@utils/import/generic.js'

const parseValueChainsDescriptions = (json) => {
  var sheetname = "Value chains description"
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  const res = sheetAsJson.map((valuechain) => ({
    name: valuechain['Value chain name'],
    volume: valuechain['annual volume'],
    volumeYear: valuechain['year of volume'],
    volumeUnit: valuechain['unit']
  }))
  for (const r of res) {
    if (!r.volume) {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `Volume missing for value chain <b>${r.name}</b> in sheet <b>${sheetname}</b>`)
    }
  }
  return res
}

const parseActorsAndChainsMatrix = (json, valueChains) => {
  var sheetname = "Actors and Chains matrix"
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  for (var item of sheetAsJson) {
    var valueChainName = item["Sub-chain"]
    var valueChain = valueChains.find(e => e.name == valueChainName)
    if (!valueChain) {
      setImportErrors(
        sheetname,
        ErrorLevels.MayBreakNothing,
        `Found an unknown chain value named ${valueChainName} in sheet ${sheetname}`)
    }
    valueChain["actors"] = {...item}
    delete valueChain["actors"]["Sub-chain"]
  }
}

const impactsColumnNamesMapping = {
  name: "Impact category",
  method: "LCIA method",
  functional_unit: "Functional Unit",
  unit: "Sub-chain =>"
}

const totalValueLabel = "Sub-chain total"

const parseImpactsFirstRow = (row, valueChains, sheetname) => {
  var valuechain_and_actors_mapping = {}
  for (var key of Object.keys(impactsColumnNamesMapping)) {
    // Checking that mandatory columns exist
    if (impactsColumnNamesMapping[key] in row) {
      delete row[impactsColumnNamesMapping[key]]
    }
    else {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `The column ${impactsColumnNamesMapping[key]} is missing in sheet ${sheetname}.
        First cell of this column must contains '${impactsColumnNamesMapping[key]}' only`)
    }
  }
  // Checking given valuechain and actors name are known, and building the dictionnary
  for (var props in row) {
    const regex = /([^_]*)_?[0-9]*/;
    var regex_result = regex.exec(props);
    var matchingValuechains = valueChains.filter(valuechain => valuechain.name == regex_result[1])
    if (matchingValuechains.length != 1) {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `The chain value defined on first line of sheet ${sheetname}, named |${regex_result[1]}| doesn't match with previous value chain name ${valueChains.map(valuechain => valuechain.name)}`)
      continue
    }
    if (row[props] in matchingValuechains[0].actors) {
      valuechain_and_actors_mapping[props] = { valuechain_name: matchingValuechains[0].name, actor_name: row[props]}
    }
    else if (row[props] != totalValueLabel) {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `The actor named |${row[props]}| on second line of sheet ${sheetname}, doesn't match with previous actors name for the value chain ${matchingValuechains[0].name}`)
    }
  }
  return valuechain_and_actors_mapping
}


const parseImpacts = (json, valueChains) => {
  var impacts = []
  var sheetname = "Impacts"
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return null
  }
  console.log("plan de travail pour les impacts", sheetAsJson)
  var rowCount = 0
  var dictionnaire_chain_actors_props = {}
  for (var row of sheetAsJson) {
    ++rowCount
    if (rowCount == 1) {
      dictionnaire_chain_actors_props = parseImpactsFirstRow(row, valueChains, sheetname)
      continue
    }
    if (rowCount == 2) {
      // Ignoring second row because it's part of header
      continue
    }
    var newImpact = {}
    for (var key of Object.keys(impactsColumnNamesMapping)) {
      if (impactsColumnNamesMapping[key] in row) {
        newImpact[key] = row[impactsColumnNamesMapping[key]]
        delete row[impactsColumnNamesMapping[key]]
      }
      else {
        setImportErrors(
          sheetname,
          ErrorLevels.BreaksDataviz,
          `The column ${impactsColumnNamesMapping[key]} in sheet ${sheetname} is not filled at line ${rowCount}`)
      }
    }
    newImpact["values"] = []
    for (var props in row) {
      if (props in dictionnaire_chain_actors_props) {
        newImpact["values"].push({...dictionnaire_chain_actors_props[props], value : row[props]})
      }
    }
    impacts.push(newImpact)
  }
  return impacts
}

export const parseEnvironmentJson = (json) => {
  let valuechains = parseValueChainsDescriptions(json)
  console.log("value chains:", valuechains)
  
  let actors = parseActorTypes(json)
  console.log("actors:", actors)

  parseActorsAndChainsMatrix(json, valuechains, actors)

  var impacts = parseImpacts(json, valuechains)
  console.log("impacts:", impacts)
  return {
    valuechains,
    actors,
    impacts
  }
}
