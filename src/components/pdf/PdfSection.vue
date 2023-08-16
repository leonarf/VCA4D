<template>
    <div class="bg-[#EFEFEF] px-8 flex flex-col rounded">
        <div class="color-[#303030] text-3xl font-thin">
            The study in a 6-pages snapshot 
        </div>
        <div>
            Access the recommendations of the full study and the four analysis dimensions of the value chain in this synthesis.
        </div>
        <PdfReader :path="`../../study-briefs/${studyId}.pdf`" />
    </div>
</template>

<script setup>
import PdfReader from './PdfReader.vue'
const props = defineProps({
  studyId: String
});
</script>