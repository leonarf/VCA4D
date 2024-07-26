<template>
  <DataTable
    class="table"
    selectable
    :selectedIds="newSelectedStudies"
    :maxHeight="500"
    :pageSize="50"
    :rows="studies"
    :columns="columns"
    @update:selectedIds="newSelectedStudies = $event"
  />
  <div class="footer">
    <button class="confirm-button" @click="emits('select-studies', newSelectedStudies)">Show comparison</button>
  </div>
</template>

<script setup>
  import _ from "lodash";
  import DataTable from "@components/charts/DataTable.vue";
  import { onMounted, ref } from 'vue';
  import { getAllJsonData, getStudy, getStudyData, getProduct, getCountry } from '@utils/data';

  const props = defineProps({
    selectedStudies: Array
  });
  const studies = ref([]);
  const newSelectedStudies = ref([]);

  onMounted(async () => {
    newSelectedStudies.value = props.selectedStudies;
    studies.value = await loadStudyData();

    async function loadStudyData() {
      const jsonStudies = getAllJsonData().studies;
      return Promise.all(jsonStudies.map(({ id }) => getStudyData(id)))
    }
  });

  const emits = defineEmits(["select-studies"]);

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
.table {
  overflow-y: scroll;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  .confirm-button {
    color:white;
    font-weight: 600;
    padding: 0.5rem 1rem;
    background-color: #3F83F8;
    border-radius: 0.25rem;
    right: 0px;
    width: 200px;

    &:hover {
      background-color: #1A56DB;
    }
  }
}
</style>

