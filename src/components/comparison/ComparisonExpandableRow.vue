<template>
  <ComparisonRow
    class="parent-row"
    :class="{ expanded }"
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
    v-for="(subKey, index) in subKeys"
    :studies="studies"
    class="sub-row"
    :class="{ expanded, 'last-sub-row': index === subKeys.length - 1 }"
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
  $border-radius: 6px;
  @mixin border-radius-bottom {
    :deep(td:first-child) {
      border-bottom-left-radius: $border-radius;
    }
    :deep(td:nth-last-child(2)) {
      border-bottom-right-radius: $border-radius;
    }
  }
  @mixin border-radius-top {
    :deep(td:first-child) {
      border-top-left-radius: $border-radius;
    }
    :deep(td:nth-last-child(2)) {
      border-top-right-radius: $border-radius;
    }
  }

  .parent-row {
    @include border-radius-top;
    
    &:not(.expanded) {
      @include border-radius-bottom;
    }
  
    &:hover :deep(td:not(:last-child)) {
      background-color: #A4CAFE;
    }
    &.expanded:not(:hover) :deep(td:not(:last-child)) {
      background-color: #C3DDFD;
    }
  }

  .sub-row {
    :deep(td:not(:last-child)) {
      background-color: #E1EFFE;
    }

    &:not(.expanded) {
      display: none;
    }
  }

  .last-sub-row {
    @include border-radius-bottom;
  }
</style>
