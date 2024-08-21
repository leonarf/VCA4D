<template>
  <ComparisonRow
    :studies="studies"
    :title="title"
    :subtitle="subtitle"
    :getValue="getValue"
    expandable
    :expanded="expanded"
    @toggle-expand="toggleExpand()"
  >
    <template #default="{ value }">
      <slot :value="value"></slot>
    </template>
  </ComparisonRow>
  <ComparisonRow
    v-for="subKey in subKeys"
    :studies="studies"
    class="sub-row"
    :class="{ expanded }"
    :title="subKey"
    subtitle="-"
    :getValue="study => getSubValues(study)[subKey]"
  >
    <template #default="{ value }">
      <slot :value="value"></slot>
    </template>
  </ComparisonRow>
</template>

<script setup>
import { computed, ref } from 'vue';
import ComparisonRow from './ComparisonRow.vue';

const props = defineProps({
    studies: Array,
    title: String,
    subtitle: String,
    getValue: Function,
    getSubValues: Function,
})
const expanded = ref(false);

function toggleExpand() {
  expanded.value = ! expanded.value;
}
const subKeys = computed(() => Object.keys(props.getSubValues(props.studies[0])))
</script>

<style scoped lang="scss">
  .sub-row {
    :deep(td:not(:last-child)) {
      background-color: #E5E7EB;
    }

    &:not(.expanded) {
      display: none;
    }
  }
</style>
