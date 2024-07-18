<template>
    <article class="mt-4">
        <SectionTitle>
            <h1>Functional Analysis</h1>
        </SectionTitle> 

        <section v-if="studyData.ecoData" class="pt-2">
            <StagesDescription :stagesDescription="studyData.ecoData.stages"/>
        </section>

        <section v-if="studyData" class="explore">
            <h2>Explore up to 4 dimensions of the value chain</h2>
            <RouterLink v-if="!!studyData.ecoData" :to="'/study?id=' + studyData.id + '&view=economic-growth'">
                <h3>Contribution to growth</h3>
                <p>Learn more about <em>Contribution to GDP</em>, <em>Public finances</em>, 
                    <em>Balance of trade</em> and <em>Viability in international economy</em></p>
            </RouterLink>
            <RouterLink v-if="!!studyData.ecoData" :to="'/study?id=' + studyData.id + '&view=inclusiveness'">
                <h3>Inclusiveness</h3>
                <p>Learn more about <em>Employment</em>, <em>Profits distribution across actors</em> and 
                    <em>Impact of governance</em></p>
            </RouterLink>
            <RouterLink v-if="!!studyData.socialData" :to="'/study?id=' + studyData.id + '&view=social-sustainability'">
                <h3>Social sustainability</h3>
                <p>Learn more about <em>Working conditions</em>, <em>Land and water rights</em>, 
                    <em>Gender equality</em>, <em>Food & nutrition security</em>,
                    <em>Social capital</em> and
                    <em>Living conditions</em>
                </p>
            </RouterLink>
            <RouterLink v-if="!!studyData.acvData" :to="'/study?id=' + studyData.id + '&view=environment'">
                <h3>Environmental sustainability</h3>
                <p>Learn more about <em>Climate change</em>, <em>human health</em> and
                    <em>Ecosystems</em> </p>
            </RouterLink>

        </section>

        <PdfSection v-if="studyData.briefReportPdfUrl" :study-brief-url="studyData.briefReportPdfUrl" />
        <a target="_blank" class="text-blue-600" v-if="studyData.fullReportPdfUrl" :href="studyData.fullReportPdfUrl">Download study full report</a>
        <section v-if="studyData && studyData.ecoData">
            <Sankey :studyData="studyData"/>
        </section>
    </article>

</template>

<script setup>
import { RouterLink } from 'vue-router'

import StagesDescription from '@/components/StagesDescription.vue'
import SectionTitle from './typography/SectionTitle.vue'
import PdfSection from './pdf/PdfSection.vue';
import Sankey from './charts/Sankey.vue'

const props = defineProps({
  studyData: Object
});
</script>

<style scoped lang="scss">
article {

    section.explore{
        a{
            display: block;
            width: 100%;
            min-height: 6rem;

            padding: 1rem;
            margin-bottom: 1rem;

            position: relative;

            color: unset;
            text-decoration: none;

            background-color: bisque;
            border-radius: 1rem;

            h3{
                text-transform: uppercase;
                margin: 0;
            }

            p{
                margin: 0;
            }
            
            &::after{
                content: '→';
                
                color: blue;
                font-size: 2rem;

                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

}
</style>
