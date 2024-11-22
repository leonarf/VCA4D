<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'

import { getAllJsonData, getStudyData, logMissingData } from '@utils/data'
import { onMounted } from 'vue'

onMounted(async () => {
  const allJsonData = getAllJsonData()
  const studiesData = await Promise.all(allJsonData.studies.map((study) => getStudyData(study.id)))
  logMissingData(studiesData)
})
</script>

<style lang="scss">
@import 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.14.0/css/flag-icons.min.css';
</style>
