<template>
    <Skeleton :skipFooter="true">
        <h1 class="mb-4">Import a study file</h1>
        <div v-if="isObjectNotEmpty(studyProperties)" class="flex flex-col items-center">
            <div class="flex flex-row items-center">
                <div>Imported study: <b>{{ studyProperties['id'] }}</b></div>
                <div class="ml-4">
                    <button @click="clearData"
                        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-1.5 border border-red-500 hover:border-transparent rounded">Remove</button>
                </div>
            </div>
            <div class="mt-4 flex flex-row gap-x-4">
                <RouterLink to="/">
                    <button
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Find your new study on the home page
                    </button>
                </RouterLink>
                <RouterLink :to="'/study?id=localStorage'">
                    <button
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Browse your new study's pages
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

            <div v-if="excelData" class="flex flex-col text-left mt-2 text-lg">
                <div class="flex flex-row">
                    <div class="w-1/2">

                        <div class="flex flex-row">
                            <div class="w-[350px]">Type of file: </div>
                            <div class="font-semibold">{{ typeOfFile }}</div>
                        </div>
                        <div class="flex flex-row" v-for="[property, value] in Object.entries(studyProperties)"
                            :key="property">
                            <div class="w-[350px]">{{ property }}: </div>
                            <div class="font-semibold">{{ value }}</div>
                        </div>
                    </div>
                    <div class="w-1/2" v-if="errors.length > 0">
                        <div v-for="(error, index) in errors" :key="index">
                            <div :class="`${error.level === 'error' ? 'bg-red-500' : ''}`">{{ error.message }}</div>
                        </div>
                    </div>
                </div>
                <div class="my-4">
                    <h4 class="font-bold">{{ `Replace data file and add study file in /data/ ` }}</h4>
                    <div class="flex flex-row mb-2 gap-x-2">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click="downloadDataJson">Download data file</button>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            @click="downloadStudy">Download study file</button>
                    </div>
                </div>
                <div class="mt-4">
                    <h4 class="font-bold">Preview data</h4>
                    <pre class="bg-slate-600 text-white overflow-x-auto rounded ">{{ jsonFile }}</pre>
                </div>
            </div>
        </div>
    </Skeleton>
</template>
  
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import * as XLSX from 'xlsx'
import Skeleton from '../components/Skeleton.vue'
import { slugify } from '@/utils/format.js'
import jsonData from '../../data/data.json'
import { parseSustainabilityWorksheet } from '@/utils/import/social.js'
import { parseEconomicsJson, getErrors, setImportErrors, clearImportErrors } from '@/utils/import/eco.js'

import { RouterLink } from 'vue-router'

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

