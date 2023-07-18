import basicApi from '@/repositories/basicApi.js'

let CurrencyFormatters = {}

const getCurrencyFormatter = (currency_requested) => {
  if (!(currency_requested in CurrencyFormatters)) {
    CurrencyFormatters[currency_requested] = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency_requested,
      minimumFractionDigits: 0,
    });
  }
  return CurrencyFormatters[currency_requested]
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
  return formatted_amount//.replace(',', '.')
}

const formatPercent = (amount) => {
  return amount.toFixed(2) + '%'
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
  formatPercent,
  changeCurrency,
  getUserCurrency,
  convert_all_amounts,
  convert_to_usd
};
