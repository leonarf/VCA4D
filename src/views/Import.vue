<template>
    <Skeleton :skipFooter="true">
        <h1 class="mb-4">Import a study file</h1>
        <div v-if="isObjectNotEmpty(studyProperties)" class="flex flex-col items-center">
            <div class="flex flex-col items-center">
                <div>You have imported this study: <b>{{ studyProperties['id'] }}</b></div>
                <div class="ml-4">
                    Press 
                    <button class="delete" @click="clearData"
                        >Remove</button>
                    to import another study
                </div>
            </div>
            <div class="mt-4 flex flex-row gap-x-4">
                <RouterLink to="/">
                    <button
                        class="browse">
                        Find your study on the home page
                    </button>
                </RouterLink>
                <RouterLink :to="'/study?id=localStorage'">
                    <button
                        class="browse">
                        Browse this study
                    </button>
                </RouterLink>

            </div>
        </div>
        <div class="w-full px-8 flex flex-col text-center">
            <div v-if="!isObjectNotEmpty(studyProperties)">
                <input
                    class="relative m-0 inline min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file" @change="handleFileUpload" />
            </div>

            <div v-if="excelData" class="flex flex-col gap-y-4 text-left mt-2 text-lg mx-auto max-w-5xl">
                <h2>Summary</h2>
                <div class="flex flex-row">
                    <div class="w-1/4">
                        <h3 class="table-cell">Type of file</h3>
                    </div>
                    <div class="flex flex-row w-3/4">
                        <div v-for="t in TypesOfFile" :key="t"
                        class="bg-gray-200 rounded mr-8 px-4 py-2 border border-gray-400 "
                        :class="{ 'bg-green-300 font-semibold border-2': typeOfFile === t}">{{ t }}</div>
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
                            Unknown country: <b>{{ studyProperties['country'] }}</b>
                            <br />
                            Known countries are: <b>{{knownCountries.sort((c1, c2) => c1.id.localeCompare(c2.id)).map(c => c.prettyName).join(', ')}}</b>
                            Please respect name and isocode from https://en.wikipedia.org/wiki/ISO_3166-1 to add new countries
                        </div>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <div class="w-1/4">
                        <h3 class="table-cell">Product</h3>
                    </div>
                    <div class="w-3/4">
                        <div class="text-2xl" v-if="isKnownProduct">
                            {{ studyProperties['commodity'] }}
                        </div>
                        <div v-else class="text-red-600">
                            Unknown commodity: <b>{{ slugify(studyProperties['commodity']) }}</b>
                            <br />
                            Known commodities are: <b>{{knownProducts.sort((a, b) => a.localeCompare(b)).join(', ')}}</b>
                        </div>
                    </div>
                </div>
                <div v-if="typeOfFile === TypesOfFile.Economics" class="flex flex-row items-center">
                    <div class="w-1/4">
                        <h3 class="table-cell">Currency</h3>
                    </div>
                    <div class="w-3/4 text-xl">
                        <div v-if="!isValidCurrency(studyProperties.targetCurrency)">
                            <span v-if="studyProperties.localCurrency != null" class="text-red-600">
                                Currency <b>{{ studyProperties.localCurrency }}</b> defined in cell <b>{{ HOME_LABELS.LocalCcy}}</b> or <b>{{ HOME_LABELS.TargetCcy }}</b> is not valid.
                            </span>
                            <span v-else class="text-red-600">
                                <b>{{ HOME_LABELS.LocalCcy}}</b> not found in uploaded file.
                            </span>
                            <br/>
                            Find all valid currencies code by visiting <a class="font-semibold underline" href="https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes" target="_blank">this wiki page.</a>
                        </div>
                        <div v-else>
                            <div v-if="!isCurrencySupported(studyProperties.targetCurrency, studyProperties.year)">
                                Currency <b>{{ studyProperties.targetCurrency}}</b> is valid but we do not have it's rate change to USD for the year's study ({{ studyProperties.year }}).
                            </div>
                            <div v-else>
                                This study is in {{ studyProperties.localCurrency }} and will be converted to {{  studyProperties.targetCurrency }} with a rate of {{ studyProperties.currencyRatio }}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="mt-8">Warnings</h2>
                <div v-if="errors.length === 0">
                    There are no warnings.
                </div>
                <ul v-else>
                    <li v-for="(error, index) in errors" :key="index" class="list-disc">
                        <div :class="`${error.level === 'error' ? 'text-red-500' : ''}`" :innerHTML="error.message"></div>
                    </li>
                </ul>

                <div class="my-4">
                    <h2>Add study to repo</h2>
                    <p>Step 1 : download both following files</p>
                    <h4 class="font-bold">{{ `Replace data file and add study file in /data/ ` }}</h4>
                    <div class="flex flex-row mb-2 gap-x-2">
                        <button class="download"
                            @click="downloadDataJson">Download data file</button>
                        <button class="download"
                            @click="downloadStudy">Download study file</button>
                    </div>
                    <p>Step 2 : Go to https://github.com/leonarf/VCA4D/tree/main/data</p>
                    <p>Step 3 : Login to a VCA4D authorised github account</p>
                    <p>Step 4 : Click on "Add file" and then "Create new file"</p>
                    <img :src="upload_files_screenshot" alt="github screenshot">
                    <p>Step 5 : Upload both previously downloaded files, and click on "Commit changes"</p>
                    <img :src="commit_creation_screenshot" alt="github screenshot">
                    <p>Step optional : rename your Excel file to {{ `${studyFileName}.ods` }} before saving it into github</p>
                </div>
            </div>
        </div>
    </Skeleton>
