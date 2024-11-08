<template>
  <ComparisonTitle :title="title" :studies="studies" />

  <component
    :is="getRowComponent(indicator)"
    v-for="(indicator, index) in indicators"
    :key="index"
    :studies="studies"
    :indicator="indicator"
  >
    <template v-if="indicator.format === 'social'" #default="{ value, isSubRow }">
      <div class="tag-container mx-auto my-2">
        <Tag class="tag" :lightVersion="isSubRow" :scale="value" />
      </div>
    </template>
    <template v-else #default="{ value, studyData, isSubRow }">
      <ComparisonDefaultCell
        :value="value"
        :studyData="studyData"
        :lightVersion="isSubRow"
        :valueType="indicator.format"
      />
    </template>
  </component>
</template>

<script setup>
import Tag from '@components/study/social-sustainability/Tag.vue'
import ComparisonTitle from './ComparisonTitle.vue'
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
import ComparisonRow from './ComparisonRow.vue'
import ComparisonDefaultCell from './ComparisonDefaultCell.vue'

defineProps({
  studies: Array,
  indicators: Array,
  title: String
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
