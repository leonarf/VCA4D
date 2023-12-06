import { setImportErrors, getImportErrors, parseActorTypes } from '@/utils/import/generic.js'
import { KNOWN_CURRENCIES } from '../currency'

export const ECO_SHEET_NAMES = {
  HOME: "Value Chain",
  STAGES_DESCRIPTION: "Stages description",
  FLOWS: "Flow by actor type",
  ACTOR_TYPES: "Actor types"
}

export const parseEconomicsJson = (json) => {
  const stages = json[ECO_SHEET_NAMES.STAGES_DESCRIPTION].map((stage, index) => ({
    name: stage['Stages'],
    description: stage['Description'] || '',
    index
  })
  )

  let actors = parseActorTypes(json)
  
  var expectedColumns = {
    sellerActorName: 'Seller Name',
    buyerActorName: 'Buyer Name',
    volumeExchanged: 'Volume exchanged (kg Of product)',
    monetaryValue: 'Monetary value',
    unitPrice: 'Unitary price (local curency)',
    volumeUnit: 'Volume Unit',
    product: 'Products'
  }
  const flows = json[ECO_SHEET_NAMES.FLOWS].map(flow => {
    var result = {}
    for (var key in expectedColumns) {
      result[key] = flow[expectedColumns[key]]
    }
    return result
  })

  for (var key in expectedColumns) {
    if (flows.filter(flow => flow[key] != undefined).length == 0) {
      setImportErrors(`In spreadsheet '${ECO_SHEET_NAMES.FLOWS}', column '${expectedColumns[key]}' is missing or empty`)
    }
  }

    const indicators = json["Indicator by actor type"].map(indicator => ({
      actorName: indicator['Actor type Name'],
      data: {
        numberOfActors: indicator['Number Of actors In the value chain'] || 0,
        directAddedValue: indicator['Direct added value (local currency)'] || 0,
        publicFundsBalance: indicator['Public funds balance (local currency)'] || 0,
        netOperatingProfit: indicator['Net operating profit (local currency)'] || 0,
        totalCosts: indicator['Total costs (local currency)'] || 0
      }
    }))
    actors = actors.map(actor => {
      let indicator = indicators.filter(indicator => indicator.actorName === actor.name)
      if (indicator && indicator.length === 1) {
        indicator = indicator[0]
        return {
          ...actor,
          ...indicator.data
        }
      }
      return actor
    })
    const addedValueItems = json["Direct value added receivers"].map(addedValue => ({
      receiverName: addedValue['Receiver Name'],
      value: addedValue['value (local currency)'] || 0
    })
    )
    actors = actors.map(actor => {
      const addedValue = addedValueItems.filter(addedValue => addedValue.receiverName === actor.name)[0]
      return {
        ...actor,
        receivedAddedValue: addedValue?.value || 0
      }
    })
  
    const addedValue = {
      landOwnersFees: addedValueItems.filter(element => element.receiverName === 'Land owners (land fees)')[0].value,
      depreciation: addedValueItems.filter(element => element.receiverName === 'Depreciation')[0].value,
      employeeWages: addedValueItems.filter(element => element.receiverName === 'Employees (wages)')[0].value,
      financialInstitutionsInterests: addedValueItems.filter(element => element.receiverName === 'Financial institutions (interests On loans)')[0].value,
      government: addedValueItems.filter(element => element.receiverName === 'Government (taxes - subsidies)')[0].value,
    }

    const actorTypeColumn = "Actor type Name"
    const EmploymentColumns = {
      TEMP_MALE: "Temporary Male",
      TEMP_FEMALE: "Temporary Female",
      UNSKILLED_MALE: "Permanent Unskilled Male",
      UNSKILLED_FEMALE: "Permanent Unskilled Female",
      SKILLED_MALE: "Permanent Skilled Male",
      SKILLED_FEMALE: "Permanent Skilled Female",
    }
  
    var missingColumns = new Set()
    var foundColumns = new Set()
    json["Employment"].forEach(employment => {
      [actorTypeColumn, ...Object.values(EmploymentColumns)].forEach(columnName => {
        if (columnName in employment) {
          foundColumns.add(columnName)
        } else {
          missingColumns.add(columnName)
        } 
      })
    })


    const employments = json["Employment"].map(employment => {

      const actorName = employment[actorTypeColumn]
      const tempMale = parseFloat(employment[EmploymentColumns.TEMP_MALE])
      const tempFemale = parseFloat(employment[EmploymentColumns.TEMP_FEMALE])
      const unskilledMale = parseFloat(employment[EmploymentColumns.UNSKILLED_MALE])
      const unskilledFemale = parseFloat(employment[EmploymentColumns.UNSKILLED_FEMALE])
      const skilledMale = parseFloat(employment[EmploymentColumns.SKILLED_MALE])
      const skilledFemale = parseFloat(employment[EmploymentColumns.SKILLED_FEMALE])

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
  
    const accountItems = json["Account by actor type"].map(accountItem => ({
      actorName: accountItem['Actor type name'],
      data: {
        costOrRevenue: accountItem['Cost Or revenue'],
        item: accountItem['Item'],
        value: accountItem['Value']
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
  
    var sheetname = "Imported And exported goods"
    const importExportItems = json[sheetname].map(importExportItem => ({
          label: importExportItem['Goods'],
          importExport: importExportItem['Imported Or Exported'],
          amount: importExportItem['Value (local currency)'],
      })
    )

    var importExport = {
      import: [],
      export: []
    }

    var acceptableImportKeyWord = ["IMPORT", "Imported"]
    for (var keyword of acceptableImportKeyWord) {
      importExport.import.push(...importExportItems.filter(item => item.importExport.localeCompare(keyword, undefined, { sensitivity: "base" }) === 0))
    }
    var acceptableExportKeyWord = ["EXPORT", "Exported"]
    for (var keyword of acceptableExportKeyWord) {
      importExport.export.push(...importExportItems.filter(item => item.importExport.localeCompare(keyword, undefined, { sensitivity: "base" }) === 0))
    }
  
    if (importExportItems.length > 0 && importExport.import.length == 0 && importExport.import.length == 0) {
      setImportErrors(`Column 'Imported Or Exported' of excel spreadsheet '${sheetname}' seems to be wrongly filled. It should contains one of '${acceptableImportKeyWord}' for import or one of '${acceptableExportKeyWord}' for export`)
    }
  
    const farmToFinalPricesRatio = json["Farm gate price In final price"].map(priceItem => ({
      label: priceItem["Case Of start And End price"],
      farmPrice: priceItem["Farm gate price (local currency)"],
      finalPrice: priceItem["End price"]
    }))
    
    return {
      stages,
      actors,
      flows,
      addedValue,
      importExport,
      farmToFinalPricesRatio
    }
  }

  export const getErrors = (study) => {
    let errors = getImportErrors()
  
    if (!KNOWN_CURRENCIES.includes(study.targetCurrency)) {
      errors.push({
        level: "error",
        message: `Unknown currency <b>${study.targetCurrency}</b>`
      })
    }
    for (const property of [
      'commodity',
      'country',
      'year',
    ]) {
      if (!study[property]) {
        errors.push({
          level: "error",
          message: `Missing property <b>${property}</b> in sheet ${ECO_SHEET_NAMES.HOME}`
        })
      }
    }
    study.ecoData.stages.filter(stage => !stage.description).map(stage => {
      errors.push({
        level: 'info',
        message: `Add a description to stage <b>${stage.name}</b> in the sheet <b>${ECO_SHEET_NAMES.STAGES_DESCRIPTION}</b>`
      })
    })
    const actorNames = study.ecoData.actors.map(actor => actor.name)
    let unknownActorsInFlows = []
    unknownActorsInFlows = unknownActorsInFlows.concat(study.ecoData.flows.filter(flow => !actorNames.includes(flow.buyerActorName)).reduce((arr, flow) => arr.concat(flow.buyerActorName), []))
    unknownActorsInFlows = unknownActorsInFlows.concat(study.ecoData.flows.filter(flow => !actorNames.includes(flow.sellerActorName)).reduce((arr, flow) => arr.concat(flow.buyerActorName), []))
    unknownActorsInFlows.map(actor => {
      errors.push({
        level: 'error',
        message: `Actor named <b>${actor}</b> in sheet <b>${ECO_SHEET_NAMES.FLOWS}</b> is not defined in sheet <b>${ECO_SHEET_NAMES.ACTOR_TYPES}</b>`
      })
    })
  
    const totalCreatedAddedValue = study.ecoData.actors.map(actor => actor.directAddedValue || 0).reduce((res, curr) => res + curr, 0)
    let totalReceivedAddedValue = study.ecoData.actors.map(actor => actor.receivedAddedValue).reduce((res, curr) => res + curr, 0)
    for (const key in study.ecoData.addedValue) {
      totalReceivedAddedValue += study.ecoData.addedValue[key]
    }
    const diff = Math.round(Math.abs(totalCreatedAddedValue - totalReceivedAddedValue))
    if (diff > 0) {
      errors.push({
        level: 'error',
        message: `Total added value created and received should match, diff = ${diff}`
      })
    }
    return errors
  }