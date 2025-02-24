<template>
  <div class="my-4">
    <h2>Step 3 : Add study to the repository</h2>
    <p><strong>1.</strong> Download both following files</p>
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
    <p><strong>2.</strong> Add the data file as "data.json" in the "data" folder</p>
    <p>
      <strong>3.</strong> Under the "{{ `/${studyData.id}` }}" folder (you can create it if it
      doesn't exist), upload the study file as "{{ `${studyFileName}.json` }}" , and the excel file
      as "{{ `${studyFileName}.xlsx` }}"
    </p>
    <br />
    <div class="how-to">
      <h3>How to add a file:</h3>

      <p>
        Go to
        <a href="https://github.com/leonarf/VCA4D/tree/main/data"
          >https://github.com/leonarf/VCA4D/tree/main/data</a
        >
        with a VCA4D authorised account
      </p>
      Go to the right folder, and <strong>after renaming the file on your computer</strong>, click
      on "Add file" at the top right and choose "Upload Files"
      <img :src="upload_files_screenshot" alt="github screenshot" />
      Click on "Commit changes", and write a commit message (example: "Adding burkina faso mango
      social study"). Then commit
    </div>
    <div class="how-to">
      <h3>How to create a file in a new folder:</h3>
      <ul>
        <li>Click on "Add file" at the top right and choose "Create new file" instead.</li>
        <li>
          On the top bar, you can type "name-of-the-new-folder/" which will create the file in a new
          folder
          <img :src="new_folder_screenshot" alt="github screenshot" />
        </li>
        <li>Then, copy paste the file's content and commit changes</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import jsonData from '@data/data.json'
import { amendDataFile } from '@utils/import/generic'

import upload_files_screenshot from '@images/tuto_upload/upload_files_on_github.png'
import new_folder_screenshot from '@images/tuto_upload/new_folder.png'

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

<style scoped lang="scss">
a {
  color: #3f83f8 !important;
  font-weight: 600;

  &:hover {
    color: #1a56db;
  }
}
.how-to {
  margin: 16px 0;

  h3 {
    margin-bottom: 8px;
  }
}
</style>
