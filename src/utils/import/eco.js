import { setImportErrors, getImportErrors, parseActorTypes, doColumnExist } from '@/utils/import/generic.js'
import { getTotalAddedValue } from '../economics'

export const ECO_SHEET_NAMES = {
  Home: "Value Chain",
  StagesDescription: "Stages description",
  Flows: "Flow by actor type",
  ActorTypes: "Actor types",
  FarmGate: "Farm gate price In final price",
  Indicators: "Indicator by actor type",
  ValueAddedReceivers: "Direct value added receivers",
  Employment: "Employment",
  AccountByActor: "Account by actor type",
  ImportExport: "Imported And exported goods"
}

export const HOME_LABELS = {
  Country : "Country",
  Commodity : "Commodity",
  LocalCcy: "Currency unit AFA",
  TargetCcy: "Currency (ISO)",
  RatioCcy: "Conversion rate Currency unit AFA to Currency (ISO)",
  NominalProtectionCoefficient: "Nominal protection coefficient",
  DomesticResourceCostRatio: "Domestic resource cost ratio",
  RateOfIntegrationIntoDomesticEconomy: "Rate of integration into domestic economy",
  PublicFundsBalanceRatio: "Public funds balance / Public budget",
  ValueAddedShareNationalGdp: "Value added share of national GDP",
  ValueAddedShareAgriculturalGdp: "Value added share of the agricultural sector GDP",
  GiniIndex: "Gini index"
}

