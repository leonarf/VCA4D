import { ErrorLevels, setImportErrors, getImportErrors, getSheetNameContent, parseActorTypes, checkColumnsExistence } from '@/utils/import/generic.js'
import { getTotalAddedValue } from '../economics'

export const ECO_SHEET_NAMES = {
  Home: "Value Chain",
  StagesDescription: "Stages description",
  ActorTypes: "Actor types",
  FarmGate: "Farm gate price In final price",
  Indicators: "Indicator by actor type",
  ValueAddedReceivers: "Direct value added receivers",
  Employment: "Employment",
  AccountByActor: "Account by actor type",
  ImportExport: "Imported And exported goods",
  Translation: "AFA Translations",
  Flows: "Flow by actor type",
}

export const HOME_LABELS = {
  Country: "Country",
  Commodity: "Commodity",
  LocalCcy: "Currency unit AFA",
  TargetCcy: "Currency (ISO)",
  RatioCcy: "Conversion rate Currency unit AFA to Currency (ISO)",
  NominalProtectionCoefficient: "Nominal protection coefficient",
  DomesticResourceCostRatio: "Domestic resource cost ratio",
  RateOfIntegrationIntoDomesticEconomy: "Rate of integration into domestic economy",
  PublicFundsBalanceRatio: "Public funds balance / Public budget",
  ValueAddedShareNationalGdp: "Value added share of national GDP",
  ValueAddedShareAgriculturalGdp: "Value added share of the agricultural sector GDP",
  GiniIndex: "Gini index",
  FTE_Definition: "Full-time equivalent (FTE) definition",
}

const FARM_GATE_COLUMNS = {
  Case: "Case of start and end price",
  FarmPrice: "Farm gate price (local currency)",
  FarmProduct: "Farm product",
  EndPrice: "End products unit value",
  EndProducts: "End products"
}

const TRANSLATIONS_COLUMNS = {
  AFAName: 'AFA Names',
  EnglishTranslation: 'English translation',
}

const FLOWS_COLUMNS = {
  sellerActorName: 'Seller Name',
  buyerActorName: 'Buyer Name',
  volumeExchanged: 'Volume exchanged (kg Of product)',
  monetaryValue: 'Monetary value',
  unitPrice: 'Unitary price (local curency)',
  volumeUnit: 'Volume Unit',
  product: 'Products'
}

const INDICATORS_COLUMNS = {
  ActorName: "Actor type Name",
  numberOfActors: "Number of actors in the value chain",
  directAddedValue: "Direct added value (local currency)",
  publicFundsBalance: "Public funds balance (local currency)",
  netOperatingProfit: "Net operating profit (local currency)",
  totalCosts: "Total costs (local currency)",
}

const VALUE_ADDED_COLUMNS = {
  ReceiverName: "Receiver Name",
  Value: "Value (local currency)",
}

const EMPLOYMENT_COLUMNS = {
  ActorType: "Actor type Name",
  TempMale: "Temporary Male",
  TempFemale: "Temporary Female",
  UnskilledMale: "Permanent Unskilled Male",
  UnskilledFemale: "Permanent Unskilled Female",
  SkilledMale: "Permanent Skilled Male",
  SkilledFemale: "Permanent Skilled Female",
}

const ACCOUNT_COLUMNS = {
  ActorName: "Actor type name",
  CostOrRevenue: "Cost or Revenue",
  Item: "Item",
  Value: "Value",
}

const IMPORT_EXPORT_COLUMNS = {
  Goods: "Goods",
  ImportOrExport: "Imported or Exported",
  Value: "Value (local currency)",
}

export const getValueChainProperty = (json, propertyName, mandatory = true) => {
  let sheetName = "Study id"
  if (!Object.keys(json).includes(sheetName)) {
    sheetName = ECO_SHEET_NAMES.Home
    if (!Object.keys(json).includes(sheetName)) {
      setImportErrors(
        'Study id',
        ErrorLevels.BreaksALot,
        `Spreadcheet is missing. It should define things such as country, commodity, currency.`,
      )
      return null
    }
  }
  var elementFound = json[sheetName].find(element => element["Property"] === propertyName)
  if (elementFound) {
    return elementFound["Value"]
  }
  if (mandatory) {
    setImportErrors(
      sheetName,
      ErrorLevels.BreaksFunctionalities,
      `Couldn't find '${propertyName}' in excel's sheet '${sheetName}'`)
  }
  return null
}

