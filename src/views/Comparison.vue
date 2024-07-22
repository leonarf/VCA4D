<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48 max-w-[90%] lg:w-[80%]">
            <h1>Compare VCA4D Value chain studies</h1>
            <StudiesComparison
                v-if="studies.length > 0"
                :studies="studies"
            />
            <div class="no-study" v-else-if="loading === false">
                No study is selected
            </div>
        </div>  
    </Skeleton>
</template>

<script setup>
import Skeleton from '@components/Skeleton.vue';
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router'
import { getStudyData } from '@utils/data';
import StudiesComparison from '../components/StudiesComparison.vue';
import { extractStudiesFromQueryString } from '@utils/router';

const route = useRoute();

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
}, { immediate: true })

</script>

<style scoped lang="scss">
.no-study {
    display:flex;
    justify-content: center;
    padding: 64px 16px;
    margin-bottom: 32px;
    background-color: #ededed;
    border-radius: 8px;
    width: 100%;
}
</style>
