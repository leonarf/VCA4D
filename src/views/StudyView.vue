<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48 max-w-[90%]">
            <header>
                <div v-if="!studyData && !error" class="loading">Loading...</div>

                <div v-if="error" class="error">{{ error }}</div>

                <div v-if="studyData">
                    <StudyHeader :studyData="studyData"/>
                </div>
            </header>
            <div class="w-full text-left ml-24 my-8">
                <StudyMenu 
                  v-if="!! studyData"
                  :views="views"
                  :localCurrency="studyData.targetCurrency" 
                  :currency="currency"
                  :fullReportPdfUrl="studyData.fullReportPdfUrl"
                  @update:currency="updateCurrency"
                  @select="selectView($event)"
                />
            </div>
             <template v-if="studyData">
                <component
                  :is="viewComponent"
                  :studyData="studyData"
                  :currency="currencySymbol"
                />
            </template>
        </div>
    </Skeleton>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Skeleton from '@components/Skeleton.vue'
import StudyOverview from '@components/StudyOverview.vue'
import StudyEnvironment from '@components/StudyEnvironment.vue'
import StudyEconomicGrowth from '@components/StudyEconomicGrowth.vue'
import StudyInclusiveness from '@components/StudyInclusiveness.vue'
import StudySocialSustainability from '@components/StudySocialSustainability.vue'
import StudyHeader from '@components/study/StudyHeader.vue'
import StudyMenu from '@components/study/StudyMenu.vue'
import { getStudyData } from '@utils/data.js'

const route = useRoute();
const router = useRouter()

const currency = ref('')
const updateCurrency = (event) => {
    currency.value = event
}

const studyData = ref(null)
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

const currencySymbol = computed( () => currency.value === 'LOCAL' ? studyData.value.targetCurrency : currency.value);

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
  const studyId = route.query.id;
  const currencyFromUrl = route.query.currency

  currency.value = currencyFromUrl

  if (!currency.value && localStorage.getItem('currency')) {
    currency.value = localStorage.getItem('currency')
  }

  try {
    studyData.value = await getStudyData(studyId)
    
    if (!currency.value) {
        currency.value = "LOCAL"
    }
  } catch(err) {
    error.value = err;
  }
})
</script>

<style scoped lang="scss">
</style>
