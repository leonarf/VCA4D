<template>
  <TableLite
    class="table"
    :isLoading="studies.length === 0"
    :columns="columns"
    :max-height="500"
    :total="studies.length"
    :rows="studies"
    :page-size="50"
    :is-hide-paging="studies.length <= 50"
  >
  </TableLite>
</template>

<script setup>
  import _ from "lodash";
  import { onMounted, ref } from 'vue';
  import TableLite from 'vue3-table-lite';
  import { getAllJsonData, getStudy, getStudyData, getProduct, getCountry } from '@utils/data';

  const studies = ref([]);

  onMounted(async () => {
    const jsonStudies = getAllJsonData().studies;
    studies.value = await Promise.all(jsonStudies.map(({ id }) => getStudyData(id)))
  });

  const columns = [{
    label: "Product",
    display: (studyData) => _.capitalize(getProduct(getStudy(studyData.id).product).prettyName)
  }, {
    label: "Country",
    display:(studyData) => _.capitalize(getCountry(getStudy(studyData.id).country).prettyName)
  }, {
    label: "Macro economic indicators",
    display: buildAvailibilityDisplay("ecoData")
  }, {
    label: "Social sustainability",
    display: buildAvailibilityDisplay("socialData")
  }, {
    label: "Environmental analysis",
    display: buildAvailibilityDisplay("acvData")
  }];

  function buildAvailibilityDisplay(dataKey) {
    return (studyData) => !! studyData[dataKey] ? "Available" : "-"
  }
</script>

<style scoped lang="scss">
</style>

