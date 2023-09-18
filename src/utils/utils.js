import { computed } from 'vue';
import CurrencyUtils from '@/utils/currencyUtils.js'

var StagesColors = {
  Producers: "#6AAB9C",
  Collectors: "#FA9284",
  Processors: "#E06C78",
  Wholesalers: "#5874DC",
  Retailers: "#384E78",
  Exporters: "#b57ba6",
  landOwnersFees: "#e5d08f",
  depreciation: "#e3d4b6",
  employeeWages: "#cacbce",
  financialInstitutionsInterests: "#e1dfdf"
}

export const getStageColor = (stageName) => {
  if (stageName in StagesColors) {
    return StagesColors[stageName]
  }
  return "#ff1100"
}

export const formatNumber = (value) => {
  if (!value) {
    return '-'
  }
  let numberDigits = 0
  let divisor = 1
  let textUnit = ''
  if (Math.abs(value) > 1e9) {
    numberDigits = 1
    divisor = 1e9
    textUnit = 'Billions'
  } else if (Math.abs(value) > 1e6) {
    numberDigits = 1
    divisor = 1e6
    textUnit = 'Millions'
  } else if (Math.abs(value) > 1e3) {
    numberDigits = 0
    divisor = 1e3
    textUnit = 'k'
  }
  return `${(value / divisor).toLocaleString(undefined, { maximumFractionDigits: numberDigits })} ${textUnit}`
}

export const formatPercent = (amount) => {
  const numberDigits = Math.abs(amount) < 0.01 ? 2 : (Math.abs(amount) < 0.1 ? 1 : 0)
  return (amount).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: numberDigits,
    maximumFractionDigits: numberDigits
  })
}

export function useUtils(props) {
  const prettyAmount = computed(() => (amount) =>
    CurrencyUtils.prettyFormatAmount(amount, props.currency)
  );

  const convertAmount = computed(() => (amount) =>
    CurrencyUtils.getValueInCurrency(
      amount * props.studyData.currencyRatio,
      props.studyData.targetCurrency,
      props.currency,
      props.studyData.year,
    )
  );

  const stages = computed(() => props.studyData.ecoData.stages);
  const actors = computed(() => props.studyData.ecoData.actors);

  return {
    stages,
    actors,
    prettyAmount,
    convertAmount,
  };
}
export const slugify = (str) => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');


const getQuestionsGroup = (ws, firstRow, lastRow) => {
  return {
    title: ws[`A${firstRow}`]?.v,
    averageValue: ws[`E${lastRow}`]?.v,
    averageText: ws[`D${lastRow}`]?.v,
    questions: Array.from(Array(lastRow - 1 - (firstRow + 1) + 1).keys(), (num) => num + firstRow + 1).map(index => ({
      text: ws[`A${index}`]?.v,
      scoreValue: ws[`E${index}`]?.v,
      scoreText: ws[`D${index}`]?.v,
      comment: ws[`F${index}`]?.v
    }))
  }
}

export const parseSustainabilityWorksheet = (worksheet) => {
  return [
    {
      title: worksheet['A3']?.v,
      groups: [
        getQuestionsGroup(worksheet, 4, 10),
        getQuestionsGroup(worksheet, 11, 14),
        getQuestionsGroup(worksheet, 15, 17),
        getQuestionsGroup(worksheet, 18, 21),
      ]
    },
    {
      title: worksheet['A22']?.v,
      groups: [
        getQuestionsGroup(worksheet, 23, 26),
        getQuestionsGroup(worksheet, 27, 32),
        getQuestionsGroup(worksheet, 33, 38),
      ]
    },
    {
      title: worksheet['A39']?.v,
      groups: [
        getQuestionsGroup(worksheet, 40, 43),
        getQuestionsGroup(worksheet, 44, 49),
        getQuestionsGroup(worksheet, 50, 56),
        getQuestionsGroup(worksheet, 57, 62),
        getQuestionsGroup(worksheet, 63, 66),
      ]
    },
    {
      title: worksheet['A67']?.v,
      groups: [
        getQuestionsGroup(worksheet, 68, 71),
        getQuestionsGroup(worksheet, 72, 75),
        getQuestionsGroup(worksheet, 76, 80),
        getQuestionsGroup(worksheet, 81, 84),
      ]
    },
    {
      title: worksheet['A85']?.v,
      groups: [
        getQuestionsGroup(worksheet, 86, 91),
        getQuestionsGroup(worksheet, 92, 95),
        getQuestionsGroup(worksheet, 96, 100),
      ]
    },
    {
      title: worksheet['A101']?.v,
      groups: [
        getQuestionsGroup(worksheet, 102, 106),
        getQuestionsGroup(worksheet, 107, 110),
        getQuestionsGroup(worksheet, 111, 115),
      ]
    }
  ]
}

export const parseEconomicsJson = (json) => {
  const stages = json["Stages description"].map((stage, index) => ({
    name: stage['Stages'],
    description: stage['Description'] || '',
    index
  })
  )

  let actors = json["Actor types"].map(actor => ({
    name: actor['Actor type name'],
    stage: actor['Stage'] || '',
    id: actor['Actor type code']
  })
  )
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

  const employments = json["Employment"].map(employment => {
    const tempMale = employment['Temporary Male']
    const tempFemale = employment['Temporary Female']
    const unskilledMale = employment['Permanent Unskilled Male']
    const unskilledFemale = employment['Permanent Unskilled Female']
    const skilledMale = employment['Permanent Skilled Male']
    const skilledFemale = employment['Permanent Skilled Female']
    return {
      actorName: employment['Actor type Name'],
      data: {
        tempMale,
        tempFemale,
        unskilledMale,
        unskilledFemale,
        skilledMale,
        skilledFemale,
        totalMale: tempMale + unskilledMale + skilledMale,
        totalFemale: tempFemale + unskilledFemale + skilledFemale,
        totalTemp: tempMale + tempFemale,
        totalSkilled: skilledFemale + skilledMale,
        totalUnskilled: unskilledFemale + unskilledMale,
        total: tempMale + tempFemale + skilledFemale + skilledMale + unskilledFemale + unskilledMale
      }
    }
  })
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
    import: importExportItems.filter(item => item.importExport === 'IMPORT'),
    export: importExportItems.filter(item => item.importExport === 'EXPORT'),
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
  let errors = []

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
  for (const property of [
    'giniIndex',
    'totalValueAdded',
    'publicFundBalance',
    'nominalProtectionCoefficient',
  ]) {
    if (!study[property]) {
      errors.push({
        level: 'info',
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