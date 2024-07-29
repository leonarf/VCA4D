<template>
    <ComparisonTitle title="Social Sustainability" :studies="studies" />
    <tr v-for="(part, index) in SOCIAL_PARTS" :key="`part_${index}`">
        <td>
            <div class="subtitle">{{ part }}</div>
        </td>
        <td v-for="study in studies" :key="`${study.id}`">
            <div class="tag-container mx-auto my-2">
                <Tag
                    v-if="study.socialData"
                    class="tag"
                    :scale="getSocialAverageGroup(study.socialData, index)"
                    :appreciation="getAppreciation(getSocialAverageGroup(study.socialData, index))"
                />
            </div>
        </td>
        <td></td>
    </tr>
</template>

<script setup>

import { getSocialAverageGroup } from '@utils/misc.js'
import Tag from '@components/study/social-sustainability/Tag.vue';
import ComparisonTitle from './ComparisonTitle.vue';
const props = defineProps({
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

</script>

<style scoped lang="scss">
.tag-container {
    margin: 0.5rem auto;
    min-width: 200px;
    .tag {
        max-width: 80%;
        margin: 0 auto;
    }
}
</style>