const parseStageSheet = (json) => {
  const STAGE_SHEET_COLUMNS = {
    Stages: "Stages",
    Description: "Description",
  }
  var sheetName = ECO_SHEET_NAMES.StagesDescription
  var sheetAsJson = getSheetNameContent(json, sheetName)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, STAGE_SHEET_COLUMNS, sheetName, ErrorLevels.BreaksDataviz)

  return sheetAsJson.map((stage, index) => {
    var stageName = stage[STAGE_SHEET_COLUMNS.Stages]
    var description = stage[STAGE_SHEET_COLUMNS.Description]
    if (!description) {
      setImportErrors(
        sheetName,
        ErrorLevels.BreaksInformations,
        `Add a description to stage <b>${stageName}</b> in the sheet <b>${sheetName}</b>`)
        description = ''
    }
    return {
      name: stageName,
      description: description,
      index
    }
  })
}

const parseTranslationSheet = (json) => {
  var sheetname = ECO_SHEET_NAMES.Translation
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, TRANSLATIONS_COLUMNS, sheetname, ErrorLevels.BreaksInformations)

  var translationDict = {}
  for (var row of sheetAsJson) {
    if (row[TRANSLATIONS_COLUMNS.EnglishTranslation] && row[TRANSLATIONS_COLUMNS.AFAName]) {
      translationDict[row[TRANSLATIONS_COLUMNS.AFAName]] = row[TRANSLATIONS_COLUMNS.EnglishTranslation]
    }
  }
  return translationDict
}

const checkDataConsistencyAfterTranslation = (study) => {
  let uniqueActorName = new Set()
  study.actors.forEach(actor => {
    if (uniqueActorName.has(actor.name)) {
      setImportErrors(
        ECO_SHEET_NAMES.Translation,
        ErrorLevels.BreaksFunctionalities,
        `In spreadsheet '${ECO_SHEET_NAMES.Translation}', after translation applied, more than one actor with the name '${actor.name}'`, 'info')
    }
    else {
      uniqueActorName.add(actor.name)
    }
  })
}

const parseFlowsSheet = (json) => {
  var sheetname = ECO_SHEET_NAMES.Flows
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, FLOWS_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  var result = []
  for (var row of sheetAsJson) {
    // Ignore row with a lot of emptyness
    if (!row[FLOWS_COLUMNS.buyerActorName] && !row[FLOWS_COLUMNS.sellerActorName] && !row[FLOWS_COLUMNS.product]) {
      continue
    }
    var newItem = {}
    for (var key in FLOWS_COLUMNS) {
      newItem[key] = row[FLOWS_COLUMNS[key]]
    }
    result.push(newItem)
  }
  return result
}

const parseIndicatorsSheet = (json, actors) => {
  var sheetname = ECO_SHEET_NAMES.Indicators

  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, INDICATORS_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  const indicators = sheetAsJson.map(indicator => ({
    actorName: indicator[INDICATORS_COLUMNS.ActorName],
    data: {
      numberOfActors: indicator[INDICATORS_COLUMNS.numberOfActors] || 0,
      directAddedValue: indicator[INDICATORS_COLUMNS.directAddedValue] || 0,
      publicFundsBalance: indicator[INDICATORS_COLUMNS.publicFundsBalance] || 0,
      netOperatingProfit: indicator[INDICATORS_COLUMNS.netOperatingProfit] || 0,
      totalCosts: indicator[INDICATORS_COLUMNS.totalCosts] || 0
    }
  }))

  actors = actors.map(actor => {
    let indicator = indicators.filter(indicator => indicator.actorName === actor.name)
    if (indicator.length == 0 && actor.stage != "End use") {
      setImportErrors(
        sheetname,
        ErrorLevels.MayBreakNothing,
        `In spreadsheet '${sheetname}', data for actor '${actor.name}' were not found`, 'info')
    }
    else if (indicator.length > 1) {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksDataviz,
        `In spreadsheet '${sheetname}', actor '${actor.name}' appears more than once`)
    }
    else if (indicator.length === 1) {
      indicator = indicator[0]
      return {
        ...actor,
        ...indicator.data
      }
    }
    return actor
  })
  return actors
}

