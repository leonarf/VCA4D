<template>
  <div class="flex flex-col gap-y-24">
    <SocialSummary :studyData="studyData" />
    <SocialDetails :studyData="studyData" />
    <AttachmentLink :studyId="studyData.id" attachmentType="social.xlsx" />
  </div>
</template>

<script setup>
import SocialSummary from './study/social-sustainability/SocialSummary.vue'
import SocialDetails from './study/social-sustainability/SocialDetails.vue'
import AttachmentLink from '@components/pdf/AttachmentLink.vue'

defineProps({
  studyData: Object
})
</script>

<style scoped lang="scss"></style>
