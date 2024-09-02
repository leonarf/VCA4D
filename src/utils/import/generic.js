import * as XLSX from 'xlsx'
import _ from "lodash";
import { HOME_LABELS, ECO_SHEET_NAMES, getValueChainProperty, parseEconomicsJson } from "./eco.js"
import { parseEnvironmentJson } from './environment.js'

import { processSocialExcelFile } from "./social.js"
import { isValidCurrency, isCurrencySupported } from '@utils/currency.js'
import { getAllKnownProducts } from '@utils/data';
import { slugify } from '@utils/format.js'



let ImportErrors = []

const clearImportErrors = () => {
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
    name: 'Actor type name',
    stage: 'Stage'
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
  var filteredItems = excelDataAsJson.find(row => row[columnName] != undefined)
  return !!filteredItems
}

export const checkColumnsExistence = (excelSheetAsJson, columnsDescription, sheetname, errorLevel) => {
  for (var column in columnsDescription) {
    if (!doColumnExist(excelSheetAsJson, columnsDescription[column])) {
      setImportErrors(
        sheetname,
        errorLevel,
        `In spreadsheet '${sheetname}', column '${columnsDescription[column]}' is missing or empty`)
    }
  }
}

const TypesOfFile = {
  Sustainability: 'Sustainability',
  Environment: 'Environment',
  Economics: 'Economics',
};

export const getTypeOfExcelFile = (workbook) => {
  const sheetNameForSustainabilityData = "Questionnaire"
  const sheetsNameForEnvironmentalData = ["Value chains description"]
  const sheetsNameForEconomicData = ["Stages description"]

  if (workbook.Sheets[sheetNameForSustainabilityData]) {
    return TypesOfFile.Sustainability
  }
  if (workbook.Sheets[sheetsNameForEnvironmentalData[0]]) {
    return TypesOfFile.Environment
  }
  if (workbook.Sheets[sheetsNameForEconomicData[0]]) {
    return TypesOfFile.Economics
  }
  setImportErrors(
    sheetNameForSustainabilityData,
    ErrorLevels.BreaksALot,
    `Missing sheet. At least one of the following should be in the file: '${sheetNameForSustainabilityData}', '${sheetsNameForEnvironmentalData[0]}' or '${sheetsNameForEconomicData[0]}' depending of the excel type, ${Object.keys(TypesOfFile)}`)
  return null
}

const readingOfCurrencies = (excelData) => {
  const localCurrency = getValueChainProperty(excelData, HOME_LABELS.LocalCcy)
  var targetCurrency = getValueChainProperty(excelData, HOME_LABELS.TargetCcy, true)
  var currencyRatio = null
  // Si localCurrency est standard, et pas de targetCurrency, ça suffit
  if (isValidCurrency(localCurrency) && !isValidCurrency(targetCurrency)) {
    targetCurrency = localCurrency
    currencyRatio = 1.0
  }
  // Si seule targetCurrency est valide, il faut le taux de change
  else if (isValidCurrency(targetCurrency)) {
    currencyRatio = getValueChainProperty(excelData, HOME_LABELS.RatioCcy)
  }
  // Aucune n'est valide, on met un message d'erreur
  else if (!isValidCurrency(localCurrency)){
    setImportErrors(
      ECO_SHEET_NAMES.Home,
      ErrorLevels.BreaksFunctionalities,
      `Either currencies defined by '${HOME_LABELS.LocalCcy}' or '${HOME_LABELS.TargetCcy}' should be an ISO currency code. Find all valid currency code by visiting https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes`)
    return {
      localCurrency: null,
      targetCurrency: null,
      currencyRatio: null,
    }
  }
  // vérification qu'on a le taux de change vers USD
  if (!isCurrencySupported(targetCurrency)) {
    setImportErrors(
      ECO_SHEET_NAMES.Home,
      ErrorLevels.BreaksFunctionalities,
      `We don't have the rate change to USD for currency '${targetCurrency}'. Please send an e-mail with it to the administrator`)
  }
  return {
    localCurrency,
    targetCurrency,
    currencyRatio
  }
}

