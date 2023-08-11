import basicApi from '@/repositories/basicApi.js'

const CHANGE_RATES = {
  "BIF": {
    2018: 1782.876875,
    2019: 1845.62289069697,
    2020: 1915.04617583333,
    2021: 1975.95088138768
  },
  "XOF": {
    2014: 500.00,
    2015: 588.24,
    2016: 588.24,
    2017: 588.24,
    2018: 555.55,
    2019: 588.24,
    2020: 625.00
  },
  "EUR": {
    2014: 0.7541,
    2015: 0.9011,
    2016: 0.9039,
    2017: 0.8867,
    2018:	0.846772667108096,
    2019:	0.893276257067393,
    2020:	0.875506396987983,
    2021:	0.845494138890436,
    2022:	0.9523809523809523
  }
}
let CurrencyFormatters = {}
const getCurrencyFormatter = (currency) => {
  if (!(currency in CurrencyFormatters)) {
    CurrencyFormatters[currency] = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    });
  }
  return CurrencyFormatters[currency]
}

const getCurrencySymbol = (currency) => getCurrencyFormatter(currency).format(0).replace(/\d/g, '')

const getRate = (currency, year) => {
  const usdRate = CHANGE_RATES[currency]
  if (!usdRate) {
    console.warn(`${currency}/USD rate missing`)
    return 1.0
  }
  const usdRateYear = usdRate[year]
  if (!usdRateYear) {
    console.warn(`${currency}/USD rate missing year ${year}`)
    return 1.0
  }
  return usdRateYear
}

const getValueInCurrency = (amount, fromCurrency, toCurrency, year) => {
  if (fromCurrency === toCurrency) {
    return amount
  }
  if (toCurrency === 'USD') {
    return amount / getRate(fromCurrency, year)
  }
  if (toCurrency !== 'EUR') {
    console.warn(`Invalid rate ${fromCurrency}/${toCurrency}`)
  }
  return amount / getRate(fromCurrency, year) * getRate("EUR", year)
}

const prettyFormatAmount = (amount, currency) => {
  let numberDigits = 0
  let divisor = 1
  let textUnit = ''
  if (Math.abs(amount) > 1e9) {
    numberDigits = 1
    divisor = 1e9
    textUnit = 'Billions '
  } else if (Math.abs(amount) > 1e6) {
    numberDigits = 1
    divisor = 1e6
    textUnit = 'Millions '
  }
  return `${new Intl.NumberFormat('en', {
    style: "decimal",
    maximumFractionDigits: numberDigits,
  }).format(amount / divisor)} ${textUnit}${getCurrencySymbol(currency)}`;
}

let currency = "INR"
let currency_conversion_factor = 1

const changeCurrency = async (newCurrency) => {
  currency = newCurrency
  var change_rates = await basicApi.getChangeRates()
  currency_conversion_factor = change_rates[currency]
}

const getUserCurrency = () => {
  return currency
}

const formatAmount = (amount) => {
  var formatter = getCurrencyFormatter(currency)
  var formatted_amount = formatter.format(amount);
  return formatted_amount
}

const convert_to_usd = (number, year) => {
  if (year && year in currency_conversion_factor) {
    var factor_to_use = currency_conversion_factor[year]
  }
  else {
    throw 'Year is not defined in convert_to_usd()! ' + year;
  }
  return number / factor_to_use
}

const convert_all_amounts = (item, year) => {
  if (currency_conversion_factor == 1) {
    return item
  }
  if (year && year in currency_conversion_factor) {
    var factor_to_use = currency_conversion_factor[year]
  }
  else {
    throw 'Year is not defined in convert_all_amounts()! ' + year;
  }
  if (typeof (item) == "number") {
    return item * factor_to_use
  }
  for (var property in item) {
    if (["price", "price_part"].includes(property)) {
      item[property].valeur = item[property].valeur * factor_to_use
      if ("evolution" in item[property]) {
        item[property].evolution = item[property].evolution * factor_to_use
      }
      item[property].currency = currency
      continue
    }
    if (property == "costs") {
      for (var thing of item[property]) {
        thing.valeur = thing.valeur * factor_to_use
        if ("evolution" in thing) {
          thing.evolution = thing.evolution * factor_to_use
        }
        thing.currency = currency
      }
      continue
    }
    if (property == "TotalVentesValeur") {
      item[property] = item[property] * factor_to_use
    }
    var type_property = typeof (item[property])
    if (type_property == "object") {
      convert_all_amounts(item[property], year)
    }
  }
}

export default {
  formatAmount,
  changeCurrency,
  getUserCurrency,
  convert_all_amounts,
  convert_to_usd,
  getCurrencySymbol,
  getValueInCurrency,
  prettyFormatAmount,
  CHANGE_RATES
};
