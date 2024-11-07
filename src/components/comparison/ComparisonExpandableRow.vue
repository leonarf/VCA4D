<template>
  <ComparisonRow
    :class="{ expanded, 'parent-row': hasSubKeys }"
    :studies="studies"
    :title="title"
    :subtitle="subtitle"
    :getValue="getValue"
    :expandable="hasSubKeys"
    :expanded="expanded"
    @toggle-expand="toggleExpand()"
  >
    <template #default="{ value, studyData }">
      <slot :value="value" :studyData="studyData" />
    </template>
  </ComparisonRow>
  <ComparisonRow
    v-for="(subKey, index) in subKeys"
    :key="index"
    :studies="studies"
    class="sub-row"
    :class="{ expanded, 'last-sub-row': index === subKeys.length - 1 }"
    :title="subKey"
    :getValue="(study, studies) => getSubValues(study, studies)[subKey]"
  >
    <template #default="{ value, studyData }">
      <slot :value="value" :studyData="studyData" :isSubRow="true" />
    </template>
  </ComparisonRow>
</template>

<script setup>
import _ from 'lodash'
import { computed, ref } from 'vue'
import ComparisonRow from './ComparisonRow.vue'

const props = defineProps({
  studies: Array,
  title: String,
  subtitle: String,
  getValue: Function,
  getSubValues: Function
})
const expanded = ref(false)

function toggleExpand() {
  expanded.value = !expanded.value
}

const subKeys = computed(() => {
  const subValues = props.studies.map((study) => props.getSubValues(study, props.studies))
  return _.union(...subValues.map(Object.keys))
})

const hasSubKeys = computed(() => subKeys.value.length !== 0)
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

  &:hover,
  &.expanded {
    font-weight: 600;
    :deep(td:not(:last-child)) {
      background-color: #e5e7eb;
    }
  }
}

.sub-row {
  :deep(td:not(:last-child)) {
    background-color: #f3f4f6;
  }

  &:not(.expanded) {
    display: none;
  }
}

.last-sub-row {
  @include border-radius-bottom;
}
</style>
