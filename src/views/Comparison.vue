<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48 max-w-[90%] lg:w-[80%]">
            <h1>Compare VCA4D Value chain studies</h1>
            <StudiesComparison :studies="studies"></StudiesComparison>
        </div>  
    </Skeleton>
</template>

<script setup>
import Skeleton from '@components/Skeleton.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { getStudiesByProduct, getStudiesByCountry } from '@utils/data';
import StudiesComparison from '../components/StudiesComparison.vue';

const route = useRoute();

const studies = ref([])
onMounted(async () => {
    const params = route.params.params || "country=ecuador"
    const [key, value ] = params.split('=')
    if (key === 'country') {
        studies.value = await getStudiesByCountry(value)
        return
    }
    if (key === 'product') {
        studies.value = await getStudiesByProduct(value)
        return
    }
})

</script>

<style scoped lang="scss">
</style>
