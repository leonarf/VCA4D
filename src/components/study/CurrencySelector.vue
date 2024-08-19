<template>
  <div class="select-wrapper">
    <select
      class="border border-[#656565] text-[#868686] rounded-lg focus:ring-[#868686] focus:border-[#868686] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-model="selectedCurrency"
      @change="emits('update:currency', $event.target.value)"
    >
      <option v-if="isCurrencySupported(localCurrency)" value="LOCAL">
        {{ getCurrencyName(localCurrency) }} ({{ getCurrencySymbol(localCurrency) }})
      </option>
      <option v-else value="LOCAL">
        {{ localCurrency }} ({{ getCurrencySymbol(localCurrency) }})
      </option>
      <option v-if="localCurrency !== 'USD' && isCurrencySupported(localCurrency)" value="USD">
        {{ getCurrencyName('USD') }} ({{ getCurrencySymbol('USD') }})
      </option>
      <option v-if="localCurrency !== 'EUR' && isCurrencySupported(localCurrency)" value="EUR">
        {{ getCurrencyName('EUR') }} ({{ getCurrencySymbol('EUR') }})
      </option>
    </select>
  </div>
</template>

<script setup>
import { getCurrencySymbol, getCurrencyName, isCurrencySupported } from '@utils/currency.js'
import { ref } from 'vue';

const props = defineProps({
  localCurrency: String,
  currency: String,
})
const selectedCurrency = ref(props.currency);
const emits = defineEmits(['update:currency'])
</script>

<style lang="scss" scoped>

.select-wrapper {
    position: relative;
}

.select-wrapper::after {
    content: "▼";
    font-size: 0.9rem;
    top: 9px;
    right: 10px;
    position: absolute;
    pointer-events: none;
}
</style>