const FARM_GATE_COLUMNS = {
  Case: "Case Of start And End price",
  FarmPrice: "Farm gate price (local currency)",
  EndPrice: "End price",
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

const EmploymentColumns = {
  TempMale: "Temporary Male",
  TempFemale: "Temporary Female",
  UnskilledMale: "Permanent Unskilled Male",
  UnskilledFemale: "Permanent Unskilled Female",
  SkilledMale: "Permanent Skilled Male",
  SkilledFemale: "Permanent Skilled Female",
}

const ACCOUNT_COLUMNS = {
  ActorName: "Actor type name",
  CostOrRevenue: "Cost Or revenue",
  Item: "Item",
  Value: "Value",
}

const IMPORT_EXPORT_COLUMNS = {
  Goods: "Goods",
  ImportOrExport: "Imported or Exported",
  Value: "Value (local currency)",
}

export const getValueChainProperty = (json, propertyName) => {
  let sheetName = "Study id"
  if (!Object.keys(json).includes(sheetName)) {
      sheetName = ECO_SHEET_NAMES.Home
      if (!Object.keys(json).includes(sheetName)) {
          setImportErrors(`The excel spreadsheet is missing a sheet named 'Study id' defining things such as country, commodity, currency.`)
          return null
      }
  }
  var elementFound = json[sheetName].find(element => element["Property"] === propertyName)
  if (elementFound) {
      return elementFound["Value"]
  }
  setImportErrors(`Couldn't find '${propertyName}' in excel's sheet '${sheetName}'`)
  return null
}

export const parseEconomicsJson = (json) => {
  const stages = json[ECO_SHEET_NAMES.StagesDescription].map((stage, index) => ({
    name: stage['Stages'],
    description: stage['Description'] || '',
    index
  })
  )

  let actors = parseActorTypes(json)
  for (const actor of actors) {
    if (!actor.stage) {
      setImportErrors(`Actor <b>${actor.name}</b> should have a stage defined in worksheet ${ECO_SHEET_NAMES.ActorTypes}`)
    }
  }
  const flows = json[ECO_SHEET_NAMES.Flows].map(flow => {
    var result = {}
    for (var key in FLOWS_COLUMNS) {
      result[key] = flow[FLOWS_COLUMNS[key]]
    }
    return result
  })

  for (var key in FLOWS_COLUMNS) {
    if (flows.filter(flow => flow[key] != undefined).length == 0) {
      setImportErrors(`In spreadsheet '${ECO_SHEET_NAMES.Flows}', column '${FLOWS_COLUMNS[key]}' is missing or empty`)
    }
  }

  const indicators = json[ECO_SHEET_NAMES.Indicators].map(indicator => ({
    actorName: indicator[INDICATORS_COLUMNS.ActorName],
    data: {
      numberOfActors: indicator[INDICATORS_COLUMNS.numberOfActors] || 0,
      directAddedValue: indicator[INDICATORS_COLUMNS.directAddedValue] || 0,
      publicFundsBalance: indicator[INDICATORS_COLUMNS.publicFundsBalance] || 0,
      netOperatingProfit: indicator[INDICATORS_COLUMNS.netOperatingProfit] || 0,
      totalCosts: indicator[INDICATORS_COLUMNS.totalCosts] || 0
    }
  }))

  for (var key in INDICATORS_COLUMNS) {
    if (key != "ActorName" &&
        indicators.filter(indicator => indicator.data[key] != undefined).length == 0) {
      setImportErrors(`In spreadsheet '${ECO_SHEET_NAMES.Indicators}', column '${INDICATORS_COLUMNS[key]}' is missing or empty`)
    }
  }

  actors = actors.map(actor => {
    let indicator = indicators.filter(indicator => indicator.actorName === actor.name)
    if (indicator.length == 0) {
      setImportErrors(`In spreadsheet '${ECO_SHEET_NAMES.Indicators}', data for actor '${actor.name}' were not found`, 'info')
    }
    else if (indicator.length > 1) {
      setImportErrors(`In spreadsheet '${ECO_SHEET_NAMES.Indicators}', actor '${actor.name}' appears more than once`)
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

    var sheetname = ECO_SHEET_NAMES.ValueAddedReceivers

    for (var key in VALUE_ADDED_COLUMNS) {
      var columnName = VALUE_ADDED_COLUMNS[key]
      if (!doColumnExist(json[sheetname], columnName)) {
        setImportErrors(`In spreadsheet '${sheetname}', missing following column => ${columnName}`)
      }
    }
    const addedValueItems = json[sheetname].map(addedValue => ({
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
        setImportErrors(`In spreadsheet '${sheetname}', couldn't find the following '${VALUE_ADDED_COLUMNS.ReceiverName}' => ${specialsAddedValueKeys[key]}`)
      }
    }

    const actorTypeColumn = "Actor type Name"

  
    var missingColumns = new Set()
    var foundColumns = new Set()
    json[ECO_SHEET_NAMES.Employment].forEach(employment => {
      [actorTypeColumn, ...Object.values(EmploymentColumns)].forEach(columnName => {
        if (columnName in employment) {
          foundColumns.add(columnName)
        } else {
          missingColumns.add(columnName)
        } 
      })
    })


    const employments = json[ECO_SHEET_NAMES.Employment].map(employment => {

      const actorName = employment[actorTypeColumn]
      const tempMale = parseFloat(employment[EmploymentColumns.TempMale])
      const tempFemale = parseFloat(employment[EmploymentColumns.TempFemale])
      const unskilledMale = parseFloat(employment[EmploymentColumns.UnskilledMale])
      const unskilledFemale = parseFloat(employment[EmploymentColumns.UnskilledFemale])
      const skilledMale = parseFloat(employment[EmploymentColumns.SkilledMale])
      const skilledFemale = parseFloat(employment[EmploymentColumns.SkilledFemale])

      const totalMale = (tempMale || 0) + (unskilledMale || 0) + (skilledMale || 0)
      const totalFemale = tempFemale + unskilledFemale + skilledFemale
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
    const headerColumnMissing = [...missingColumns].filter(x => !foundColumns.has(x));
    if (headerColumnMissing.length > 0) {
      setImportErrors(`Missing columns headers [${headerColumnMissing.join(', ')}] on first row of excel spreadsheet named 'Employment', or these columns are empty`)
    }
  
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
  
    const accountItems = json[ECO_SHEET_NAMES.AccountByActor].map(accountItem => ({
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
  
    const importExportItems = json[ECO_SHEET_NAMES.ImportExport].map(importExportItem => ({
          label: importExportItem[IMPORT_EXPORT_COLUMNS.Goods],
          importExport: importExportItem[IMPORT_EXPORT_COLUMNS.ImportOrExport],
          amount: importExportItem[IMPORT_EXPORT_COLUMNS.Value],
      })
    )
    if (importExportItems.every(item => {return item.label == undefined})) {
      setImportErrors(`Column '${IMPORT_EXPORT_COLUMNS.Goods}' seems to be missing from excel worksheet '${ECO_SHEET_NAMES.ImportExport}'`)
    }
    if (importExportItems.every(item => {return item.importExport == undefined})) {
      setImportErrors(`Column '${IMPORT_EXPORT_COLUMNS.ImportOrExport}' seems to be missing from excel worksheet '${ECO_SHEET_NAMES.ImportExport}'`)
    }
    if (importExportItems.every(item => {return item.amount == undefined})) {
      setImportErrors(`Column '${IMPORT_EXPORT_COLUMNS.Value}' seems to be missing from excel worksheet '${ECO_SHEET_NAMES.ImportExport}'`)
    }

    var importExport = {
      import: [],
      export: []
    }

    var acceptableImportKeyWord = ["IMPORT", "Imported"]
    for (var keyword of acceptableImportKeyWord) {
      importExport.import.push(...importExportItems.filter(item => item.importExport?.localeCompare(keyword, undefined, { sensitivity: "base" }) === 0))
    }
    var acceptableExportKeyWord = ["EXPORT", "Exported"]
    for (var keyword of acceptableExportKeyWord) {
      importExport.export.push(...importExportItems.filter(item => item.importExport?.localeCompare(keyword, undefined, { sensitivity: "base" }) === 0))
    }
  
    if (importExportItems.length > 0 && importExport.import.length == 0 && importExport.import.length == 0) {
      setImportErrors(`Column '${IMPORT_EXPORT_COLUMNS.ImportOrExport}' of excel worksheet '${ECO_SHEET_NAMES.ImportExport}' seems to be wrongly filled. It should contains one of '${acceptableImportKeyWord}' for import or one of '${acceptableExportKeyWord}' for export`)
    }
  
    const farmToFinalPricesRatio = json[ECO_SHEET_NAMES.FarmGate].map(priceItem => ({
      label: priceItem[FARM_GATE_COLUMNS.Case],
      farmPrice: priceItem[FARM_GATE_COLUMNS.FarmPrice],
      finalPrice: priceItem[FARM_GATE_COLUMNS.EndPrice]
    }))

    // Macro economic indicators
    var macroData = {}
    macroData["homeSheet"] = json[ECO_SHEET_NAMES.Home]
    macroData["giniIndex"] = getValueChainProperty(json, HOME_LABELS.GiniIndex)
    macroData["rateOfIntegration"] = (getValueChainProperty(json, HOME_LABELS.RateOfIntegrationIntoDomesticEconomy) / 100.0) || undefined
    macroData["publicFundsBalance"] = (getValueChainProperty(json, HOME_LABELS.PublicFundsBalanceRatio) / 100.0) || undefined
    macroData["valueAddedShareNationalGdp"] = (getValueChainProperty(json, HOME_LABELS.ValueAddedShareNationalGdp) / 100.0) || undefined
    macroData["valueAddedShareAgriculturalGdp"] = (getValueChainProperty(json, HOME_LABELS.ValueAddedShareAgriculturalGdp) / 100.0) || undefined
    macroData["domesticResourceCostRatio"] = getValueChainProperty(json, HOME_LABELS.DomesticResourceCostRatio)
    macroData["nominalProtectionCoefficient"] = getValueChainProperty(json, HOME_LABELS.NominalProtectionCoefficient)
    
    return {
      macroData,
      stages,
      actors,
      flows,
      addedValue,
      importExport,
      farmToFinalPricesRatio
    }
  }

  export const getErrors = (study) => {
    console.log("study", study)
    let errors = getImportErrors()
  
    for (const property of [
      'commodity',
      'country',
      'year',
    ]) {
      if (!study[property]) {
        errors.push({
          level: "error",
          message: `Missing property <b>${property}</b> in sheet ${ECO_SHEET_NAMES.Home}`
        })
      }
    }
    study.ecoData.stages.filter(stage => !stage.description).map(stage => {
      errors.push({
        level: 'info',
        message: `Add a description to stage <b>${stage.name}</b> in the sheet <b>${ECO_SHEET_NAMES.StagesDescription}</b>`
      })
    })
    const actorNames = study.ecoData.actors.map(actor => actor.name)
    let unknownActorsInFlows = []
    unknownActorsInFlows = unknownActorsInFlows.concat(study.ecoData.flows.filter(flow => !actorNames.includes(flow.buyerActorName)).reduce((arr, flow) => arr.concat(flow.buyerActorName), []))
    unknownActorsInFlows = unknownActorsInFlows.concat(study.ecoData.flows.filter(flow => !actorNames.includes(flow.sellerActorName)).reduce((arr, flow) => arr.concat(flow.buyerActorName), []))
    unknownActorsInFlows.map(actor => {
      errors.push({
        level: 'error',
        message: `Actor named <b>${actor}</b> in sheet <b>${ECO_SHEET_NAMES.Flows}</b> is not defined in sheet <b>${ECO_SHEET_NAMES.ActorTypes}</b>`
      })
    })
  
    const totalCreatedAddedValue = getTotalAddedValue(study)
    let totalReceivedAddedValue = study.ecoData.actors.map(actor => actor.receivedAddedValue).reduce((res, curr) => res + curr, 0)
    for (const key in study.ecoData.addedValue) {
      totalReceivedAddedValue += study.ecoData.addedValue[key]
    }
    const diff = Math.round(Math.abs(totalCreatedAddedValue - totalReceivedAddedValue))
    if (diff > 0) {
      errors.push({
        level: 'error',
        message: `Total added value created found in spreadsheet '${ECO_SHEET_NAMES.Indicators}' is ${totalCreatedAddedValue}. And total added value received found in spreadsheet '${ECO_SHEET_NAMES.ValueAddedReceivers}' is ${totalReceivedAddedValue}. But both should be equal`
      })
    }
    if (!study.ecoData.macroData?.giniIndex) {
      errors.push({
        level: 'info',
        message: `<b>Gini Index</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.GiniIndex}</b>`
      })
    }
    if (!study.ecoData.macroData?.rateOfIntegration) {
      errors.push({
        level: 'info',
        message: `<b>Rate Of Integration</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.RateOfIntegrationIntoDomesticEconomy}</b>`
      })
    }
    if (!study.ecoData.macroData?.publicFundsBalance) {
      errors.push({
        level: 'info',
        message: `<b>Public Funds Balance</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.PublicFundsBalanceRatio}</b>`
      })
    }
    if (!study.ecoData.macroData?.valueAddedShareNationalGdp) {
      errors.push({
        level: 'info',
        message: `<b>Value Added Share of National GDP</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.ValueAddedShareNationalGdp}</b>`
      })
    }
    if (!study.ecoData.macroData?.valueAddedShareAgriculturalGdp) {
      errors.push({
        level: 'info',
        message: `<b>Value Added Share of Agricultural GDP</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.ValueAddedShareAgriculturalGdp}</b>`
      })
    }
    if (!study.ecoData.macroData?.domesticResourceCostRatio) {
      errors.push({
        level: 'info',
        message: `<b>Domestic Resource Cost Ratio</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.DomesticResourceCostRatio}</b>`
      })
    }
    if (!study.ecoData.macroData?.nominalProtectionCoefficient) {
      errors.push({
        level: 'info',
        message: `<b>Nominal Protection Coefficient</b> not specified in sheet <b>${ECO_SHEET_NAMES.Home}</b> in cell <b>${HOME_LABELS.NominalProtectionCoefficient}</b>`
      })
    }
    return errors
  }
