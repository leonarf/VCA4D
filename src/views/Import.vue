<template>
  <LocalStudyBanner v-if="isStudyObjectNotEmpty" @click-clear="clearData" />
  <Skeleton :skipFooter="true">
    <div class="corps-page-import">
      <h1>Add a study to the VCA4D website</h1>
      <h2>Step 1 : Import a study file</h2>

      <div>
        <div v-if="isStudyObjectNotEmpty">
          <div>
            You have imported this study: <b>{{ studyData['id'] }}</b>
          </div>
          <div class="ml-4">
            Press
            <a class="cursor-pointer" @click="clearData">Remove</a> or
          </div>
        </div>
        <p v-else>Upload the file to the platform</p>
        <br />
        <input type="file" @change="handleFileUpload" />
      </div>

      <div v-if="isStudyObjectNotEmpty">
        <CheckImportedDataStep :studyData="studyData" :importErrors="importErrors" />
        <SaveOnGithubStep :studyData="studyData" />
      </div>
    </div>
  </Skeleton>
</template>

<script setup>
import { computed, watch, onMounted, ref } from 'vue'

import * as XLSX from 'xlsx'

import Skeleton from '@components/Skeleton.vue'
import SaveOnGithubStep from '@components/import/SaveOnGithubStep.vue'
import CheckImportedDataStep from '@components/import/CheckImportedDataStep.vue'
import LocalStudyBanner from '@components/study/LocalStudyBanner.vue'

import { clearLocalStorage } from '@utils/misc'
import { getAllJsonData } from '@utils/data'
import { processUploadedExcelFile } from '@utils/import/generic.js'

const workbook = ref(null)

const clearData = () => {
  clearLocalStorage()
  workbook.value = null
}

const knownProducts = ref([])
onMounted(async () => {
  const allJsonData = getAllJsonData()
  knownProducts.value = allJsonData.categories.reduce(
    (arr, item) => arr.concat(item.commodities),
    []
  )
})

const isStudyObjectNotEmpty = computed(() => {
  if (!studyData.value) {
    return false
  }
  return Object.keys(studyData.value).length > 0
})

const handleFileUpload = (event) => {
  clearData()
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target.result
      const wb = XLSX.read(data, { type: 'binary' })
      workbook.value = wb
      localStorage.setItem('localWorkbook', JSON.stringify(wb))
    }
    reader.readAsArrayBuffer(file)
  }
}

const importErrors = ref([])
const studyData = ref(null)

watch(
  () => workbook.value,
  () => {
    if (!workbook.value) {
      studyData.value = null
      importErrors.value = []
      return
    }

    let { data, errors } = processUploadedExcelFile(workbook.value)
    localStorage.setItem('localStudyData', JSON.stringify(data))
    studyData.value = data
    importErrors.value = errors
  }
)

onMounted(() => {
  const localStorageWorkbook = localStorage.getItem('localWorkbook')
  if (localStorageWorkbook) {
    workbook.value = JSON.parse(localStorageWorkbook)
  }
})
</script>

<style scoped lang="scss">
.corps-page-import {
  max-width: 800px;
  margin: auto;
}
ol {
  list-style: decimal;
  margin-left: 1.5rem;
}
.corps {
  max-width: 800px;
  margin: auto;
  align-items: left;
}
</style>
