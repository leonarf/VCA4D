<template>
    <div class="header">
        <div>
            <div class="title">
              {{ commodityName }}
              <ComparisonLink
                class="link"
                type="product"
                :studyId="studyData.id"
              />
            </div>
            <div class="subtitle">Commodity</div>
        </div>
        <div>
            <div class="title">
              {{ dataToDisplay.country }}
              <ComparisonLink
                class="link"
                type="country"
                :studyId="studyData.id"
              />
            </div>
            <div class="subtitle">Country</div>
        </div>
        <div v-if="localCurrency">
          <CurrencySelector
            class="title"
            :currency="currency"
            :localCurrency="localCurrency"
            @update:currency="emits('update:currency', $event)"
          />
          <div class="subtitle">{{ currencySubtitle }}</div>
        </div>
        <div>
            <div class="title">{{ studyData.year }}</div>
            <div class="subtitle">Reference year</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCountry, getProduct, getStudy } from '@utils/data'
import ComparisonLink from '@components/study/ComparisonLink.vue';
import CurrencySelector from "./CurrencySelector.vue"
import { getCurrencyName } from '@utils/currency.js'

const props = defineProps({
    studyData: {
      type: Object,
      required: true,
    },
    currency: String,
    localCurrency: String
})

const emits = defineEmits(["update:currency"]);

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

const currencySubtitle = computed(() => {
  if (props.currency === "LOCAL") {
     return "Local currency"
  } else {
    return `Converted from ${getCurrencyName(props.localCurrency)}`;
  }
})
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    column-gap: 5rem;
    row-gap: 1rem;
    border-radius: 38px;
    justify-content: flex-start;
    padding: 0.75rem 2rem;
    background-color: #dcefbb;
    flex-wrap: wrap;

    .subtitle {
        @apply text-[#656565] text-xs;
    }
    .title {
        @apply text-[#303030] text-3xl font-thin;
        display: flex;
        align-items: flex-end;
        gap: 0.5rem;

        .link {
          margin-bottom: 5px;
        }
    }
  }
</style>
