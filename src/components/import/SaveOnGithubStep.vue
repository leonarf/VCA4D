<template>
  <div class="my-4">
    <h2>Step 3 : Add study to repo</h2>
    <p>1. Download both following files</p>
    <h4 class="font-bold">Replace data file and add study file in /data/</h4>
    <div class="flex flex-row mb-2 gap-x-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="downloadDataJson"
      >
        Download data file
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="downloadStudy"
      >
        Download study file
      </button>
    </div>
    <p>Step 2 : Go to https://github.com/leonarf/VCA4D/tree/main/data</p>
    <p>Step 3 : Login to a VCA4D authorised github account</p>
    <p>Step 4 : Click on "Add file" and then "Create new file"</p>
    <img :src="upload_files_screenshot" alt="github screenshot" />
    <p>Step 5 : Upload both previously downloaded files, and click on "Commit changes"</p>
    <img :src="commit_creation_screenshot" alt="github screenshot" />
    <p>
      Step optional : rename your Excel file to {{ `${studyFileName}.ods` }} before saving it into
      github
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import jsonData from '@data/data.json'
import { amendDataFile } from '@utils/import/generic'

import upload_files_screenshot from '@images/tuto_upload/upload_files_on_github.png'
import commit_creation_screenshot from '@images/tuto_upload/commit_creation_screenshot.png'

const props = defineProps({
  studyData: Object
})

const jsonFile = computed(() => {
  return JSON.stringify(props.studyData, null, 2)
})

const studyFileName = computed(() => {
  if (props.studyData.type == 'eco') {
    return `${props.studyData.id}-eco`
  } else if (props.studyData.type == 'ACV') {
    return `${props.studyData.id}-acv`
  } else if (props.studyData.type == 'social') {
    return `${props.studyData.id}-social`
  }
  return null
})

const dataFile = computed(() => {
  return amendDataFile(jsonData, props.studyData)
})

const downloadFile = (data, fileName) => {
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()

  URL.revokeObjectURL(url)
}

const downloadStudy = () => {
  downloadFile(jsonFile.value, `${studyFileName.value}.json`)
}

const downloadDataJson = () => {
  downloadFile(dataFile.value, 'data.json')
}
</script>

<style scoped lang="scss"></style>
