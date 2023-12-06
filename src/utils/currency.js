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

export const KNOWN_CURRENCIES = ["USD", ...Object.keys(CHANGE_RATES)]

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

export const getCurrencySymbol = (currency) => getCurrencyFormatter(currency).format(0).replace(/\d/g, '')

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

export const getValueInCurrency = (amount, fromCurrency, toCurrency, year) => {
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

export const prettyFormatAmount = (amount, currency) => {
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

export const isValidCurrency = (ccy) => {
  try {
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: ccy
    })
  } catch (err) {
    console.error(`Invalid Currency error: ${ccy}`)
    return false
  } 
  return true
}

export const isCurrencySupported = (ccy) => {
  return KNOWN_CURRENCIES.includes(ccy)
}