</template>
  
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import * as XLSX from 'xlsx'
import Skeleton from '@components/Skeleton.vue'
import { slugify } from '@utils/format.js'
import jsonData from '@data/data.json'
import { parseSustainabilityWorksheet } from '@utils/import/social.js'
import { parseEconomicsJson, getErrors, getValueChainProperty } from '@utils/import/eco.js'
import { parseEnvironmentJson } from '@utils/import/environment.js'
import { ErrorLevels, setImportErrors, clearImportErrors, getImportErrors } from '@utils/import/generic.js'
import { HOME_LABELS } from '@utils/import/eco'
import { isValidCurrency, isCurrencySupported } from '@utils/currency'
import upload_files_screenshot from '@images/tuto_upload/upload_files_on_github.png'
import commit_creation_screenshot from '@images/tuto_upload/commit_creation_screenshot.png'



import { RouterLink } from 'vue-router'
import { getAllJsonData } from '@utils/data';

const excelData = ref(undefined);
const workbook = ref(undefined)

const clearData = () => {
    localStorage.removeItem('localStudyProperties')
    localStorage.removeItem('localStudyData')
    localStorage.removeItem('localExcel')
    localStorage.removeItem('localWorkbook')
    clearImportErrors()
    window.location.reload()
}

const knownCountries = ref([])
const knownProducts = ref([])

onMounted(async () => {
    const allJsonData = getAllJsonData()
    knownCountries.value = allJsonData.countries
    knownProducts.value = allJsonData.categories.reduce((arr, item) => arr.concat(item.commodities) , [])
})

const knownCountry = computed(() => knownCountries.value.find(c => c.id === studyProperties.value['country']))
const isKnownProduct = computed(() => knownProducts.value.includes(studyProperties.value['commodity']?.toLowerCase()))

const isObjectNotEmpty = (obj) => {
    if (!obj) {
        return false
    }
    return Object.keys(obj).length > 0;
}

const sheetNameForSustainabilityData = "Questionnaire"
const sheetsNameForEnvironmentalData = ["Value chains description"]
const sheetsNameForEconomicData = ["Stages description"]

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const wb = XLSX.read(data, { type: 'binary' });
            let output = {}
            wb.SheetNames.forEach((workSheet) => {
                console.log("Converting to JSON sheet", workSheet)
                const rowObject = XLSX.utils.sheet_to_json(
                    wb.Sheets[workSheet]
                )
                output[workSheet] = rowObject
            })
            excelData.value = output
            workbook.value = wb
            localStorage.setItem('localExcel', JSON.stringify(output))
            localStorage.setItem('localWorkbook', JSON.stringify(wb))
        };
        reader.readAsArrayBuffer(file);
    }
}

