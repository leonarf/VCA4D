<template>
    <div class="text-xl rounded bg-[#dcefbb] flex flex-row flex-wrap gap-y-4 py-3 pl-8 rounded-none md:rounded-full justify-center md:justify-start">
        <div class="bloc">
            <div class="title">{{ commodityName }}</div>
            <div class="subtitle">Commodity</div>
        </div>
        <div class="bloc">
            <div class="title">{{ dataToDisplay.country }}</div>
            <div class="subtitle">Country</div>
        </div>
        <div class="bloc">
            <div class="title">{{ studyData.targetCurrency ? getCurrencySymbol(studyData.targetCurrency) : '-'}}</div>
            <div class="subtitle">Local currency</div>
        </div>
        <div class="bloc">
            <div class="title">{{ studyData.year }}</div>
            <div class="subtitle">Reference year</div>
        </div>
        <div v-if="false">
            <RouterLink :to="`/comparison/${commodityId}`">
                Compare all {{ commodityName }} studies
            </RouterLink>
        </div>
        <div v-if="false">
            <RouterLink :to="`/comparison/${studyData.country}`">
                Compare all {{ dataToDisplay.country }} studies
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCurrencySymbol } from '@utils/currency.js'
import { getCountry, getProduct, getStudy } from '@utils/data'

const props = defineProps({
    studyData: {
      type: Object,
      required: true,
    }
})

const commodityId = computed(() => {
    return getStudy(props.studyData.id).product;
});

const countryId = computed(() => {
    return getStudy(props.studyData.id).product;
});

const commodityName = computed(() => {
    return getProduct(getStudy(props.studyData.id).product).prettyName;
});

let dataToDisplay = computed(() => {
    let result = {}
    let country = getCountry(props.studyData.country)
    if (country) {
        result.country = country.prettyName
    }
    else {
        result.country = props.studyData.country
    }
    return result
})
</script>

<style scoped lang="scss">
    .subtitle {
        @apply text-[#656565] text-xs;
    }
    .title {
        @apply text-[#303030] text-3xl font-thin;
        text-transform: capitalize;
    }
    .bloc {
        @apply mr-20
    }
</style>
