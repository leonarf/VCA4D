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
                <StudyEconomicGrowth v-if="view === 'economic-growth'" :studyData="studyData" :currency="currency"></StudyEconomicGrowth>
                <StudyInclusiveness v-if="view === 'inclusiveness'" :studyData="studyData" :currency="currency"></StudyInclusiveness>
                <StudySocialSustainability v-if="view === 'social-sustainability'" :studyData="studyData"></StudySocialSustainability>
            </template>
        </div>
    </Skeleton>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
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

const currency = ref('')
const updateCurrency = (event) => {
    currency.value = event
}


const view = ref(undefined)
const studyData = ref(undefined)
const error = ref(undefined)

watch (studyData, () => {
    currency.value = studyData.value.localCurrency
})

onMounted(async () => {
  const studyId = route.query.id;
  const studyView = route.query.view;

  view.value = studyView;

  try {
    const data = await getStudyData(studyId)
    studyData.value = data
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