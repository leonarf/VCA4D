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
        <Tag
          v-if="value"
          class="tag"
          :lightVersion="isSubRow"
          :scale="value"
          :appreciation="getAppreciation(value)"
        />
      </div>
    </template>
  </ComparisonExpandableRow>
</template>

<script setup>

import { getSocialAverageGroup } from '@utils/misc.js'
import Tag from '@components/study/social-sustainability/Tag.vue';
import ComparisonTitle from './ComparisonTitle.vue';
import ComparisonExpandableRow from './ComparisonExpandableRow.vue';
defineProps({
    studies: Array,
})

const SOCIAL_PARTS = [
    "Working conditions",
    "Land and water rights",
    "Gender equality",
    "Food and nutrition security",
    "Social capital",
    "Living conditions",
]

const getAppreciation = (scale) => {
    if (scale === 1) {
        return 'Poor'
    }
    if (scale === 2) {
        return 'Rather Poor'
    }
    if (scale === 3) {
        return 'Rather Good'
    }
    if (scale === 4) {
        return 'Good'
    }
}

function getOptionalSocialAverageGroup(socialImpact) {
  if (! socialImpact) { return null; }

  return getSocialAverageGroup(socialImpact)
}

function getSocialAverageSubGroups(socialImpact) {
  if (! socialImpact) { return null; }

  const socialAverageSubGroupsByName = {};
  socialImpact.groups.forEach(group => {
    const groupTitleWithoutNumber = group.title.slice(4);
    socialAverageSubGroupsByName[groupTitleWithoutNumber] = Math.round(group.averageValue);
  });
  return socialAverageSubGroupsByName;
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
