<template>
    <nav class="flex flex-col">
        <div class="text-[#8A8A8A] text-lg font-bold uppercase mb-4">Table of contents</div>
        <ol class="text-[#2E6BAD] space-y-4">
            <li v-for="(view, index) in views" :key="index">
                <a 
                  v-if="view.accessible"
                  class="hover:underline cursor-pointer"
                  :class="{ 'selected-view-link': view.key === selectedViewKey }"
                  @click="emits('select', view.key)"
                >{{ view.label }}</a>
                <span 
                  v-else
                  class="disabled-view-link"
                  title="Unavailable for this study"
                >{{ view.label }}</span>
            </li>
            <li>
                <a
                    v-if="fullReportPdfUrl"
                    class="hover:underline cursor-pointer"
                    :href="fullReportPdfUrl"
                    target="_blank"
                >Study full report</a>
            </li>
        </ol>
        <div v-if="localCurrency" class="mt-4 flex flex-col gap-1">
            <label for="select-currency" class="text-[#868686]">Select currency</label>
            <div class="max-w-[175px] text-[#868686] select-wrapper">
                <select
                    id="select-currency"
                    class="border border-[#656565] text-[#868686] rounded-lg focus:ring-[#868686] focus:border-[#868686] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="selectedCurrency"
                    @change="emits('update:currency', $event.target.value)"
                >
                    <option v-if="isCurrencySupported(localCurrency)" value="LOCAL">{{ getCurrencyName(localCurrency) }} ({{ getCurrencySymbol(localCurrency) }})</option>
                    <option v-else value="LOCAL">{{ localCurrency }} ({{  getCurrencySymbol(localCurrency) }})</option>
                    <option v-if="localCurrency !== 'USD' && isCurrencySupported(localCurrency)" value="USD">{{ getCurrencyName("USD") }} ({{ getCurrencySymbol("USD") }})</option>
                    <option v-if="localCurrency !== 'EUR' && isCurrencySupported(localCurrency)" value="EUR">{{ getCurrencyName("EUR") }} ({{ getCurrencySymbol("EUR") }})</option>
                </select>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { ref, defineEmits } from 'vue'

    import { getCurrencySymbol, getCurrencyName, isCurrencySupported } from '@utils/currency.js'
    const props = defineProps({
        views: Array,
        selectedViewKey: String,
        localCurrency : String,
        currency: String,
        fullReportPdfUrl: String,
    })
    const emits = defineEmits(["select"])
    const selectedCurrency = ref(props.currency);
</script>

<style scoped lang="scss">
.disabled-view-link {
  user-select: none;
  color: rgb(85, 85, 85);
  font-style: italic;
}

.selected-view-link {
    font-weight: 700;
  }
</style>