const TypesOfFile = {
    Sustainability: 'Sustainability',
    Environment: 'Environment',
    Economics: 'Economics',
};

const typeOfFile = computed(() => {
    if (!excelData.value) {
        return null
    }
    if (excelData.value[sheetNameForSustainabilityData]) {
        return TypesOfFile.Sustainability
    }
    if (excelData.value[sheetsNameForEnvironmentalData[0]]) {
        return TypesOfFile.Environment
    }
    if (excelData.value[sheetsNameForEconomicData[0]]) {
        return TypesOfFile.Economics
    }
    setImportErrors(
        sheetNameForSustainabilityData,
        ErrorLevels.BreaksALot,
        `Missing sheet. At least one of the following should be in the file: '${sheetNameForSustainabilityData}', '${sheetsNameForEnvironmentalData[0]}' or '${sheetsNameForEconomicData[0]}' depending of the excel type, ${Object.keys(TypesOfFile)}`)
    return null
})

const studyProperties = computed(() => {
    if (typeOfFile.value == null) {
        return null
    }
    const localStorageValue = localStorage.getItem('localStudyProperties')
    if (localStorageValue) {
        try {
            return JSON.parse(localStorageValue);
        } catch (e) {
            console.log("value of 'studyProperties' saved in the local storage in invalid", localStorageValue, typeof(localStorageValue))
        }
    }

    if (typeOfFile.value === TypesOfFile.Sustainability) {
        if (!workbook.value) {
            return {}
        }
        const questionnaireSheet = workbook.value.Sheets[sheetNameForSustainabilityData]
        const country = slugify(questionnaireSheet['D1']?.v)
        const commodity = questionnaireSheet['B1']?.v.trim()
        const year = null
        return {
            id: slugify(commodity + "-" + country),
            country,
            commodity,
            year,
            type: 'social'
        }

    }
    if (!excelData.value) {
        return {}
    }

    const country = slugify(getValueChainProperty(excelData.value, HOME_LABELS.Country))
    const commodity = getValueChainProperty(excelData.value, HOME_LABELS.Commodity)

    if (!knownProducts.value.includes(slugify(commodity))) {
        setImportErrors(
            sheetNameForSustainabilityData,
            ErrorLevels.BreaksALot,
            `Commodity <b>${slugify(commodity)}</b> is not recognized.`)
    }

    var result = {
        id: slugify(commodity + "-" + country),
        country,
        commodity
    }

    if (typeOfFile.value === TypesOfFile.Economics) {
        const year = getValueChainProperty(excelData.value, "Reference Year");
        const localCurrency = getValueChainProperty(excelData.value, HOME_LABELS.LocalCcy)
        var targetCurrency = null
        var currencyRatio = null
        // Si localCurrency est standard, pas besoin de targetCurrency ou currencyRatio
        if (isValidCurrency(localCurrency))
        {
            targetCurrency = localCurrency
            currencyRatio = 1.0
        }
        else {
            targetCurrency = getValueChainProperty(excelData.value, HOME_LABELS.TargetCcy)
            if (isValidCurrency(targetCurrency))
            {
                currencyRatio = getValueChainProperty(excelData.value, HOME_LABELS.RatioCcy)
            }
            else {
                setImportErrors(
                    sheetNameForSustainabilityData,
                    ErrorLevels.BreaksFunctionalities,
                    `Either currencies defined by '${HOME_LABELS.LocalCcy}' or '${HOME_LABELS.TargetCcy}' should be an ISO currency code. Find all valid currency code by visiting https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes`)
            }
        }

        result = {...result,
            year,
            localCurrency,
            targetCurrency,
            currencyRatio,
            type: 'eco'
        }
    }
    else if (typeOfFile.value === TypesOfFile.Environment) {
        result.type = "ACV"
    }
    console.log("studyProperties will be", result)
    return result
})

watch(studyProperties, (newValue) => {
    localStorage.setItem('localStudyProperties', JSON.stringify(newValue))
})