const parseValueAddedReceiverSheet = (json, actors) => {
  var sheetname = ECO_SHEET_NAMES.ValueAddedReceivers
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, VALUE_ADDED_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  const addedValueItems = sheetAsJson.map(addedValue => ({
    receiverName: addedValue[VALUE_ADDED_COLUMNS.ReceiverName],
    value: addedValue[VALUE_ADDED_COLUMNS.Value] || 0
  }))
  actors = actors.map(actor => {
    const addedValue = addedValueItems.filter(addedValue => addedValue.receiverName === actor.name)[0]
    return {
      ...actor,
      receivedAddedValue: addedValue?.value || 0
    }
  })

  const specialsAddedValueKeys = {
    landOwnersFees: 'Land owners (land fees)',
    depreciation: 'Depreciation',
    employeeWages: 'Employees (wages)',
    financialInstitutionsInterests: 'Financial institutions (interests on loans)',
    government: 'Government (taxes - subsidies)',
  }

  var addedValue = {}
  for (var key in specialsAddedValueKeys) {
    var filteredItems = addedValueItems.filter(element => element.receiverName === specialsAddedValueKeys[key])
    if (filteredItems.length == 1) {
      addedValue[key] = filteredItems[0].value
    }
    else {
      setImportErrors(
        sheetname,
        ErrorLevels.BreaksDataviz,
        `In spreadsheet '${sheetname}', couldn't find the following '${VALUE_ADDED_COLUMNS.ReceiverName}' => ${specialsAddedValueKeys[key]}`)
    }
  }
  return {
    actors,
    addedValue
  }
}

const parseEmploymentSheet = (json, actors) => {
  var sheetname = ECO_SHEET_NAMES.Employment
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, EMPLOYMENT_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  const employments = sheetAsJson.map(employment => {
    const actorName = employment[EMPLOYMENT_COLUMNS.ActorType]
    const tempMale = parseFloat(employment[EMPLOYMENT_COLUMNS.TempMale])
    const tempFemale = parseFloat(employment[EMPLOYMENT_COLUMNS.TempFemale])
    const unskilledMale = parseFloat(employment[EMPLOYMENT_COLUMNS.UnskilledMale])
    const unskilledFemale = parseFloat(employment[EMPLOYMENT_COLUMNS.UnskilledFemale])
    const skilledMale = parseFloat(employment[EMPLOYMENT_COLUMNS.SkilledMale])
    const skilledFemale = parseFloat(employment[EMPLOYMENT_COLUMNS.SkilledFemale])

    const totalMale = (tempMale || 0) + (unskilledMale || 0) + (skilledMale || 0)
    const totalFemale = (tempFemale || 0) + (unskilledFemale || 0) + (skilledFemale || 0)
    const totalTemp = tempMale + (tempFemale || 0)
    const totalSkilled = skilledMale + (skilledFemale || 0)
    const totalUnskilled = unskilledMale + (unskilledFemale || 0)

    const result = {
      actorName,
      data: {
        tempMale,
        tempFemale,
        unskilledMale,
        unskilledFemale,
        skilledMale,
        skilledFemale,
        totalMale,
        totalFemale,
        totalTemp,
        totalSkilled,
        totalUnskilled,
        total: totalMale + (totalFemale || 0)
      }
    }
    return result
  })

  console.log("voici les données d'emplois", employments)

  actors = actors.map(actor => {
    let employment = employments.filter(employment => employment.actorName === actor.name)
    if (employment && employment.length === 1) {
      employment = employment[0]
      return {
        ...actor,
        employment: {
          ...employment.data
        }
      }
    }
    return actor
  })

  return actors
}

const parseAccountByActorSheet = (json, actors, stages) => {
  var sheetname = ECO_SHEET_NAMES.AccountByActor
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, ACCOUNT_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  const accountItems = sheetAsJson.map(accountItem => ({
    actorName: accountItem[ACCOUNT_COLUMNS.ActorName],
    data: {
      costOrRevenue: accountItem[ACCOUNT_COLUMNS.CostOrRevenue],
      item: accountItem[ACCOUNT_COLUMNS.Item],
      value: accountItem[ACCOUNT_COLUMNS.Value]
    }
  })
  )
  actors = actors.map(actor => {
    let accountItem = accountItems.filter(element => element.actorName === actor.name)
    if (accountItem && accountItem.length === 1) {
      accountItem = accountItem[0]
      return {
        ...actor,
        accountItems: {
          ...accountItem.data
        }
      }
    }
    return actor
  })
  actors.sort((actor1, actor2) => {
    const stage1 = stages.find(stage => stage.name === actor1.stage)
    const stage2 = stages.find(stage => stage.name === actor2.stage)
    return (stage1?.index || 0) - (stage2?.index || 0)
  })

  return actors
}

