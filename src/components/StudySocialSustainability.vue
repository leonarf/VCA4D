<template>
    <div class="flex flex-col gap-y-24">
        <SocialSummary :studyData="studyData"/>
        <SocialDetails :studyData="studyData"/>
    </div>
</template>

<script setup>
import SocialSummary from './study/social-sustainability/SocialSummary.vue'
import SocialDetails from './study/social-sustainability/SocialDetails.vue'


const props = defineProps({
    studyData: Object
})
</script>

<style scoped lang="scss"></style>