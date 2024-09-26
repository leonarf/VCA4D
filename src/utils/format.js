import { computed } from 'vue';
import { getCurrencySymbol, getValueInCurrency, USER_LOCALE } from '@utils/currency.js'

export const formatNumber = (value) => {
  if (typeof value !== "number" || isNaN(value)) {
    return '-'
  }
  let numberDigits = 0
  let divisor = 1
  let textUnit = ''
  const absoluteValue = Math.abs(value)
  if (absoluteValue > 1e9) {
    numberDigits = 1
    divisor = 1e9
    textUnit = 'billion'
  } else if (absoluteValue > 100e6) {
    numberDigits = 0
    divisor = 1e6
    textUnit = 'million'
  } else if (absoluteValue > 1e6) {
    numberDigits = 1
    divisor = 1e6
    textUnit = 'million'
  } else if (absoluteValue > 1e3) {
    numberDigits = 0
    divisor = 1
    textUnit = ''
  } else if (absoluteValue > 100) {
    numberDigits = 0
    divisor = 1
    textUnit = ''
  } else if (absoluteValue > 10) {
    numberDigits = 1
    divisor = 1
    textUnit = ''
  } else if (absoluteValue > 1) {
    numberDigits = 2
    divisor = 1
    textUnit = ''
  } else if (absoluteValue < 1) {
    return `${(value).toLocaleString(USER_LOCALE, { maximumSignificantDigits: 2 })}`
  }
  return `${(value / divisor).toLocaleString(USER_LOCALE, { maximumFractionDigits: numberDigits })} ${textUnit}`
}

export const formatPercent = (amount) => {
  return `${formatNumber(100 * amount).trim()}%`
}

export function useCurrencyUtils(props) {
  const prettyAmount = computed(() => (amount) =>
    `${formatNumber(amount)} ${getCurrencySymbol(props.currency)}`
  );

  const convertAmount = computed(() => (amount) =>
    getValueInCurrency(
      amount * props.studyData.currencyRatio,
      props.studyData.targetCurrency,
      props.currency,
      props.studyData.year,
    )
  );

  return {
    prettyAmount,
    convertAmount,
  };
}
export const slugify = (str) => str?.toLowerCase()
  .trim()
  .replace(/[^\w|\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');


