<template>
  <ComparisonTitle title="Social Sustainability" :studies="studies" />

  <component
    :is="getRowComponent(indicator)"
    v-for="(indicator, index) in indicators"
    :key="index"
    :studies="studies"
    :title="indicator.title"
    :subtitle="indicator.subtitle"
    :getValue="indicator.getValue"
    :getSubValues="indicator.getSubValues"
  >
    <template #default="{ value, isSubRow }">
      <div class="tag-container mx-auto my-2">
        <Tag class="tag" :lightVersion="isSubRow" :scale="value" />
      </div>
    </template>
  </component>
</template>

<script setup>
import Tag from '@components/study/social-sustainability/Tag.vue'
import ComparisonTitle from './ComparisonTitle.vue'
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
// WIP for simplicity
import ComparisonRow from './ComparisonRow.vue'

defineProps({
  studies: Array,
  indicators: Array
})

function getRowComponent(indicator) {
  return indicator.getSubValues ? ComparisonExpandableRow : ComparisonRow
}
</script>

<style scoped lang="scss">
.tag-container {
  margin: 0.25rem auto;
  min-width: 200px;
  .tag {
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
