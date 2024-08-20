<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48 max-w-[90%]">
            <header>
                <div v-if="! isDataLoaded && !error" class="loading">Loading...</div>

                <div v-if="error" class="error">{{ error }}</div>

                <div v-if="isDataLoaded">
                    <StudyHeader
                      :studyData="studyData"
                      :localCurrency="studyData.targetCurrency" 
                      :currency="$route.query.currency || 'LOCAL'"
                      @update:currency="updateCurrency"
                    />
                </div>
            </header>
            <div class="w-full text-left my-16">
                <StudyMenu 
                  v-if="isDataLoaded"
                  :views="views"
                  :selectedViewKey="view"
                  :fullReportPdfUrl="studyPdfUrls.fullReportPdfUrl"
                  @select="selectView($event)"
                />
            </div>
             <template v-if="isDataLoaded">
                <component
                  :is="viewComponent"
                  :studyData="studyData"
                  :studyPdfUrls="studyPdfUrls"
                  :currency="currencySymbol"
                  @select-view="selectView($event)"
                />
            </template>
        </div>
    </Skeleton>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Skeleton from '@components/Skeleton.vue'
import StudyOverview from '@components/StudyOverview.vue'
import StudyEnvironment from '@components/StudyEnvironment.vue'
import StudyEconomicGrowth from '@components/StudyEconomicGrowth.vue'
import StudyInclusiveness from '@components/StudyInclusiveness.vue'
import StudySocialSustainability from '@components/StudySocialSustainability.vue'
import StudyHeader from '@components/study/StudyHeader.vue'
import StudyMenu from '@components/study/StudyMenu.vue'
import { getStudyData } from '@utils/data'
import { getStudyPdfUrls } from '../utils/data'
import { isCurrencySupported } from '@utils/currency.js'

const route = useRoute();
const router = useRouter()

const studyData = ref(null)
const studyPdfUrls = ref({})
const error = ref(undefined)

function updateCurrency(newCurrency) {
    localStorage.setItem('currency', newCurrency);
    router.push({ query: {
      ...route.query,
      currency: newCurrency
    } })
}

const currencySymbol = computed(() => {
  if (route.query.currency) {
   return route.query.currency === 'LOCAL' ? studyData.value.targetCurrency : route.query.currency
  }
  return studyData.value.targetCurrency
});

const views = computed(() => {
  if (!studyData.value) { return []; }
  
  const hasEco = !!studyData.value.ecoData;
  const hasSocial = !!studyData.value.socialData;
  const hasACV = !!studyData.value.acvData;
  return [
    {
      key: "overview",
      label: 'Functional Analysis',
      accessible: [hasEco, hasSocial, hasACV].filter(hasStudyPart => hasStudyPart).length >= 2,
      component: StudyOverview
    },
    {
      key: 'economic-growth',
      label: 'Contribution to economic growth',
      accessible: hasEco,
      component: StudyEconomicGrowth
    },
    {
      key: 'inclusiveness',
      label: 'Inclusiveness',
      accessible: hasEco,
      component: StudyInclusiveness
    },
    {
      key: 'social-sustainability',
      label: 'Social sustainability',
      accessible: hasSocial,
      component: StudySocialSustainability
    },
    {
      key: 'environment',
      label: 'Environmental sustainability',
      accessible: hasACV,
      component: StudyEnvironment
    }
  ]
});

const view = computed(() => {
  return route.query.view || findFirstAvailableView();

  function findFirstAvailableView() {
    const accessibleViews = views.value.filter(view => view.accessible);
    return accessibleViews[0].key;
  }
})

const viewComponent = computed(() => {
  const viewConfig = views.value.find(viewConfig => viewConfig.key === view.value);
  return viewConfig?.component || null;
});

function selectView(viewKey) {
  router.push({ query: {
    ...route.query,
    view: viewKey
  } });
}

onMounted(async () => {
  try {
    studyData.value = await getStudyData(route.query.id);
    setupCurrency();
    studyPdfUrls.value = await getStudyPdfUrls(route.query.id);
  } catch(err) {
    error.value = err;
  }
})

function setupCurrency() {
  if (studyData.value && ! isCurrencySupported(studyData.value.targetCurrency)) {
    updateCurrency("LOCAL");
  } else if (!route.query.currency) {
    updateCurrency(localStorage.getItem('currency') || "LOCAL");
  }
}

const isDataLoaded = computed(() => {
  return !! studyData.value && !! studyPdfUrls.value;
});
</script>

<style scoped lang="scss">
</style>
