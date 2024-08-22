<template>
  <div class="select-wrapper">
    <select
      class="selector"
      v-model="selectedCurrency"
      @change="emits('update:currency', $event.target.value)"
    >
      <option v-if="isCurrencySupported(localCurrency)" value="LOCAL">
        {{ getCurrencyName(localCurrency) }} ({{ getCurrencySymbol(localCurrency) }})
      </option>
      <option v-else value="LOCAL">
        {{ localCurrency }} ({{ getCurrencySymbol(localCurrency) }})
      </option>
      <template v-if="isCurrencySupported(localCurrency)">
        <option v-if="localCurrency !== 'USD'" value="USD">
          {{ getCurrencyName('USD') }} ({{ getCurrencySymbol('USD') }})
        </option>
        <option v-if="localCurrency !== 'EUR'" value="EUR">
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
  selectedCurrency.value = props.currency;
});

const emits = defineEmits(['update:currency'])
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
