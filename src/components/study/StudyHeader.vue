<template>
  <div class="header">
    <div>
      <div class="header-title">
        {{ commodityName }}
        <ComparisonLink class="link" type="product" :studyId="studyData.id" />
      </div>
      <div class="header-subtitle">Commodity</div>
    </div>
    <div>
      <div class="header-title">
        {{ dataToDisplay.country }}
        <ComparisonLink class="link" type="country" :studyId="studyData.id" />
      </div>
      <div class="header-subtitle">Country</div>
    </div>
    <div v-if="localCurrency">
      <CurrencySelector
        class="header-title"
        :currency="currency"
        :localCurrency="localCurrency"
        @update:currency="emits('update:currency', $event)"
      />
      <div class="header-subtitle">
        {{ currencySubtitle }}
        <InfoTooltip
          v-if="!isLocalCurrencyDisplayed"
          text="Using the World Bank's currency rates for the reference year"
        />
      </div>
    </div>
    <div>
      <div class="header-title">{{ studyData.year || '-' }}</div>
      <div class="header-subtitle">Reference year</div>
    </div>
    <div class="download-title">
      <Dropdown :distance="45" :overflowPadding="120" placement="bottom">
        <div class="download-button">
          <Svg :svg="DowloadLogo" />
        </div>
        <template #popper>
          <DownloadSection :studyUrls="studyUrls" />
        </template>
      </Dropdown>
      <div class="header-subtitle">Downloads</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCountry, getProduct, getStudy } from '@utils/data'
import ComparisonLink from '@components/study/ComparisonLink.vue'
import InfoTooltip from '@components/typography/InfoTooltip.vue'
import CurrencySelector from './CurrencySelector.vue'
import { getCurrencyName } from '@utils/currency.js'
import DowloadLogo from '@images/icons/download.svg'
import Svg from '@components/Svg.vue'
import { Dropdown } from 'floating-vue'
import DownloadSection from '@components/study/DownloadSection.vue'

const props = defineProps({
  studyData: {
    type: Object,
    required: true
  },
  studyUrls: Object,
  currency: String,
  localCurrency: String
})

const emits = defineEmits(['update:currency'])

const commodityName = computed(() => {
  return getProduct(getStudy(props.studyData.id).product).prettyName
})

let dataToDisplay = computed(() => {
  let result = {}
  let country = getCountry(props.studyData.country)
  if (country) {
    result.country = country.prettyName
  } else {
    result.country = props.studyData.country
  }
  return result
})

const currencySubtitle = computed(() => {
  if (isLocalCurrencyDisplayed.value) {
    return 'Local currency'
  } else {
    return `Converted from ${getCurrencyName(props.localCurrency)}`
  }
})
const isLocalCurrencyDisplayed = computed(() => {
  return props.currency === 'LOCAL' || props.currency === props.localCurrency
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  column-gap: 5rem;
  row-gap: 1rem;
  border-radius: 38px;
  justify-content: flex-start;
  align-items: end;
  padding: 0.75rem 2rem;
  background-color: #dcefbb;
  flex-wrap: wrap;

  .header-subtitle {
    @apply text-[#656565] text-sm;

    display: flex;
    gap: 5px;
    align-items: center;
  }
  .header-title {
    @apply text-[#303030] text-3xl font-thin;
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;

    .link {
      margin-bottom: 5px;
    }
  }
}
.download-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .download-button {
    margin: -8px -8px -4px;
    padding: 8px;
    color: #656565;
    cursor: pointer;
    border-radius: 1000px;
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    > svg {
      height: 28px;
      width: 28px;
    }
  }
  > svg {
    height: 30px;
    width: 30px;
    color: gray;
    cursor: pointer;
  }
}
</style>
