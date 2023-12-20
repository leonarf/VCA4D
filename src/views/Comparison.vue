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
import { useRoute } from 'vue-router'
import { getStudiesByProduct, getCountries, getStudiesByCountry } from '@utils/data';
import StudiesComparison from '../components/StudiesComparison.vue';

const route = useRoute();

const studies = ref([])
onMounted(async () => {
    const routeObjectParams = JSON.parse(route.params.params || JSON.stringify({country: "ecuador"}))
    const { country, product } = routeObjectParams
    if (country) {
        studies.value = await getStudiesByCountry(country)
        return
    }
    if (product) {
        studies.value = await getStudiesByProduct(product)
        return
    }
})

</script>

<style scoped lang="scss">
</style>