export const processUploadedExcelFile = (workbook) => {
  clearImportErrors();
  let typeOfFile = getTypeOfExcelFile(workbook)

  let result = {};
  if (typeOfFile === TypesOfFile.Sustainability) {
    result = processSocialExcelFile(workbook)
  }

  let excelData = {}
  workbook.SheetNames.forEach((workSheet) => {
    const rowObject = XLSX.utils.sheet_to_json(
      workbook.Sheets[workSheet]
    )
    excelData[workSheet] = rowObject
  })

  if (typeOfFile === TypesOfFile.Economics) {
    const year = getValueChainProperty(excelData, "Reference Year");
    const currencies = readingOfCurrencies(excelData)
    result = {
      ...buildIdentifiers(
        getValueChainProperty(excelData, HOME_LABELS.Commodity),
        slugify(getValueChainProperty(excelData, HOME_LABELS.Country))
      ),
      year,
      ...currencies,
      type: 'eco',
      ecoData: parseEconomicsJson(excelData, currencies.currencyRatio)
    }
  }
  else if (typeOfFile === TypesOfFile.Environment) {
    result = {
      ...buildIdentifiers(
        getValueChainProperty(excelData, HOME_LABELS.Commodity),
        slugify(getValueChainProperty(excelData, HOME_LABELS.Country))
      ),
      type: "ACV",
      acvData: parseEnvironmentJson(excelData),
    }
  }

  let knownProducts = getAllKnownProducts()
  if (!knownProducts.includes(slugify(result.commodity))) {
    setImportErrors(
      ECO_SHEET_NAMES.Home,
      ErrorLevels.BreaksALot,
      `Commodity <b>${slugify(result.commodity)}</b> is not recognized.`)
  }

  return {
    data: result,
    errors: getImportErrors()
  }
}

function buildIdentifiers(commodity, country) {
  return {
    id: slugify(commodity + "-" + country),
    country,
    commodity
  };
}

export function amendDataFile(jsonData, studyData) {
  if (!jsonData.studies.find(study => study.id === studyData.id)) {
        jsonData.studies.push({
            id: `${studyData.id}`,
            title: `${studyData.country} ${studyData.commodity}`,
            year: studyData.year,
            country: studyData.country.toLowerCase(),
            product: studyData.commodity.toLowerCase()
        })
    }
    jsonData.studies.sort(sortFunctionByProperties(["country", "product"]));
  
    const slugifiedCountry = slugify(studyData.country)
    if (!jsonData.countries.find(country => country.id === slugifiedCountry)) {
        jsonData.countries.push({
            id: slugifiedCountry,
            prettyName: studyData.country
        })
    }
    jsonData.countries.sort(sortFunctionByProperties(["id"]));

    const existingCommoditiesInCategories = jsonData.categories.reduce((arr, current) => arr.concat(current.commodities), [])
    const lowercaseCommodity = studyData.commodity.toLowerCase();
    if (!existingCommoditiesInCategories.includes(lowercaseCommodity)) {
        jsonData.categories.find(category => category.id === 'unknown').commodities.push(lowercaseCommodity)
    }

    const existingCommodities = _.uniq(jsonData.studies.map(study => study.product));
    jsonData.products = updateProductList(jsonData.products, existingCommodities);

    return JSON.stringify(
        jsonData
        , null, 2)
}

function updateProductList(products = [], existingProductKeys) {
  const newProducts = [...products];
  existingProductKeys.forEach(productKey => {
    if (!products.find(product => product.id === productKey)) {
      newProducts.push({
        id: productKey,
        prettyName: _.capitalize(productKey) 
      });
    }
  });
  newProducts.sort(sortFunctionByProperties("id"));
  return newProducts;
}

function sortFunctionByProperties(propertyKeys) {
  return function(itemA, itemB) {
    for (var key of propertyKeys) {
      if (itemA[key] < itemB[key]) {
          return -1
      }
      else if (itemA[key] > itemB[key]) {
          return 1
      }
    }
    return 0;
  }
}
