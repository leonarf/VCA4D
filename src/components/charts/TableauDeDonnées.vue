<template>
  <div style="width: 100%">
    <TableLite
      :is-static-mode="true"
      :is-loading="table.isLoading"
      :columns="tableContent.columns"
      :rows="tableContent.rows"
      :total="tableContent.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      :is-hide-paging="tableContent.totalRecordCount <= 10"
      @is-finished="table.isLoading = false"
    >
    </TableLite>
  </div>
</template>

<script>
import TableLite from "vue3-table-lite";

export default {
  components: {
    TableLite,
  },
  props: {
    données: Array,
  },
  data() {
    return {
      table: {
        isLoading: false,
        sortable: {
          order: "id",
          sort: "asc",
        },
      },
    };
  },
  computed: {
    tableContent() {
      var columns = Object.keys(this.données[0]).map((property) => {
        return {
          label: property,
          field: property,
          sortable: true,
        };
      });
      return {
        columns,
        rows: this.données,
        totalRecordCount: this.données.length,
      };
    },
  },
};
</script>
