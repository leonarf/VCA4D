// Récupérer les taux de change sur https://lebasic.nohost.me/api/taux_de_change/
const CHANGE_RATES = {
  "BIF": {
    2018: 1782.876875,
    2019: 1845.62289069697,
    2020: 1915.04617583333,
    2021: 1975.95088138768
  },
  "XOF": {
    2014: 493.757329875312,
    2015: 591.21169798261,
    2016: 592.605615063022,
    2017: 580.656749587858,
    2018: 555.446458398226,
    2019: 585.911013180369,
    2020: 575.586004510945,
    2021: 554.530675033104,
    2022: 623.759700911182
  },
  "EUR": {
    2014: 0.7541,
    2015: 0.9011,
    2016: 0.9039,
    2017: 0.8867,
    2018: 0.846772667108096,
    2019: 0.893276257067393,
    2020: 0.875506396987983,
    2021: 0.845494138890436,
    2022: 0.9523809523809523
  },
  "SLL": {
    2014: 4524.15916666667,
    2015: 5080.7475,
    2016: 6290.29741495228,
    2017: 7384.43222248692,
    2018: 7931.63174973728,
    2019: 9010.22114400915,
    2020: 9829.92676332375,
    2021: 10439.4253304236,
    2022: 14.0476497942157,
  },
  "DOP": {
    2014: 43.5496726190476,
    2015: 45.0454990740741,
    2016: 46.0644439393939,
    2017: 47.5343581962482,
    2018: 49.5099928571429,
    2019: 51.2948583333333,
    2020: 56.5245333333333,
    2021: 57.2211166666667,
    2022: 55.1409916666667,
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
    return 0
  }
  const usdRateYear = usdRate[year]
  if (!usdRateYear) {
    console.warn(`${currency}/USD rate missing year ${year}`)
    return 0
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

export const isValidCurrency = (ccy) => {
  try {
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: ccy
    })
  } catch (err) {
    console.log(`Given currency is not standard: ${ccy}`)
    return false
  }
  return true
}

export const isCurrencySupported = (ccy, year = null) => {
  if (!KNOWN_CURRENCIES.includes(ccy)) {
    return false
  }
  if(year == null) {
    return true
  } 
  if (CHANGE_RATES[ccy][year] != undefined){
    return true
  }
  return false
}
