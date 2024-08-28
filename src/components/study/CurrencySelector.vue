<template>
  <div class="select-wrapper">
    <select
      v-model="selectedCurrency"
      class="selector"
      @change="emits('update:currency', $event.target.value)"
    >
      <template v-if="! isGeneric(localCurrency)">
        <option v-if="isCurrencySupported(localCurrency)" value="LOCAL">
          {{ getCurrencyName(localCurrency) }} ({{ getCurrencySymbol(localCurrency) }})
        </option>
        <option v-else value="LOCAL">
          {{ localCurrency }} ({{ getCurrencySymbol(localCurrency) }})
        </option>
      </template>
      <template v-if="isCurrencySupported(localCurrency)">
        <option value="USD">
          {{ getCurrencyName('USD') }} ({{ getCurrencySymbol('USD') }})
        </option>
        <option value="EUR">
          {{ getCurrencyName('EUR') }} ({{ getCurrencySymbol('EUR') }})
        </option>
      </template>
    </select>
  </div>
</template>

<script setup>
import { getCurrencySymbol, getCurrencyName, isCurrencySupported } from '@utils/currency.js'
import { ref, watch } from 'vue';

const props = defineProps({
  localCurrency: String,
  currency: String,
})

const selectedCurrency = ref(props.currency);
watch(() => props.currency, () => {
  if (isGeneric(props.localCurrency) && props.currency === "LOCAL") {
    selectedCurrency.value = props.localCurrency;
  } else {
    selectedCurrency.value = props.currency;
  }
}, { immediate: true });

const emits = defineEmits(['update:currency'])

function isGeneric(currency) {
  return ["USD", "EUR"].includes(currency);
}
</script>

<style lang="scss" scoped>

.select-wrapper {
    position: relative;
    padding-right: 10px;
}

.select-wrapper::after {
    content: "▼";
    font-size: 0.9rem;
    height: 100%;
    right: 10px;
    position: absolute;
    pointer-events: none;
}

.select-wrapper > *:last-child {
  padding-right: 20px;
}

.selector {
  background-color: transparent;
  padding: 2px 10px;
  margin: -2px -10px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }

  option {
    @apply text-base
  }
}
</style>
