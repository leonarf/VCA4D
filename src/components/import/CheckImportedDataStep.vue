<style scoped lang="scss">
</style>

<template>
  <div>
    <h2>Step 2 : Check that all data is there.</h2>
    <p>Complete the file for missing data, then re-upload the file (back to step 1).</p>
    <a href="https://github.com/leonarf/VCA4D/tree/main/data/xls" target="_blank"
      >Here you can find example blank file to help you upload your study</a
    >

    <h4>Contents of the file</h4>
    <div v-for="(errors, spreadsheet, index) in errorsBySpreadsheet" :key="index">
      <ImportWarning :spreadsheetName="spreadsheet" :errors="errors" />
    </div>

    <div class="flex flex-col items-center">
      <div class="mt-4 flex flex-row gap-x-4">
        Check the study appears on the front page, and at the right place
        <RouterLink to="/">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Find your study on the home page</button>
        </RouterLink>
        Check the study's data are well transformed into graphic on dedicated page(s)
        <RouterLink :to="'/study?id=localStorage'">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Browse this study</button>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col gap-y-4 text-left mt-2 text-lg mx-auto max-w-5xl">
      <h2>Summary</h2>
      <div class="flex flex-row">
        <div class="w-1/4">
          <h3 class="table-cell">Type of file</h3>
        </div>
        <div class="flex flex-row w-3/4">
          <div
            v-for="t in TypesOfFile"
            :key="t"
            class="bg-gray-200 rounded mr-8 px-4 py-2 border border-gray-400"
            :class="{ 'bg-green-300 font-semibold border-2': studyData.type === t }"
          >
            {{ t }}
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="w-1/4">
          <h3 class="table-cell">Country</h3>
        </div>
        <div class="w-3/4">
          <div class="text-2xl" v-if="knownCountry">
            {{ knownCountry.prettyName }}
          </div>
          <div v-else class="text-red-600">
            Unknown country: <b>{{ studyData['country'] }}</b>
            <br />
            Known countries are:
            <b>{{
              knownCountries
                .sort((c1, c2) => c1.id.localeCompare(c2.id))
                .map((c) => c.prettyName)
                .join(', ')
            }}</b>
            Please respect name and isocode from https://en.wikipedia.org/wiki/ISO_3166-1 to add new
            countries
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center">
        <div class="w-1/4">
          <h3 class="table-cell">Product</h3>
        </div>
        <div class="w-3/4">
          <div class="text-2xl" v-if="isKnownProduct">
            {{ studyData['commodity'] }}
          </div>
          <div v-else class="text-red-600">
            Unknown commodity: <b>{{ slugify(studyData['commodity']) }}</b>
            <br />
            Known commodities are:
            <b>{{ knownProducts.sort((a, b) => a.localeCompare(b)).join(', ') }}</b>
          </div>
        </div>
      </div>
      <div v-if="studyData.type === TypesOfFile.Economics" class="flex flex-row items-center">
        <div class="w-1/4">
          <h3 class="table-cell">Currency</h3>
        </div>
        <div class="w-3/4 text-xl">
          <div v-if="!isValidCurrency(studyData.targetCurrency)">
            <span v-if="studyData.localCurrency != null" class="text-red-600">
              Currency <b>{{ studyData.localCurrency }}</b> defined in cell
              <b>{{ HOME_LABELS.LocalCcy }}</b> or <b>{{ HOME_LABELS.TargetCcy }}</b> is not valid.
            </span>
            <span v-else class="text-red-600">
              <b>{{ HOME_LABELS.LocalCcy }}</b> not found in uploaded file.
            </span>
            <br />
            Find all valid currencies code by visiting
            <a
              class="font-semibold underline"
              href="https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes"
              target="_blank"
              >this wiki page.</a
            >
          </div>
          <div v-else>
            <div v-if="!isCurrencySupported(studyData.targetCurrency, studyData.year)">
              Currency <b>{{ studyData.targetCurrency }}</b> is valid but we do not have it's
              rate change to USD for the year's study ({{ studyData.year }}).
            </div>
            <div v-else>
              This study is in {{ studyData.localCurrency }} and will be converted to
              {{ studyData.targetCurrency }} with a rate of
              {{ studyData.currencyRatio }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import ImportWarning from '@components/import/ImportWarning.vue'

import { isCurrencySupported, isValidCurrency } from '@utils/currency.js'
import { getCountries, getAllKnownProducts } from '@utils/data.js'
import { slugify } from '@utils/format.js'

import { ACV_SHEET_NAMES } from '@utils/import/environment.js'
import { getImportErrors } from '@utils/import/generic.js'
import { ECO_SHEET_NAMES, HOME_LABELS, getErrors } from '@utils/import/eco.js'

const props = defineProps({
  studyData: Object
})

const TypesOfFile = {
  Sustainability: 'social',
  Environment: 'ACV',
  Economics: 'eco'
}

const knownCountries = ref([])
const knownProducts = ref([])

onMounted(async () => {
  knownCountries.value = getCountries()
  knownProducts.value = getAllKnownProducts()
})

const knownCountry = computed(() =>
  knownCountries.value.find((c) => c.id === props.studyData['country'])
)
const isKnownProduct = computed(() =>
  knownProducts.value.includes(props.studyData['commodity']?.toLowerCase())
)

const errorsBySpreadsheet = computed(() => {
  console.log('errorsBySpreadsheet computation trigger')
  let result = {}
  let rawErrors = null
  if (props.studyData.type === 'eco') {
    rawErrors = getErrors(props.studyData)
    Object.keys(ECO_SHEET_NAMES).forEach((spreadsheetName) => {
      result[ECO_SHEET_NAMES[spreadsheetName]] = []
    })
  } else {
    if (props.studyData.type === 'ACV') {
      Object.keys(ACV_SHEET_NAMES).forEach((spreadsheetName) => {
        result[ACV_SHEET_NAMES[spreadsheetName]] = []
      })
    }
    rawErrors = getImportErrors()
  }
  rawErrors.forEach((error) => {
    if (!result[error.spreadsheet]) {
      result[error.spreadsheet] = []
    }
    result[error.spreadsheet].push(error)
  })
  console.log('error to display', result)
  return result
})
</script>
