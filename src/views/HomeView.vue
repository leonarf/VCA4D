<script setup>
import _ from 'lodash';
import Skeleton from '@components/Skeleton.vue'
import { computed, onMounted, ref, watch } from 'vue'
import ByCategories from '@components/home/ByCategories.vue'
import ByContinents from '@components/home/ByContinents.vue'
import FilterInput from '@components/home/FilterInput.vue'
import { getAllJsonData, getStudyData } from '@utils/data'

const countries = ref([])
const studies = ref([])
const continents = ref([])
const categories = ref([])
const mandatoryStudiesFilter = ref({
  ecoData: false,
  acvData: false,
  socialData: false
});

onMounted(async () => {
  const allJsonData = getAllJsonData()
  countries.value = allJsonData.countries
  studies.value = await populateStudiesData(allJsonData.studies);
  continents.value = [...new Set(countries.value.map((country) => country.continent))]
  categories.value = allJsonData.categories
})

async function populateStudiesData(jsonStudies) {
  return Promise.all(jsonStudies.map(populateStudyData));

  async function populateStudyData(jsonStudy) {
    const studyData = await getStudyData(jsonStudy.id);
    return {
      ...jsonStudy,
      ..._.pick(studyData, ["ecoData", "acvData", "socialData"])
    };
  }
}

const currency = computed(() => localStorage.getItem('currency') || 'LOCAL')

const filteredStudies = computed(() => {
  return studies.value.filter(hasMandatoryParts);

  function hasMandatoryParts(study) {
    for (var studyPart in mandatoryStudiesFilter.value) {
      if (mandatoryStudiesFilter.value[studyPart] && !study[studyPart]) { return false; }
    }
    return true;
  }
})

function toggleFilter(filterKey) {
  mandatoryStudiesFilter.value[filterKey] = !mandatoryStudiesFilter.value[filterKey];
}
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
      <section>
        <div class="flex gap-2">
          <FilterInput label="With economic data" :value="mandatoryStudiesFilter.ecoData" @toggle="toggleFilter('ecoData')"/>
          <FilterInput label="With environnemental data" :value="mandatoryStudiesFilter.acvData" @toggle="toggleFilter('acvData')"/>
          <FilterInput label="With social profil" :value="mandatoryStudiesFilter.socialData" @toggle="toggleFilter('socialData')"/>
        </div>
        
        <div>Number of studies: {{ filteredStudies.length }}</div>
      </section>
      <ByCategories
        :categories="categories"
        :studies="filteredStudies"
        :countries="countries"
        :currency="currency"
      />

      <ByContinents :studies="filteredStudies" :countries="countries" :currency="currency" />
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
