import { computed } from 'vue';
import { prettyFormatAmount, getValueInCurrency } from '@utils/currency.js'

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
  }
  else if (Math.abs(value) < 100) {
    return `${(value / divisor).toLocaleString(undefined, { maximumSignificantDigits: 2 })} ${textUnit}`
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

export function useCurrencyUtils(props) {
  const prettyAmount = computed(() => (amount) =>
    prettyFormatAmount(amount, props.currency)
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
export const slugify = (str) => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');


