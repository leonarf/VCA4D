<template>
  <a
    v-if="attachmentUrl"
    target="_blank"
    class="text-blue-600"
    :href="attachmentUrl"
  >
    {{ textDisplayed }}
  </a>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getStudyFileAttachmentUrl } from '@/utils/data'

const props = defineProps({
  studyId: String,
  attachmentType: String
})

let attachmentUrl = ref(null)
getStudyFileAttachmentUrl(props.studyId, props.attachmentType).then(
  (url) => (attachmentUrl.value = url)
)

const textDisplayed = computed(() => {
  if (props.attachmentType == 'eco.xlsx') {
    return 'Download all economic data (xlsx)'
  } else if (props.attachmentType == 'eco.json') {
    return 'Download all economic data (json)'
  } else if (props.attachmentType == 'social.xlsx') {
    return 'Download full social profil (xlsx)'
  } else if (props.attachmentType == 'social.json') {
    return 'Download social data (json)'
  } else if (props.attachmentType == 'acv.xlsx') {
    return 'Download all environmental data (xlsx)'
  } else if (props.attachmentType == 'acv.json') {
    return 'Download all environmental data(json)'
  }
  return "texte pas prévu pour l'attachment " + props.attachmentType
})
</script>
