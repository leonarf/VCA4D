<template>
    <div class="bg-[#EFEFEF] px-8 flex flex-col rounded pb-4">
        <div class="flex flex-row justify-between py-4">
            <div class="color-[#303030] text-3xl font-thin">
                The study in a 6-pages snapshot 
            </div>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="downloadPdf">Download PDF</button>
            </div>
        </div>
        <div>
            Access the recommendations of the full study and the four analysis dimensions of the value chain in this synthesis.
        </div>
        <PdfReader :path="studyBriefUrl" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getBriefPdfPath } from '@utils/data';
import PdfReader from './PdfReader.vue'

const props = defineProps({
  studyBriefUrl: String
});

const downloadPdf = async () => {

    try {
        const response = await fetch(props.studyBriefUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${props.studyId}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
}
</script>