const isObjectNotEmpty = (obj) => {
    if (!obj) {
        return false
    }
    return Object.keys(obj).length > 0;
}

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const wb = XLSX.read(data, { type: 'binary' });
            let output = {}
            wb.SheetNames.forEach((workSheet) => {
                const rowObject = XLSX.utils.sheet_to_row_object_array(
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

const typeOfFile = computed(() => {
    if (!excelData.value) {
        return ""
    }
    if (excelData.value["Questionnaire"]) {
        return "Sustainability"
    }
    return "Economics"
})


const getValueChainProperty = (json, propertyName) => {
    var elementFound = json["Value Chain"].find(element => element["Property"] === propertyName)
    if (elementFound) {
        return elementFound["Value"]
    }
    setImportErrors(`Couldn't find '${propertyName}' in excel spreadsheet 'Value Chain'`)
    return null
}

const readPercentValue = (identifier) => {
    const valueInExcel = getValueChainProperty(excelData.value, identifier)
    if (!valueInExcel) {
        return undefined
    }
    return (valueInExcel / 100.0).toFixed(2)
}

const studyProperties = computed(() => {

    const localStorageValue = localStorage.getItem('localStudyProperties')
    if (localStorageValue) {
        return JSON.parse(localStorageValue)
    }

    if (typeOfFile.value === 'Sustainability') {
        if (!workbook.value) {
            return {}
        }
        const questionnaireSheet = workbook.value.Sheets[workbook.value.SheetNames[2]]
        const country = slugify(questionnaireSheet['D1']?.v)
        const commodity = questionnaireSheet['B1']?.v.trim()
        const year = 2020
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
    const country = slugify(getValueChainProperty(excelData.value, "Country"))
    const commodity = getValueChainProperty(excelData.value, "Commodity")
    const year = getValueChainProperty(excelData.value, "Reference Year")
    const localCurrency = getValueChainProperty(excelData.value, "Study's local currency");
    const targetCurrency = getValueChainProperty(excelData.value, "Standard currency code");
    const currencyRatio = getValueChainProperty(excelData.value, "change rate from study's to standard currency");
    const giniIndex = getValueChainProperty(excelData.value, "Gini index") || undefined;
    const rateOfIntegration = readPercentValue("Rate of integration into domestic economy")
    const publicFundsBalance = readPercentValue("Public funds balance / Public budget")
    const valueAddedShareNationalGdp = readPercentValue("Value added share of national GDP")
    const valueAddedShareAgriculturalGdp = readPercentValue("Value added share of the agricultural sector GDP")
    const domesticResourceCostRatio = getValueChainProperty(excelData.value, "Domestic resource cost ratio") || undefined;
    const nominalProtectionCoefficient = getValueChainProperty(excelData.value, "Nominal protection coefficient") || undefined;

    return {
        id: slugify(commodity + "-" + country),
        country,
        commodity,
        year,
        localCurrency,
        targetCurrency,
        currencyRatio,
        giniIndex,
        rateOfIntegration,
        publicFundsBalance,
        valueAddedShareNationalGdp,
        valueAddedShareAgriculturalGdp,
        domesticResourceCostRatio,
        nominalProtectionCoefficient,
        type: 'eco'
    }
})

watch(studyProperties, (newValue) => {
    localStorage.setItem('localStudyProperties', JSON.stringify(newValue))
})

const studyData = computed(() => {

    const localStorageValue = localStorage.getItem('localStudyData')
    if (localStorageValue) {
        return JSON.parse(localStorageValue)
    }

    if (typeOfFile.value === 'Sustainability') {
        if (!workbook.value) {
            return {}
        }
        const questionnaireSheet = workbook.value.Sheets[workbook.value.SheetNames[2]]
        return {
            ...studyProperties.value,
            socialData: parseSustainabilityWorksheet(questionnaireSheet)
        }
    }
    if (!excelData.value) {
        return {}
    }
    return {
        ...studyProperties.value,
        ecoData: parseEconomicsJson(excelData.value)
    }

})

watch(studyData, (newValue) => {
    localStorage.setItem('localStudyData', JSON.stringify(newValue))
})

const errors = computed(() => typeOfFile.value === 'Sustainability' ? [] : getErrors(studyData.value))


const jsonFile = computed(() => {
    return JSON.stringify(
        studyData.value
        , null, 2)
})

const dataFile = computed(() => {
    if (!jsonData.studies.find(study => study.id === studyData.value.id && study.year === studyData.value.year)) {
        jsonData.studies.push({
            id: `${studyData.value.id}`,
            title: `${studyData.value.country} ${studyData.value.commodity}`,
            year: studyData.value.year,
            country: studyData.value.country.toLowerCase(),
            product: studyData.value.commodity.toLowerCase()
        })
    }
    const slugifiedCountry = slugify(studyData.value.country)
    if (!jsonData.countries.find(country => country.id === slugifiedCountry)) {
        jsonData.countries.push({
            id: slugifiedCountry,
            prettyName: studyData.value.country
        })
    }
    const existingCommodities = jsonData.categories.reduce((arr, current) => arr.concat(current.commodities), [])
    const slugifiedCommodity = slugify(studyData.value.commodity)
    if (!existingCommodities.includes(slugifiedCommodity)) {
        jsonData.categories.find(category => category.id === 'unknown').commodities.push(slugifiedCommodity)
    }

    return JSON.stringify(
        jsonData
        , null, 2)
})

const studyFileName = computed(() => `${studyProperties.value.id}-${typeOfFile.value === 'Sustainability' ? 'social' : 'eco'}.json`)

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
    downloadFile(jsonFile.value, studyFileName.value)
}

const downloadDataJson = () => {
    downloadFile(dataFile.value, 'data.json')
}

onMounted(() => {
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
  

<style scoped lang="scss"></style>
