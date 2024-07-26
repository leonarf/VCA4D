<template>
  <div style="width: 100%">
    <TableLite
      :is-static-mode="true"
      :columns="columns"
      :rows="props.rows"
      :total="props.rows.length"
      :sortable="true"
      :is-hide-paging="props.rows.length <= 10"
    >
    </TableLite>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import TableLite from "vue3-table-lite";

  const props = defineProps({
    rows: Array,
    columns: Array
  });
</script>
