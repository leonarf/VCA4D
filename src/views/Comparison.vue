<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48 max-w-[90%] lg:w-[80%]">
            <h1>Compare VCA4D Value chain studies</h1>
            <StudiesComparison :countries="getCountries()" :studies="studies"></StudiesComparison>
        </div>  
    </Skeleton>
</template>

<script setup>
import Skeleton from '@components/Skeleton.vue';
import { onMounted, ref } from 'vue';
import { getStudyData, getCountries } from '@utils/data';
import StudiesComparison from '../components/StudiesComparison.vue';

const studies = ref([])
onMounted(async () => {
    const study1 = await getStudyData('cocoa-ecuador')
    const study2 = await getStudyData('cocoa-sao-tome-e-principe')
    const study3 = await getStudyData('cashew-mali')
    const study4 = await getStudyData('coffee-ecuador')
    studies.value = [
        study1, study2, study3
        , study4
    ]
})


</script>

<style scoped lang="scss">
</style>
