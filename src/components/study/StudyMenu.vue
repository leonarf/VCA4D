<template>
    <nav class="flex flex-col">
        <div class="text-[#868686] mb-2">Contents</div>
        <ol class="text-[#2E6BAD] space-y-2">
            <li v-for="(view, index) in views" :key="index">
                <a 
                    class="hover:underline cursor-pointer"
                    :class="{ disabled: !view.accessible}"
                    @click="emits('select', view.key)"
                >{{ view.label }}</a>
            </li>
            <li>
                <a
                    v-if="fullReportPdfUrl"
                    class="hover:underline cursor-pointer"
                    :href="fullReportPdfUrl"
                >Study full report</a>
            </li>
        </ol>
        <div v-if="localCurrency">
            <div class="text-[#868686] mt-4 mb-2">Select currency</div>
            <div class="max-w-[175px] text-[#868686] select-wrapper">
                <select
                    id="currencies"
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
        localCurrency : String,
        currency: String,
        fullReportPdfUrl: String,
    })
    const emits = defineEmits(["select"])
    const selectedCurrency = ref(props.currency);
</script>

<style scoped lang="scss">
.disabled {
    pointer-events: none;
    color: rgb(85, 85, 85);
    font-style: italic;
}
</style>