const studyData = computed(() => {
    if (typeOfFile.value == null) {
        return null
    }
    const localStorageValue = localStorage.getItem('localStudyData')
    if (localStorageValue) {
        return JSON.parse(localStorageValue)
    }

    if (typeOfFile.value === TypesOfFile.Sustainability) {
        if (!workbook.value) {
            return {}
        }
        const questionnaireSheet = workbook.value.Sheets[sheetNameForSustainabilityData]
        return {
            ...studyProperties.value,
            socialData: parseSustainabilityWorksheet(questionnaireSheet)
        }
    }
    if (!excelData.value) {
        return {}
    }
    if (typeOfFile.value === TypesOfFile.Economics) {
        return {
            ...studyProperties.value,
            ecoData: parseEconomicsJson(excelData.value)
        }
    }
    if (typeOfFile.value === TypesOfFile.Environment) {
        return {
            ...studyProperties.value,
            acvData: parseEnvironmentJson(excelData.value)
        }
    }
    return null
})

watch(studyData, (newValue) => {
    localStorage.setItem('localStudyData', JSON.stringify(newValue))
})

const errors = computed(() => typeOfFile.value === TypesOfFile.Economics ? getErrors(studyData.value) : getImportErrors())

const jsonFile = computed(() => {
    return JSON.stringify(
        studyData.value
        , null, 2)
})

const dataFile = computed(() => {
    if (!jsonData.studies.find(study => study.id === studyData.value.id)) {
        jsonData.studies.push({
            id: `${studyData.value.id}`,
            title: `${studyData.value.country} ${studyData.value.commodity}`,
            year: studyData.value.year,
            country: studyData.value.country.toLowerCase(),
            product: studyData.value.commodity.toLowerCase()
        })
    }
    jsonData.studies.sort(function (itemA, itemB) {
        if (itemA.country < itemB.country) {
            return -1
        }
        else if (itemA.country > itemB.country) {
            return 1
        }
        if (itemA.product < itemB.product) {
            return -1
        }
        else if (itemA.product > itemB.product) {
            return 1
        }
    });
    const slugifiedCountry = slugify(studyData.value.country)
    if (!jsonData.countries.find(country => country.id === slugifiedCountry)) {
        jsonData.countries.push({
            id: slugifiedCountry,
            prettyName: studyData.value.country
        })
    }
    jsonData.countries.sort(function (itemA, itemB) {
        if (itemA.id < itemB.id) {
            return -1
        }
        else if (itemA.id > itemB.id) {
            return 1
        }
    });
    const existingCommodities = jsonData.categories.reduce((arr, current) => arr.concat(current.commodities), [])
    const slugifiedCommodity = slugify(studyData.value.commodity)
    if (!existingCommodities.includes(slugifiedCommodity)) {
        jsonData.categories.find(category => category.id === 'unknown').commodities.push(slugifiedCommodity)
    }

    return JSON.stringify(
        jsonData
        , null, 2)
})

const studyFileName = computed(() => {
    var suffix = ""
    if (typeOfFile.value == TypesOfFile.Economics) {
        suffix = "eco"
    }
    else if (typeOfFile.value == TypesOfFile.Environment) {
        suffix = "acv"
    }
    else if (typeOfFile.value == TypesOfFile.Sustainability) {
        suffix = "social"
    }
    return `${studyProperties.value.id}-${suffix}`
})

const downloadFile = (data, fileName) => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);

}
const downloadStudy = () => {
    downloadFile(jsonFile.value, `${studyFileName.value}.json`)
}

const downloadDataJson = () => {
    downloadFile(dataFile.value, 'data.json')
}

onMounted(() => {
    clearImportErrors()
    const localStorageExcel = localStorage.getItem('localExcel')
    if (localStorageExcel) {
        excelData.value = JSON.parse(localStorageExcel)
    }

    const localStorageWorkbook = localStorage.getItem('localWorkbook')
    if (localStorageWorkbook) {
        workbook.value = JSON.parse(localStorageWorkbook)
    }
})
</script>
  

<style scoped lang="scss">
button {
    @apply rounded py-2 px-4 border hover:border-transparent font-semibold
}
button.delete {
    @apply bg-transparent hover:bg-red-500 text-red-700  hover:text-white py-1 px-1.5 border-red-500 
}

button.browse {
    @apply bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white  border-blue-500
}

button.download {
    @apply bg-blue-500 hover:bg-blue-700 text-white
}
</style>
