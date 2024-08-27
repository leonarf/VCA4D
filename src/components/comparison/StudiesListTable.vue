<template>
  <DataTable
    class="table"
    selectable
    :selectedIds="newSelectedStudies"
    :maxHeight="500"
    :pageSize="50"
    :rows="studies"
    :columns="columns"
    @update:selected-ids="newSelectedStudies = $event"
  />
  <div class="footer">
    <button class="confirm-button" @click="emits('select-studies', newSelectedStudies)">Show comparison</button>
  </div>
</template>

<script setup>
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
      return Promise.all(jsonStudies.map(({ id }) => populateStudy(id)))
    }
  });
  async function populateStudy(id) {
    const studyData = await getStudyData(id);
    return {
      id: studyData.id,
      product: getProduct(getStudy(studyData.id).product).prettyName,
      country: getCountry(getStudy(studyData.id).country).prettyName,
      isEcoAvailable: isAvailable(studyData, "ecoData"),
      isSocialAvailable: isAvailable(studyData, "socialData"),
      isAcvAvailable: isAvailable(studyData, "acvData")
    }
  }

  const emits = defineEmits(["select-studies"]);

  const columns = [{
    label: "Product",
    field: "product",
    sortable: true
  }, {
    label: "Country",
    field: "country",
    sortable: true
  }, {
    label: "Macro economic indicators",
    field: "isEcoAvailable",
    sortable: true
  }, {
    label: "Social sustainability",
    field: "isSocialAvailable",
    sortable: true
  }, {
    label: "Environmental analysis",
    field: "isAcvAvailable",
    sortable: true
  }];

  function isAvailable(studyData, dataKey) {
    return !! studyData[dataKey] ? "Available" : "-"
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

