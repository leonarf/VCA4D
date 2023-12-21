<template>
    <tr>
        <td class="title">
            Social Sustainability
        </td>
        <td v-for="study in studies" :key="`${study.id}`">
        </td>
    </tr>
    <tr v-for="(part, index) in SOCIAL_PARTS" :key="`part_${index}`">
        <td>
            <div class="subtitle">{{ part }}</div>
        </td>
        <td v-for="study in studies" :key="`${study.id}`">
            <div class="w-3/4 mx-auto my-2">
                <Tag v-if="study.socialData" :scale="getSocialAverageGroup(study.socialData, index)" :appreciation="getAppreciation(getSocialAverageGroup(study.socialData, index))" />
            </div>
        </td>
    </tr>
</template>

<script setup>

import { getSocialAverageGroup } from '@utils/misc.js'
import Tag from '@components/study/social-sustainability/Tag.vue';
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
</style>