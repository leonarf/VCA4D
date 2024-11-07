<template>
  <ComparisonTitle title="Social Sustainability" :studies="studies" />
  <ComparisonExpandableRow
    v-for="(part, index) in SOCIAL_PARTS"
    :key="`part_${index}`"
    :studies="studies"
    :title="part"
    :getValue="(study) => getOptionalSocialAverageGroup(study.socialData?.[index])"
    :getSubValues="(study) => getSocialAverageSubGroups(study.socialData?.[index])"
  >
    <template #default="{ value, isSubRow }">
      <div class="tag-container mx-auto my-2">
        <Tag class="tag" :lightVersion="isSubRow" :scale="value" />
      </div>
    </template>
  </ComparisonExpandableRow>
</template>

<script setup>
import Tag from '@components/study/social-sustainability/Tag.vue'
import ComparisonTitle from './ComparisonTitle.vue'
import ComparisonExpandableRow from './ComparisonExpandableRow.vue'
import {
  SOCIAL_PARTS,
  getOptionalSocialAverageGroup,
  getSocialAverageSubGroups
} from './comparisonConfig'

defineProps({
  studies: Array
})
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
