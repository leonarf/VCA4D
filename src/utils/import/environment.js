import {
  ErrorLevels,
  setImportErrors,
  parseActorTypes,
  getSheetNameContent
} from '@utils/import/generic.js'

export const ACV_SHEET_NAMES = {
  Home: 'Value Chain',
  ValueChainsDescription: 'Value chains description',
  ActorTypes: 'Actor types',
  Impacts: 'Impacts'
}

const parseValueChainsDescriptions = (json) => {
  var sheetname = ACV_SHEET_NAMES.ValueChainsDescription
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }

  const res = sheetAsJson
    .filter(
      (row) =>
        row['Value chain name'] != undefined &&
        (row['annual volume'] != undefined ||
          row['year of volume'] != undefined ||
          row['unit'] != undefined)
    )
    .map((valuechain) => ({
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
        `Volume missing for value chain <b>${r.name}</b> in sheet <b>${sheetname}</b>`
      )
    }
  }
  return res
}

const parseActorsAndChainsMatrix = (json, valueChains) => {
  var sheetname = 'Actors and Chains matrix'
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  for (var item of sheetAsJson) {
    var valueChainName = item['Sub-chain']
    var valueChain = valueChains.find((e) => e.name == valueChainName)
    if (!valueChain) {
      setImportErrors(
        sheetname,
        ErrorLevels.MayBreakNothing,
        `Found an unknown chain value named ${valueChainName} in sheet ${sheetname}`
      )
      continue
    }
    valueChain['actors'] = { ...item }
    delete valueChain['actors']['Sub-chain']
  }
}

const impactsColumnNamesMapping = {
  name: 'Impact category',
  method: 'LCIA method',
  functional_unit: 'Functional Unit',
  unit: 'Sub-chain →'
}

const totalValueLabel = 'Sub-chain total'

const parseImpactsFirstRow = (firstRow, secondRow, valueChains, sheetname, actors) => {
  var valuechain_and_actors_mapping = {}
  for (var key of Object.keys(impactsColumnNamesMapping)) {
    // Checking that mandatory columns exist
    if (impactsColumnNamesMapping[key] in firstRow) {
      delete firstRow[impactsColumnNamesMapping[key]]
    } else {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `The column ${impactsColumnNamesMapping[key]} is missing in first row of sheet ${sheetname}.\n
        First cell of this column must contains '${impactsColumnNamesMapping[key]}' only, and second cell must not be empty\n
        ${Object.keys(firstRow)}\n`
      )
    }
  }
  // Checking given valuechain and actors name are known, and building the dictionnary
  for (var props in firstRow) {
    const regex = /([^_]*)_?[0-9]*/
    var regex_result = regex.exec(props)
    var matchingValuechains = valueChains.filter((valuechain) => valuechain.name == regex_result[1])
    if (matchingValuechains.length != 1) {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `The chain value defined on first line of sheet ${sheetname}, named |${regex_result[1]}| should match one of the following value chain name:\n
        ${valueChains.map((valuechain) => valuechain.name)}`
      )
      continue
    }
    var actorsName = actors.map((actor) => actor.name)
    if (actorsName.includes(secondRow[props])) {
      valuechain_and_actors_mapping[props] = {
        valuechain_name: matchingValuechains[0].name,
        actor_name: secondRow[props]
      }
    } else if (firstRow[props] == totalValueLabel) {
      valuechain_and_actors_mapping[props] = {
        valuechain_name: matchingValuechains[0].name,
        actor_name: totalValueLabel
      }
    } else {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksALot,
        `The actor named |${secondRow[props]}| on third line of sheet ${sheetname}, should match one of the following actors:
        \n${actorsName}`
      )
    }
  }
  return valuechain_and_actors_mapping
}

const parseImpacts = (json, valueChains, actors) => {
  var impacts = []
  var sheetname = ACV_SHEET_NAMES.Impacts
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return null
  }
  var rowCount = 0
  var dictionnaire_chain_actors_props = {}
  var firstRow = null
  for (var row of sheetAsJson) {
    var mutableRow = { ...row }
    ++rowCount
    if (rowCount == 1) {
      firstRow = mutableRow
      continue
    }
    if (rowCount == 2) {
      // First and second rows contain value chain's actor's names
      dictionnaire_chain_actors_props = parseImpactsFirstRow(
        firstRow,
        mutableRow,
        valueChains,
        sheetname,
        actors
      )
      continue
    }
    var newImpact = {}
    for (var key of Object.keys(impactsColumnNamesMapping)) {
      if (impactsColumnNamesMapping[key] in mutableRow) {
        newImpact[key] = mutableRow[impactsColumnNamesMapping[key]]
        delete mutableRow[impactsColumnNamesMapping[key]]
      } else {
        setImportErrors(
          sheetname,
          ErrorLevels.BreaksDataviz,
          `The column ${impactsColumnNamesMapping[key]} in sheet ${sheetname} is not filled at line ${rowCount + 1}`
        )
      }
    }
    newImpact['values'] = []
    for (var props in mutableRow) {
      if (
        props in dictionnaire_chain_actors_props &&
        dictionnaire_chain_actors_props[props]['actor_name'] != totalValueLabel
      ) {
        var sameActorImpact = newImpact['values'].filter(
          (item) =>
            item.actor_name == dictionnaire_chain_actors_props[props].actor_name &&
            item.valuechain_name == dictionnaire_chain_actors_props[props].valuechain_name
        )
        if (sameActorImpact.length == 1) {
          sameActorImpact[0].value += mutableRow[props]
        } else {
          newImpact['values'].push({
            ...dictionnaire_chain_actors_props[props],
            value: mutableRow[props]
          })
        }
      }
    }
    impacts.push(newImpact)
  }
  return impacts
}

export const parseEnvironmentJson = (json) => {
  let valuechains = parseValueChainsDescriptions(json)

  let actors = parseActorTypes(json)

  parseActorsAndChainsMatrix(json, valuechains, actors)

  var impacts = parseImpacts(json, valuechains, actors)
  return {
    valuechains,
    actors,
    impacts
  }
}
