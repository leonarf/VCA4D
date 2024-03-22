import { computed } from 'vue';
import { getCurrencySymbol, getValueInCurrency } from '@utils/currency.js'

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
    numberDigits = 1
    divisor = 1e3
    textUnit = 'k'
  } else if (Math.abs(value) < 100) {
    numberDigits = 1
    divisor = 1
    textUnit = ''
  } else if (Math.abs(value) < 10) {
    numberDigits = 2
    divisor = 1
    textUnit = ''
  } else if (Math.abs(value) < 1) {
    return `${(value).toLocaleString('en', { maximumSignificantDigits: 2 })}`
  }
  return `${(value / divisor).toLocaleString('en', { maximumFractionDigits: numberDigits })} ${textUnit}`
}

export const formatPercent = (amount) => {
  return `${formatNumber(100 * amount)} %`
}

export function useCurrencyUtils(props) {
  const prettyAmount = computed(() => (amount) =>
    `${formatNumber(amount)}${getCurrencySymbol(props.currency)}`
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
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');


