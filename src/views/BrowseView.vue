<template>
  <Skeleton>
    <section class="mx-4 sm:mx-8 md:mx-12 lg:mx-48 xl:mx-60">
      <section>
        <h1><strong>Browse studies</strong></h1>
        <div class="filter-section">
          <h3>Filter the studies on this page based on the topics addressed.</h3>
          <div>
            <FilterInput
              label="With economic data"
              :value="mandatoryStudiesFilter.ecoData"
              @toggle="toggleFilter('ecoData')"
            />
            <FilterInput
              label="With environnemental data"
              :value="mandatoryStudiesFilter.acvData"
              @toggle="toggleFilter('acvData')"
            />
            <FilterInput
              label="With social profile"
              :value="mandatoryStudiesFilter.socialData"
              @toggle="toggleFilter('socialData')"
            />
          </div>
          <div>
            <div>Number of studies: {{ filteredStudies.length }}</div>
          </div>
        </div>
      </section>
      <ByCategories :categories="categories" :studies="filteredStudies" :countries="countries" />

      <ByContinents :studies="filteredStudies" :countries="countries" />
    </section>
  </Skeleton>
</template>

<script setup>
import Skeleton from '@components/Skeleton.vue'
import { computed, onMounted, ref } from 'vue'
import ByCategories from '@components/home/ByCategories.vue'
import ByContinents from '@components/home/ByContinents.vue'
import FilterInput from '@components/home/FilterInput.vue'
import { getAllJsonData, populateStudyData } from '@utils/data'

const countries = ref([])
const studies = ref([])
const continents = ref([])
const categories = ref([])
const mandatoryStudiesFilter = ref({
  ecoData: false,
  acvData: false,
  socialData: false
})

onMounted(async () => {
  const allJsonData = getAllJsonData()
  studies.value = await populateStudiesData(allJsonData.studies)
  countries.value = allJsonData.countries
  continents.value = [...new Set(countries.value.map((country) => country.continent))]
  categories.value = allJsonData.categories
})

async function populateStudiesData(jsonStudies) {
  return Promise.all(jsonStudies.map(populateStudyData))
}

const filteredStudies = computed(() => {
  return studies.value.filter(hasMandatoryParts)

  function hasMandatoryParts(study) {
    for (var studyPart in mandatoryStudiesFilter.value) {
      if (mandatoryStudiesFilter.value[studyPart] && !study[studyPart]) {
        return false
      }
    }
    return true
  }
})

function toggleFilter(filterKey) {
  mandatoryStudiesFilter.value[filterKey] = !mandatoryStudiesFilter.value[filterKey]
}
</script>

<style scoped lang="scss">
section {
  padding: 1.5rem;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
