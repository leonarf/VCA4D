<template>
    <nav class="flex flex-col">
        <div class="text-[#868686] mb-2">Contents</div>
        <ol class="text-[#2E6BAD] space-y-2">
            <li v-for="(route, indexRoute) in routes" :key="indexRoute">
                <RouterLink 
                    :to="`/study?id=${isLocalStudy ? 'localStorage' : studyId}${route.view ? `&view=${route.view}` : ''}&currency=${currency}`"
                    :class="{ disabled: !route.accessible}"
                >{{ route.label }}</RouterLink>
            </li>
            <li>
                <a class="TODO">Study brief and full report</a>
            </li>
        </ol>
        <div class="text-[#868686] mt-4 mb-2">Select currency</div>
        <div v-if="localCurrency" class="max-w-[175px] text-[#868686] select-wrapper">
            <select 
                id="currencies" 
                class="border border-[#656565] text-[#868686] rounded-lg focus:ring-[#868686] focus:border-[#868686] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="selectedCurrency"
                @change="$emit('update:currency', $event.target.value)"
            >
                <option value="LOCAL">{{ localCurrency }} ({{  getCurrencySymbol(localCurrency) }})</option>
                <option value="USD">Us Dollar (&dollar;)</option>
                <option value="EUR">Euro (&euro;)</option>
            </select>
        </div>
    </nav>
</template>

<script setup>
    import { ref} from 'vue'
    import { getCurrencySymbol } from '@/utils/currency.js'
    const props = defineProps({
        studyId: String,
        localCurrency : String,
        currency: String,
        isLocalStudy: Boolean,
        hasEco: Boolean,
        hasSocial: Boolean
    })
    const selectedCurrency = ref(props.currency);
    const routes = [
        {
            view: undefined,
            label: 'Overview',
            accessible: props.hasEco
        },
        {
            view: 'economic-growth',
            label: 'Contribution to economic growth',
            accessible: props.hasEco
        },
        {
            view: 'inclusiveness',
            label: 'Inclusiveness',
            accessible: props.hasEco
        },
        {
            view: 'social-sustainability',
            label: 'Social sustainability',
            accessible: props.hasSocial
        },
        {
            view: 'environment',
            label: 'Environmental sustainability',
            accessible: false
        }
    ]
</script>

<style scoped lang="scss">
.disabled {
    pointer-events: none;
    color: rgb(85, 85, 85);
    font-style: italic;
}
</style>