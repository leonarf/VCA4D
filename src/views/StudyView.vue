<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48">
            <header>
                <div v-if="!studyData && !error" class="loading">Loading...</div>

                <div v-if="error" class="error">{{ error }}</div>

                <div v-if="studyData">
                    <StudyHeader :studyData="studyData"/>
                </div>
            </header>
            <div class="w-full text-left ml-24 my-8">
                <StudyMenu v-if="studyData"  :studyId="studyData.id" :localCurrency="studyData.localCurrency" :currency="currency"
                @update:currency="updateCurrency" />
            </div>
            <template v-if="studyData">
                <StudyOverview v-if="view === undefined" :studyData="studyData"></StudyOverview>
                <StudyEnvironment v-if="view === 'environment'" :studyData="studyData"></StudyEnvironment>
                <StudyEconomicGrowth v-if="view === 'economic-growth'" :studyData="studyData" :currency="currencySymbol"></StudyEconomicGrowth>
                <StudyInclusiveness v-if="view === 'inclusiveness'" :studyData="studyData" :currency="currencySymbol"></StudyInclusiveness>
                <StudySocialSustainability v-if="view === 'social-sustainability'" :studyData="studyData"></StudySocialSustainability>
            </template>
        </div>
    </Skeleton>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Skeleton from '../components/Skeleton.vue'
import StudyOverview from '../components/StudyOverview.vue'
import StudyEnvironment from '../components/StudyEnvironment.vue'
import StudyEconomicGrowth from '../components/StudyEconomicGrowth.vue'
import StudyInclusiveness from '../components/StudyInclusiveness.vue'
import StudySocialSustainability from '../components/StudySocialSustainability.vue'
import StudyHeader from '../components/study/StudyHeader.vue'
import StudyMenu from '../components/study/StudyMenu.vue'
import getStudyData from '../studyData.js'

const route = useRoute();
const router = useRouter()

const currency = ref('')
const updateCurrency = (event) => {
    currency.value = event
}

const view = ref(undefined)
const studyData = ref(undefined)
const error = ref(undefined)

watch(currency, (newCurrency) => {
    router.push({ query: 
        {
            ...route.query,
            currency: newCurrency
        }
    })
    localStorage.setItem('currency', newCurrency);
})

const currencySymbol = computed( () => currency.value === 'LOCAL' ? studyData.value.localCurrency : currency.value);

onMounted(async () => {
  const studyId = route.query.id;
  const studyView = route.query.view;
  const currencyFromUrl = route.query.currency

  view.value = studyView;
  currency.value = currencyFromUrl

  if (!currency.value && localStorage.getItem('currency')) {
    currency.value = localStorage.getItem('currency')
  }

  try {
    const data = await getStudyData(studyId)
    studyData.value = data

    if (!currency.value) {
        currency.value = studyData.value.localCurrency
    }
  } catch(err) {
    error.value = err;
  }
})

const onBeforeRouteUpdate = (to, from) => {
  const view = to.query.view;
  view.value = view;
};
</script>

<style scoped lang="scss">
</style>