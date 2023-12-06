<script setup>
import { RouterLink } from 'vue-router'
import Skeleton from '../components/Skeleton.vue'
import { computed, onMounted, ref } from 'vue';
import ByCategories from '../components/home/ByCategories.vue';
import ByContinents from '../components/home/ByContinents.vue';
import { geAllJsonData } from '../utils/data';

const studies = ref([])
const countries = ref([])
const continents = ref([])
const categories = ref([])

onMounted(async () => {
    const allJsonData = geAllJsonData()
    studies.value = allJsonData.studies
    countries.value = allJsonData.countries
    continents.value = [...new Set(countries.value.map(country => country.continent))] 
    categories.value = allJsonData.categories
})

const currency = computed(() => localStorage.getItem('currency') || 'LOCAL')

</script>

<template>
    <Skeleton>
        <section class="banner">
            <div>
                <h1><b>V</b>alue <b>C</b>hain <b>A</b>nalysis <b>F</b>or <b>D</b>evelopment</h1>
                <h2>Providing value chain analysis for improving operations</h2>
            </div>
        </section>
        <section class="mx-4 sm:mx-8 md:mx-12 lg:mx-48 xl:mx-60">
            <section>
                <h2>Get insight into food value chains in developing countries</h2>
                <p>
                    Welcome to the VCA4D website. You will find a tailored access to 35 value chain analyses
                    across 16 different agricultural commodities around the world. Based on a standardised
                    methodology (*link), each analysis allows an assessment of the value chain's impact on
                    smallholders, businesses, society and environment. Any of the VCA4D academic study provides
                    information across 4 related domains:
                </p>
                <ul class="list-disc ml-8">
                    <li>the various actors and <strong>structuration of the chain</strong></li>
                    <li>its contribution to <strong>economic growth</strong> and the state's public finance</li>
                    <li>the chain's <strong>inclusiveness</strong> and contribution to <strong>employment</strong></li>
                    <li>the impact of the value chain on <strong>environment</strong>.</li>
                </ul>
            </section>

            <ByCategories :categories="categories" :studies="studies" :countries="countries" :currency="currency"/>

            <ByContinents :studies="studies" :countries="countries" :currency="currency"/>
        </section>
    </Skeleton>
</template>

<style scoped lang="scss">
:global(main) {
    padding: 0 !important;
}

section {
    padding: 1.5rem;
}

section.banner {
    height: 25rem;
    width: 100%;

    background-image: url('../images/home-banner.jpg');
    background-position: center center;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    div {
        height: 60%;
        max-width: 75%;
        padding: 1rem;
        border-radius: 1.5rem;
        background-color: hsla(0, 0%, 0%, 0.7);

        position: relative;
        left: 4rem;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        h1,
        h2 {
            color: white;
            margin: 0;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 500;
            line-height: 1.2;
        }

        h2 {
            font-size: 1.2rem;
        }
    }
}
</style>