<template>
  <div style="width: 100%">
    <TableLite
      :is-slot-mode="true"
      :columns="columnsWithCheckbox"
      :rows="props.rows"
      :total="props.rows.length"
      :sortable="true"
      :max-height="maxHeight"
      :pageSize="pageSize"
      :is-hide-paging="props.rows.length <= pageSize"
      @row-clicked="onClickRow"
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
  import { computed } from "vue";
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
</script>
