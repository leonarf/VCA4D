<template>
    <div v-for="(part, index) in studyData.socialData" :key="part.title">
        <h2 class="text-xl underline decoration-4 underline-offset-4 text-[#151515]">{{ part.title }}</h2>
        <a :id="`social_anchor_${index + 1}`"></a>

        <SocialDetailsGroup v-for="group in part.groups" :key="group.title" :group="group" />
    </div>
</template>

<script setup>
import SocialDetailsGroup from './SocialDetailsGroup.vue';

const props = defineProps({
    studyData: Object
})
</script>

<style scoped lang="scss">
</style>