const parseImportExportSheet = (json) => {
  var sheetname = ECO_SHEET_NAMES.ImportExport
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, IMPORT_EXPORT_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  const importExportItems = sheetAsJson.map(importExportItem => ({
    label: importExportItem[IMPORT_EXPORT_COLUMNS.Goods],
    importExport: importExportItem[IMPORT_EXPORT_COLUMNS.ImportOrExport],
    amount: importExportItem[IMPORT_EXPORT_COLUMNS.Value],
  })
  )

  var importExport = {
    import: [],
    export: []
  }

  var acceptableImportKeyWord = ["IMPORT", "Imported"]
  for (let keyword of acceptableImportKeyWord) {
    importExport.import.push(...importExportItems.filter(item => item.importExport?.localeCompare(keyword, undefined, { sensitivity: "base" }) === 0))
  }
  var acceptableExportKeyWord = ["EXPORT", "Exported"]
  for (let keyword of acceptableExportKeyWord) {
    importExport.export.push(...importExportItems.filter(item => item.importExport?.localeCompare(keyword, undefined, { sensitivity: "base" }) === 0))
  }

  if (importExportItems.length > 0 && importExport.import.length == 0 && importExport.import.length == 0) {
    setImportErrors(
      sheetname,
      ErrorLevels.BreaksDataviz,
      `Column '${IMPORT_EXPORT_COLUMNS.ImportOrExport}' of excel worksheet '${sheetname}' seems to be wrongly filled.
      It should contains one of '${acceptableImportKeyWord}' for import or one of '${acceptableExportKeyWord}' for export`)
  }

  return importExport
}

const parseFarmGatePriceSheet = (json, currencyRatio) => {
  var sheetname = ECO_SHEET_NAMES.FarmGate
  var sheetAsJson = getSheetNameContent(json, sheetname)
  if (sheetAsJson == null) {
    return
  }
  checkColumnsExistence(sheetAsJson, FARM_GATE_COLUMNS, sheetname, ErrorLevels.BreaksDataviz)

  var result = sheetAsJson.map(priceItem => {
    if (!priceItem[FARM_GATE_COLUMNS.EndProducts]) {
      setImportErrors(sheetname,
        ErrorLevels.BreaksInformations,
        `In spreadsheet '${sheetname}', case of start and end price named <b>'${priceItem[FARM_GATE_COLUMNS.Case]}'</b> has its column <b>${FARM_GATE_COLUMNS.EndProducts}</b> empty`
      )
    }
    return {
      label: priceItem[FARM_GATE_COLUMNS.Case],
      farmPrice: priceItem[FARM_GATE_COLUMNS.FarmPrice],
      farmProduct: priceItem[FARM_GATE_COLUMNS.FarmProduct],
      endPrice: priceItem[FARM_GATE_COLUMNS.EndPrice],
      endProducts: priceItem[FARM_GATE_COLUMNS.EndProducts]
    }
  })
  if (currencyRatio && currencyRatio != 1) {
    result = result.map(item => {
      return {
        ...item,
        farmPrice: item.farmPrice / currencyRatio,
        endPrice: item.endPrice / currencyRatio
      };
    })
  }
  return result
}

const applyTranslation = (studyData, translationDict) => {
  var namesToTranslate = Object.keys(translationDict)
  for (var actor of studyData.actors) {
    if (namesToTranslate.includes(actor.name)) {
      actor.name = translationDict[actor.name]
    }
  }
  for (var flow of studyData.flows) {
    if (namesToTranslate.includes(flow.sellerActorName)) {
      flow.sellerActorName = translationDict[flow.sellerActorName]
    }
    if (namesToTranslate.includes(flow.buyerActorName)) {
      flow.buyerActorName = translationDict[flow.buyerActorName]
    }
  }
  return studyData
}

