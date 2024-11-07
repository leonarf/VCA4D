<template>
  <div class="default-comparison-cell" :class="[valueClass, { light: lightVersion }]">
    {{ formatedValue }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatNumber, formatPercent, useCurrencyUtils } from '@utils/format.js'
import { isCurrencySupported } from '@utils/currency'

const props = defineProps({
  value: Number,
  studyData: Object,
  valueType: {
    type: String,
    validator: (valueType) => ['amount', 'percent', 'number'].includes(valueType)
  },
  lightVersion: Boolean
})

const valueClass = computed(() => {
  if (!props.value) {
    return 'gray'
  }
  return 'blue'
})

const displayCurrency = computed(() => {
  if (props.valueType !== 'amount') {
    return null
  }

  return isCurrencySupported(props.studyData.targetCurrency)
    ? 'USD'
    : props.studyData.targetCurrency
})

const { prettyAmount, convertAmount } = useCurrencyUtils({
  studyData: props.studyData,
  currency: displayCurrency.value
})

const formatedValue = computed(() => {
  if (!props.value && typeof props.value !== 'number') {
    return '-'
  }

  switch (props.valueType) {
    case 'percent':
      return formatPercent(props.value)
    case 'number':
      return formatNumber(props.value)
    case 'amount':
      return prettyAmount.value(convertAmount.value(props.value))
    default:
      throw new Error('Unrecognized valueType')
  }
})
</script>

<style scoped lang="scss">
.default-comparison-cell {
  &.gray {
    background-color: #d1d5db;
    color: #6b7280;

    &.light {
      background-color: #d1d5db20;
      border: #d1d5db solid 2px;
    }
  }
  &.blue {
    background-color: #a4cafe;

    &.light {
      border: #a4cafe solid 2px;
      background-color: #a4cafe20;
    }
  }
}
</style>
