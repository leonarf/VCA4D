import { CHANGE_RATES } from '@utils/rateChanges.js'

const getUserLocale = () => {
  // We need to not evaluate navigator at all (Reference error) when launching vite-node scripts from the terminal.
  if (typeof navigator === "undefined") { return "en"; }

  if (navigator.languages && navigator.languages.length) {
    console.warn("UserLocale is", navigator.languages[0])
    return navigator.languages[0]
  }
  else {
    console.error("UserLocale non défini parce que 'navigator.languages'=", navigator.languages)
    return 'en'
  }
}
export const USER_LOCALE = getUserLocale()

export const KNOWN_CURRENCIES = ["USD", ...Object.keys(CHANGE_RATES)]

let CurrencyFormatters = {}
const getCurrencyFormatter = (currency) => {
  if (!(currency in CurrencyFormatters)) {
    CurrencyFormatters[currency] = new Intl.NumberFormat(USER_LOCALE, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    });
  }
  return CurrencyFormatters[currency]
}

const currencyNames = new Intl.DisplayNames(['en'], { type: "currency" });
export const getCurrencyName = (currencyISOCode) => {
  return currencyNames.of(currencyISOCode)
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
  } catch {
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