export const parseEconomicsJson = (json, currencyRatio) => {
  const stages = parseStageSheet(json)

  let actors = parseActorTypes(json)
  for (const actor of actors) {
    if (!actor.stage) {
      setImportErrors(
        ECO_SHEET_NAMES.ActorTypes,
        ErrorLevels.BreaksALot,
        `Actor <b>${actor.name}</b> should have a stage defined in worksheet ${ECO_SHEET_NAMES.ActorTypes}`)
    }
  }
  const flows = parseFlowsSheet(json)

  actors = parseIndicatorsSheet(json, actors)

  var result = parseValueAddedReceiverSheet(json, actors)
  actors = result.actors
  var addedValue = result.addedValue

  actors = parseEmploymentSheet(json, actors)

  actors = parseAccountByActorSheet(json, actors, stages)

  var importExport = parseImportExportSheet(json)

  const farmToFinalPricesRatio = parseFarmGatePriceSheet(json, currencyRatio)

  // Macro economic indicators
  var macroData = {}
  macroData["giniIndex"] = getValueChainProperty(json, HOME_LABELS.GiniIndex)
  macroData["FTE_Definition"] = getValueChainProperty(json, HOME_LABELS.FTE_Definition)
  macroData["rateOfIntegration"] = (getValueChainProperty(json, HOME_LABELS.RateOfIntegrationIntoDomesticEconomy) / 100.0) || undefined
  macroData["publicFundsBalance"] = (getValueChainProperty(json, HOME_LABELS.PublicFundsBalanceRatio) / 100.0) || undefined
  macroData["valueAddedShareNationalGdp"] = (getValueChainProperty(json, HOME_LABELS.ValueAddedShareNationalGdp) / 100.0) || undefined
  macroData["valueAddedShareAgriculturalGdp"] = (getValueChainProperty(json, HOME_LABELS.ValueAddedShareAgriculturalGdp) / 100.0) || undefined
  macroData["domesticResourceCostRatio"] = getValueChainProperty(json, HOME_LABELS.DomesticResourceCostRatio)
  macroData["nominalProtectionCoefficient"] = getValueChainProperty(json, HOME_LABELS.NominalProtectionCoefficient)

  var studyData = {
    macroData,
    stages,
    actors,
    flows,
    addedValue,
    importExport,
    farmToFinalPricesRatio
  }
  const translationDictionnary = parseTranslationSheet(json)
  if (translationDictionnary) {
    studyData = applyTranslation(studyData, translationDictionnary)
    checkDataConsistencyAfterTranslation(studyData)
  }
  checksActorsAreKnown(studyData);
  return studyData
}


export const checksActorsAreKnown = (ecoData) => {
  let errors = getImportErrors()

  const actorNames = ecoData.actors.map(actor => actor.name)
  let unknownActorsInFlows = []
  console.log(ecoData.flows, actorNames);
  unknownActorsInFlows = unknownActorsInFlows.concat(ecoData.flows.filter(flow => !actorNames.includes(flow.buyerActorName)).reduce((arr, flow) => arr.concat(flow.buyerActorName), []))
  unknownActorsInFlows = unknownActorsInFlows.concat(ecoData.flows.filter(flow => !actorNames.includes(flow.sellerActorName)).reduce((arr, flow) => arr.concat(flow.buyerActorName), []))
  unknownActorsInFlows.map(actor => {
    setImportErrors(
      ECO_SHEET_NAMES.Flows,
      'error',
      `Actor named <b>${actor}</b> in sheet <b>${ECO_SHEET_NAMES.Flows}</b> is not defined in sheet <b>${ECO_SHEET_NAMES.ActorTypes}</b>`
    )
  })

  const totalCreatedAddedValue = getTotalAddedValue({ ecoData })
  let totalReceivedAddedValue = ecoData.actors.map(actor => actor.receivedAddedValue).reduce((res, curr) => res + curr, 0)
  for (const key in ecoData.addedValue) {
    totalReceivedAddedValue += ecoData.addedValue[key]
  }
  const diff = Math.round(Math.abs(totalCreatedAddedValue - totalReceivedAddedValue))
  if (diff > 0) {
    setImportErrors(
      ECO_SHEET_NAMES.Indicators,
      'error',
      `Total added value created found in spreadsheet '${ECO_SHEET_NAMES.Indicators}' is ${totalCreatedAddedValue}. And total added value received found in spreadsheet '${ECO_SHEET_NAMES.ValueAddedReceivers}' is ${totalReceivedAddedValue}. But both should be equal`
    )
  }
  return errors
}
