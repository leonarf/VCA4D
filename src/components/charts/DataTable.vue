<template>
  <div style="width: 100%">
    <TableLite
      :is-slot-mode="true"
      :columns="columnsWithCheckbox"
      :rows="sortedRows"
      :total="sortedRows.length"
      :sortable="{
        order: 'id',
        sort: 'asc',
      }"
      :max-height="maxHeight"
      :pageSize="pageSize"
      :is-hide-paging="sortedRows.length <= pageSize"
      @row-clicked="onClickRow"
      @do-search="updateSortOnSearch"
    >
      <template v-if="selectable" v-slot:checkbox="{ value: rowData }">
        <input
          type="checkbox"
          :checked="isSelected(rowData.id)"
          @click.stop="toggleRowSelection(rowData.id)"
        />
      </template>
    </TableLite>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";
  import TableLite from "vue3-table-lite";

  const props = defineProps({
    selectable: Boolean,
    selectedIds: {
      type: Array,
      default: []
    },
    pageSize: { 
      type: Number,
      default: 10,
      validator: (size) => [10, 25, 50].includes(size)
    },
    maxHeight: {
      type: Number,
      required: false
    },
    rows: Array,
    columns: Array
  });

  const sortingOptions = ref({
    sortingField: null,
    sortOrder: null
  });

  const emits = defineEmits(["update:selectedIds"]);

  function isSelected(rowId) {
    return props.selectedIds.includes(rowId);
  }

  function onClickRow(rowData) {
    if (! props.selectable) { return; }
    return toggleRowSelection(rowData.id)
  }

  function toggleRowSelection(rowId) {
    let newSelectedIds = [...props.selectedIds];

    if (props.selectedIds.includes(rowId)) {
      newSelectedIds = newSelectedIds.filter(id => id !== rowId);
    } else {
      newSelectedIds.push(rowId)
    }

    emits("update:selectedIds", newSelectedIds);
  }

  const columnsWithCheckbox = computed(() => {
    if (! props.selectable) { return props.columns; }

    return [
      { field: "checkbox" },
      ...props.columns
    ];
  })

  function updateSortOnSearch(_first, _last, newSortingField, newSortOrder) {
    sortingOptions.value = {
      sortingField: newSortingField,
      sortOrder: newSortOrder
    };
  }
  const sortedRows = computed(() => {
    if (! sortingOptions.value.sortingField) { return props.rows; }
    
    const rows = sortRows([...props.rows], sortingOptions.value);
    return rows;
  })

  function sortRows(rows, { sortingField, sortOrder }) {
    const newSortedRows = rows.sort((itemA, itemB) => {
      if (itemA[sortingField] < itemB[sortingField]) {
        return -1;
      } else if (itemA[sortingField] > itemB[sortingField]) {
        return 1;
      } else { return 0; }
    })

    if (sortOrder === "desc") {
      newSortedRows.reverse();
    }
    return newSortedRows;
  }
</script>

<style scoped lang="scss">
:deep(table) {
  thead {
    .vtl-sortable {
      background-size: auto;
      background-position: bottom right;
    }
  }
}
</style>
