<template>
  <Skeleton>
    <div>
      <h1 class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48">Compare value chains</h1>
      <div v-if="studies.length > 0" class="py-1 pb-16 px-4 sm:px-8 md:px-12 lg:px-40 xl:px-48 studies-wrapper">
        <StudiesComparison
          :studies="studies"
          @select-studies="selectStudies($event)"
        />
      </div>
      <div v-else-if="loading === false" class="mx-4 mb-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48 no-study">
        No study is selected
        <AddStudiesButton
          class="mt-4"
          :currentStudySelection="studies.map(study => study.id)"
          @select-studies="selectStudies($event)"
        />
      </div>
    </div>  
  </Skeleton>
</template>

<script setup>
import Skeleton from '@components/Skeleton.vue';
import { watch, ref, } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getStudyData } from '@utils/data';
import StudiesComparison from '../components/StudiesComparison.vue';
import AddStudiesButton from "@components/comparison/AddStudiesButton.vue";
import { extractStudiesFromQueryString, getStudyListQueryString } from '@utils/router';

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const studies = ref([])

watch(route, async () => {
    if (! route.query.studies) { 
        studies.value = [];
        return;
    }
    const studyIds = extractStudiesFromQueryString(route.query.studies);
    loading.value = true;
    studies.value = await Promise.all(studyIds.map(getStudyData))
    loading.value = false;
}, { immediate: true });

function selectStudies(studyIds) {
    router.replace({ query: { studies: getStudyListQueryString(studyIds) } });
}

</script>

<style scoped lang="scss">
.studies-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: scroll;
}
.no-study {
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    justify-content: center;
    padding: 64px 16px;
    background-color: #ededed;
    border-radius: 8px;
}
</style>
