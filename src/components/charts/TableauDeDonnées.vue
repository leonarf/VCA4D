<template>
  <div style="width: 100%">
    <TableLite
      :is-static-mode="true"
      :columns="tableContent.columns"
      :rows="tableContent.rows"
      :total="tableContent.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      :is-hide-paging="tableContent.totalRecordCount <= 10"
    >
    </TableLite>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import TableLite from "vue3-table-lite";

  const props = defineProps({
    données: Array
  });
  const table = ref({
    isLoading: false,
    sortable: {
      order: "id",
      sort: "asc",
    },
  });

  const tableContent = computed(() => {
    var columns = Object.keys(props.données[0]).map((property) => {
      return {
        label: property,
        field: property,
        sortable: true,
      };
    });
    return {
      columns,
      rows: props.données,
      totalRecordCount: props.données.length,
    };
  });
</script>
