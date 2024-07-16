<script setup>
import { RouterLink } from 'vue-router'
import Skeleton from '@components/Skeleton.vue'
import { computed, onMounted, ref, watch } from 'vue'
import ByCategories from '@components/home/ByCategories.vue'
import ByContinents from '@components/home/ByContinents.vue'
import { getAllJsonData, getStudyData } from '@utils/data'

const countries = ref([])
const studies = ref([])
const continents = ref([])
const categories = ref([])
const mandatoryStudiesPart = ref([])

onMounted(async () => {
  const allJsonData = getAllJsonData()
  countries.value = allJsonData.countries
  studies.value = allJsonData.studies
  continents.value = [...new Set(countries.value.map((country) => country.continent))]
  categories.value = allJsonData.categories
})

const currency = computed(() => localStorage.getItem('currency') || 'LOCAL')

watch(mandatoryStudiesPart, async (newMandatoryParts, oldMandatoryParts) => {
  const allJsonData = getAllJsonData()
  console.log('allJsonData', allJsonData)
  console.log('mandatoryStudiesPart', mandatoryStudiesPart)

  studies.value = []
  allJsonData.studies.forEach((study) => {
    getStudyData(study.id).then((dataStudy) => {
      for (var studyPart of mandatoryStudiesPart.value) {
        if (!dataStudy[studyPart]) {
          console.log(studyPart, 'not in ', study.id)
          return
        }
      }
      studies.value.push(study)
    })
  })
})
</script>

<template>
  <Skeleton>
    <section class="banner">
      <div>
        <h1><b>V</b>alue <b>C</b>hain <b>A</b>nalysis <b>F</b>or <b>D</b>evelopment</h1>
        <p>Providing value chain analysis for improving operations</p>
      </div>
    </section>
    <section class="mx-4 sm:mx-8 md:mx-12 lg:mx-48 xl:mx-60">
      <section class="welcome-message">
        <h1>Get insights into agri-food value chains in EU partner countries</h1>
        <p>
          Welcome to the Value Chain Analysis for Development (VCA4D) Information and Knowledge
          Management System. You will find access to all available value chain analyses across
          agricultural commodities around the world realised through VCA4D.
        </p>
        <p>
          Value chain analyses assist in informing policy dialogue and investment operations. They
          help the understanding of how agricultural, aquaculture and fisheries development fits
          within market dynamics. They permit an assessment of the value chains’ impact on
          smallholders, businesses, society, and environment.
        </p>
        <p>
          The European Commission has developed the VCA4D standardised methodological framework for
          analysis (<a href="https://capacity4dev.europa.eu/info/1-vca4d-methodology_en">The VCA4D Methodology | Capacity4dev</a>). It aims at understanding to what extent
          the value chain allows for inclusive economic growth and whether it is both socially and
          environmentally sustainable.
        </p>
        <p>
          Each VCA4D study provides with a functional analysis describing the main features of a
          value chain and elements of reply to four framing questions:
        </p>
        <ul class="list-disc ml-8">
          <li><strong>Main functions, flows and actors of the value chain</strong></li>
          <li>What is the contribution of the value chain to <strong>economic growth?</strong></li>
          <li>Is this economic growth <strong>inclusive?</strong></li>
          <li>Is the value chain <strong>socially</strong> sustainable?</li>
          <li>Is the value chain <strong>environmentally</strong> sustainable?</li>
        </ul>
      </section>
      <input type="checkbox" id="withEcoData" value="ecoData" v-model="mandatoryStudiesPart" />
      <label for="withEcoData">With economic data</label>

      <input type="checkbox" id="withACVData" value="acvData" v-model="mandatoryStudiesPart" />
      <label for="withACVData">With environnemental data</label>

      <input
        type="checkbox"
        id="withSocialData"
        value="socialData"
        v-model="mandatoryStudiesPart"
      />
      <label for="withSocialData">With social profil</label>
      <div>Number of studies: {{ studies.length }}</div>
      <ByCategories
        :categories="categories"
        :studies="studies"
        :countries="countries"
        :currency="currency"
      />

      <ByContinents :studies="studies" :countries="countries" :currency="currency" />
    </section>
  </Skeleton>
</template>

<style scoped lang="scss">
:global(main) {
  padding: 0 !important;
}

section {
  padding: 1.5rem;
}

section.banner {
  height: 25rem;
  width: 100%;

  background-image: url('../images/home-banner.jpg');
  background-position: center center;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  div {
    height: 60%;
    max-width: 50%;
    padding: 2rem;
    border-radius: 1.5rem;
    background-color: hsla(0, 0%, 0%, 0.7);

    position: relative;
    left: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    h1,
    p {
      color: white;
      margin: 0;
      font-weight: 300;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 500;
      line-height: 1.2;
      margin-top: 0;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
}

.welcome-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    margin-bottom: 1rem;
  }
}
</style>
