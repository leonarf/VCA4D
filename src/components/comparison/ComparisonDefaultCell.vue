<template>
  <div class="default-comparison-cell" :class="[valueClass, { 'light': lightVersion }]">
    {{ formatedValue }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatNumber, formatPercent, useCurrencyUtils } from '@utils/format.js'
import { isCurrencySupported } from "@utils/currency";

const props = defineProps({
    value: Number,
    studyData: Object,
    preferredCurrency: String,
    valueType: {
      type: String,
      validator: (valueType) => ["amount", "percent", "number"].includes(valueType)
    },
    lightVersion: Boolean
})

const valueClass = computed(() => {
  if (! props.value) { return "gray" }
  return "blue";
});

const displayCurrency = computed(() => {
  if(props.valueType !== "amount") { return null; }
  
  return isCurrencySupported(props.studyData.targetCurrency) ? props.preferredCurrency : props.studyData.targetCurrency;
});

const { prettyAmount, convertAmount } = useCurrencyUtils({
  studyData: props.studyData,
  currency: displayCurrency.value
});

const formatedValue = computed(() => {
  if (! props.value && typeof props.value !== "number") {
    return "-";
  }

  switch (props.valueType) {
    case "percent":
      return formatPercent(props.value);
    case "number":
      return formatNumber(props.value);
    case "amount":
      return prettyAmount.value(convertAmount.value(props.value));
    default:
      throw new Error("Unrecognized valueType");
  }
});


</script>

<style scoped lang="scss">
.default-comparison-cell {
  &.gray {
    background-color: #D1D5DB;
    color: #6B7280;
    
    &.light {
      background-color: #D1D5DB20;
      border: #D1D5DB solid 2px;
    }
  }
  &.blue {
    background-color: #A4CAFE;

    &.light {
      border: #A4CAFE solid 2px;
      background-color: #A4CAFE20;
    }
  }
}
</style>
