import { setImportErrors, getImportErrors, parseActorTypes } from '@/utils/import/generic.js'

export const parseEconomicsJson = (json) => {
  const stages = json["Stages description"].map((stage, index) => ({
    name: stage['Stages'],
    description: stage['Description'] || '',
    index
  })
  )

  let actors = parseActorTypes(json)
  
    const flows = json["Flow by actor type"].map(flow => ({
      sellerActorName: flow['Seller Name'],
      buyerActorName: flow['Buyer Name'],
      volumeExchanged: flow['Volume exchanged (kg Of product)'],
      monetaryValue: flow['Monetary value'],
      unitPrice: flow['Unitary price (local curency)'],
      volumeUnit: flow['Volume Unit'],
      product: flow['Products']
    }))
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
  
    var missingColumns = new Set()
    var foundColumns = new Set()
    const employments = json["Employment"].map(employment => {
      var result = {
        actorName: 'Actor type Name',
        data : {
          tempMale : 'Temporary Male',
          tempFemale : 'Temporary Female',
          unskilledMale : 'Permanent Unskilled Male',
          unskilledFemale : 'Permanent Unskilled Female',
          skilledMale : 'Permanent Skilled Male',
          skilledFemale : 'Permanent Skilled Female'
        }
      }
      if (result.actorName in employment) {
        foundColumns.add(result.actorName)
        result.actorName = employment[result.actorName]
      }
      else {
        missingColumns.add(result.actorName)
      }
      for (var item in result.data) {
        var colonne = result.data[item]
        if (colonne in employment) {
          result.data[item] = employment[colonne]
          foundColumns.add(colonne)
        }
        else {
          missingColumns.add(colonne)
        }
      }
      result.data = {
        ...result.data,
        totalMale: result.data.tempMale + result.data.unskilledMale + result.data.skilledMale,
        totalFemale: result.data.tempFemale + result.data.unskilledFemale + result.data.skilledFemale,
        totalTemp: result.data.tempMale + result.data.tempFemale,
        totalSkilled: result.data.skilledFemale + result.data.skilledMale,
        totalUnskilled: result.data.unskilledFemale + result.data.unskilledMale,
        total: result.data.tempMale + result.data.tempFemale + result.data.skilledFemale + result.data.skilledMale + result.data.unskilledFemale + result.data.unskilledMale
      }
      return result
    })
    const headerColumnMissing = [...missingColumns].filter(x => !foundColumns.has(x));
    if (headerColumnMissing.length > 0) {
      setImportErrors(`Missing columns headers [${headerColumnMissing.join(', ')}] on first row of excel spreadsheet named 'Employment'`)
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
  
    const importExportItems = json["Imported And exported goods"].map(importExportItem => ({
          label: importExportItem['Goods'],
          importExport: importExportItem['Imported Or Exported'],
          amount: importExportItem['Value (local currency)'],
      })
    )
    const importExport = {
      import: importExportItems.filter(item => item.importExport.localeCompare('IMPORT', undefined, { sensitivity: "base" }) === 0),
      export: importExportItems.filter(item => item.importExport.localeCompare('EXPORT', undefined, { sensitivity: "base" }) === 0),
    }
  
    if (importExportItems.length > 0 && importExport.import.length == 0 && importExport.import.length == 0) {
      setImportErrors("Column 'Imported Or Exported' of excel spreadsheet 'Imported And exported goods' seems to be wrongly filled. It should contains 'IMPORT' or 'EXPORT")
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
  
    if (!['BIF', 'XOF'].includes(study.targetCurrency)) {
      errors.push({
        level: "error",
        message: `Unknown currency ${study.targetCurrency}`
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
          message: `Missing property ${property}`
        })
      }
    }
    study.ecoData.stages.filter(stage => !stage.description).map(stage => {
      errors.push({
        level: 'info',
        message: `Stage ${stage.name} has no description`
      })
    })
    const stageNames = study.ecoData.stages.map(stage => stage.name)
    study.ecoData.actors.filter(actor => !stageNames.includes(actor.stage)).map(actor => {
      errors.push({
        level: 'error',
        message: `Actor ${actor.name} has a stage ${actor.stage} not defined in Stages`
      })
    })
    const actorNames = study.ecoData.actors.map(actor => actor.name)
    study.ecoData.flows.filter(flow => !actorNames.includes(flow.buyerActorName) || !actorNames.includes(flow.sellerActorName)).map(flow => {
      errors.push({
        level: 'error',
        message: `Unknown actor name in flow ${flow}`
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