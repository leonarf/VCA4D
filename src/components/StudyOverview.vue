<template>
  <article class="mt-4">
    <SectionTitle>
      <h1>Functional Analysis</h1>
    </SectionTitle>

    <section v-if="studyData.ecoData" class="pt-2">
      <StagesDescription :stagesDescription="studyData.ecoData.stages" />
    </section>

    <section v-if="studyData && studyData.ecoData">
      <Sankey :studyData="studyData" />
    </section>

    <section v-if="studyData" class="explore">
      <h2>Explore up to 4 dimensions of the value chain</h2>
      <div
        v-if="!!studyData.ecoData"
        class="section-link"
        @click="emits('select-view', 'economic-growth')"
      >
        <h3>Contribution to growth</h3>
        <p>
          Learn more about: Contribution to GDP, impact on Public Finances and Balance of Trade,
          Viability in the International Economy
        </p>
      </div>
      <div
        v-if="!!studyData.ecoData"
        class="section-link"
        @click="emits('select-view', 'inclusiveness')"
      >
        <h3>Inclusiveness</h3>
        <p>
          Learn more about profit distribution among actors, jobs created and gender inclusiveness
        </p>
      </div>
      <div
        v-if="!!studyData.socialData"
        class="section-link"
        @click="emits('select-view', 'social-sustainability')"
      >
        <h3>Social sustainability</h3>
        <p>
          Learn more about Working conditions, Land and water rights, Gender equality, Food &
          nutrition security, Social capital and Living conditions
        </p>
      </div>
      <div
        v-if="!!studyData.acvData"
        class="section-link"
        @click="emits('select-view', 'environment')"
      >
        <h3>Environmental sustainability</h3>
        <p>
          Learn more about the value chain’s damages to Human Health, Ecosystem Quality, Natural
          Resources and Climate Change
        </p>
      </div>
    </section>
    <PdfSection class="mt-8 mb-8" v-if="studyUrls.briefPdf" :studyBriefUrl="studyUrls.briefPdf" />
  </article>
</template>

<script setup>
import { defineEmits } from 'vue'
import StagesDescription from '@/components/StagesDescription.vue'
import SectionTitle from './typography/SectionTitle.vue'
import PdfSection from './pdf/PdfSection.vue'
import Sankey from './charts/Sankey.vue'

defineProps({
  studyData: Object,
  studyUrls: Object
})
const emits = defineEmits(['select-view'])
</script>

<style scoped lang="scss">
article {
  section.explore {
    .section-link {
      display: block;
      width: 100%;
      min-height: 6rem;
      cursor: pointer;

      padding: 1rem;
      margin-bottom: 1rem;

      position: relative;

      color: unset;
      text-decoration: none;

      background-color: bisque;
      border-radius: 1rem;

      h3 {
        text-transform: uppercase;
        margin: 0;
      }

      p {
        margin: 0;
      }

      &::after {
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
