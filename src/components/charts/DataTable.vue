<template>
  <div style="width: 100%" :class="{ selectable }">
    <TableLite
      :isSlotMode="true"
      :columns="columnsWithCheckbox"
      :rows="sortedRows"
      :total="sortedRows.length"
      :sortable="{
        order: 'id',
        sort: 'asc',
      }"
      :max-height="maxHeight"
      :pageSize="pageSize"
      :isHidePaging="sortedRows.length <= pageSize"
      @row-clicked="onClickRow"
      @do-search="updateSortOnSearch"
    >
      <template v-if="selectable" #checkbox="{ value: rowData }">
        <input
          type="checkbox"
          :checked="isSelected(rowData.id)"
          @click.stop="toggleRowSelection(rowData.id)"
        >
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

  td, th {
    color: #303030 !important;
    background-color: white !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: none !important;
  }
  td {
    padding: 2px 4px 4px !important;
  }

  thead {
    border-collapse: separate !important;
    th {
      border-top: none !important;
      padding: 2px 4px 20px !important;

      .vtl-sortable {
        background-size: auto;
        background-position: bottom right;
        filter: hue-rotate(-20deg) saturate(2);
      }

    }
  }
  
  tbody {
    tr:first-child td {
      border-top: none !important;
    }
  
    td {
      padding: 2px 4px 4px !important;
    }
  }
}

.selectable :deep(table) {
  tr:hover {
    td {
      color: #3F83F8 !important;
    }
  }

  td {
    user-select: none;
    cursor: pointer;

    input {
      cursor: pointer;
    }
  }
}
</style>
