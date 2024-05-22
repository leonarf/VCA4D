<template>
    <article class="mt-4">
        <SectionTitle>
            <h1>Overview</h1>
        </SectionTitle> 

        <section class="pt-2">
            <h3>Main steps in the value chain</h3>
            <div class="flex flex-row flex-wrap gap-y-8 justify-evenly mt-4 mb-8">
                <div class="text-[#303030] text-center flex flex-col space-y-2 items-center max-w-[200px]" v-for="step in populatedSteps" :key="step.name">
                    <img style="height: 50px; width: 50px;" :src="getStepLogo(step)" :alt="step.name + ' illustration'"/>
                    <div class="text-sm font-semibold">{{ step.name }}</div>
                    <p class="text-center">{{ step.description || 'Pas de description' }}</p>
                </div>
            </div>
        </section>

        <section v-if="studyData" class="explore">
            <h2>Explore the 4 dimensions of the value chain</h2>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=economic-growth'">
                <h3>Contribution to growth</h3>
                <p>Learn more about <em>Contribution to GDP</em>, <em>Public finances</em>, 
                    <em>Balance of trade</em> and <em>Viability in international economy</em></p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=inclusiveness'">
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
            <RouterLink v-if="false" :to="'/study?id=' + studyData.id + '&view=environment'">
                <h3>Environmental sustainability</h3>
                <p>Learn more about <em>Climate change</em>, <em>human health</em> and
                    <em>Ecosystems</em> </p>
            </RouterLink>

        </section>

        <section v-if="studyData && studyData.ecoData">
            <Sankey :studyData="studyData"/>
        </section>
        <section v-else class="TODO">
            <p>Not enough data to display sankey diagram</p>
        </section>
        <PdfSection :study-id="studyData.id" />

    </article>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue';
import ProcessingLogo from '../images/icons/processing.svg'
import RetailLogo from '../images/icons/retail.svg'
import WholesaleLogo from '../images/icons/wholesale.svg'
import CollectionLogo from '../images/icons/collection.svg'
import ProductionLogo from '../images/icons/production.svg'
import ExportLogo from '../images/icons/export.svg'
import SectionTitle from './typography/SectionTitle.vue'
import PdfSection from './pdf/PdfSection.vue';
import Sankey from './charts/Sankey.vue'

const props = defineProps({
  studyData: Object
});

const DISPLAY_STEPS = ['Producers', 'Collectors', 'Processors', 'Wholesalers', 'Retailers']

const populatedSteps = computed(() => {
    return props.studyData?.ecoData?.stages
    .filter(stage => DISPLAY_STEPS.includes(stage.name))
    .map(stage => ({
        ...stage,
        image: ``
    }))
});

const getStepLogo = (step) => {
  switch (step.name) {
    case 'Producers':
      return ProductionLogo;
    case 'Collectors':
      return CollectionLogo;
    case 'Processors':
      return ProcessingLogo;
    case 'Wholesalers':
      return WholesaleLogo;
    case 'Retailers':
      return RetailLogo;
    case 'Exporters':
      return ExportLogo;
    default:
      return '';
  }
};

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
