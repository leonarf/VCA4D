<script setup>
import { RouterLink } from 'vue-router'
import Skeleton from '../components/Skeleton.vue'
import { onMounted, ref } from 'vue';
import jsonData from '../../data/data.json'
import MilkLogo from '../images/icons/products/milk.svg'
import PineappleLogo from '../images/icons/products/pineapple.svg'

const studies = ref([])
const countries = ref([])
const categories = ref([])
onMounted(async () => {
    studies.value = jsonData.studies
    countries.value = jsonData.countries
    categories.value = jsonData.categories
})

const filterStudiesByCategory = (category) => {
  return studies.value.filter(item => item.category === category);
};
const filterStudiesByCountry = (country) => {
  return studies.value.filter(item => item.country === country);
};

const setDefaultImage = (event) => {
  event.target.src = 'src/images/product-pictograms/mango.png';
};

const getProductLogo = (product) => {
    switch(product) {
        case 'milk':
            return MilkLogo
        default:
            return PineappleLogo
    }
}

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
            <section class="introduction">
                <h2 class="text-[#303030] font-bold text-2xl mb-4">Get insight into food value chains in developing countries</h2>
                <p class="text-justify mb-2">
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

            <section>
                <h3>Browse studies by <strong>product</strong></h3>
                
                <template v-for="category in categories" :key="category.id">
                    <h4 :style="`margin-top: 48px; color: ${category.textColor};`" class="font-semibold">{{ category.prettyName }}</h4>
                    <div class="border-t-[13px] pt-4" :style="`border-color: ${category.color};`">
                        <ul class="flex flex-row">
                            <li v-for="study in filterStudiesByCategory(category.id)" :key="study.fileName" class="h-full mr-4">
                                <div class="flex flex-col items-center space-y-2">
                                    <RouterLink :to="`/study?id=${study.fileName}`">
                                        <div class="w-[130px] h-[130px] bg-[#DFDFDF] flex flex-col items-center justify-evenly text-[#303030] px-8 rounded-lg">
                                            <img :src="getProductLogo(study.product)" 
                                            :alt="`Link to ${study.title} study`"
                                            style="height: 75px; width: 75px;"
                                            class="w-24"
                                            @error="setDefaultImage">
                                            <p class="font-semibold capitalize">{{ study.product }}</p>
                                        </div>
                                    </RouterLink>
                                    <p>{{  study.country }} {{ study.year }}</p>
                                </div>
                            </li>
                            <li v-if="filterStudiesByCategory(category.id).length === 0">
                                <strong class="TODO" >NOTHING</strong>
                            </li>
                        </ul>
                    </div>
                </template>
            </section>

            <section class="by-country">
                <h3>Browse studies by <strong>country</strong></h3>
                <template v-for="country in countries" :key="country.id">
                    <h4 class="font-semibold mt-4">{{ country.prettyName }}</h4>
                    <ul>
                        <li v-for="study in filterStudiesByCountry(country.id)" :key="study.fileName" class="text-blue-600 dark:text-blue-500 hover:underline">
                            <RouterLink :to="`/study?id=${study.fileName}`">{{ study.title }}</RouterLink>
                        </li>
                    </ul>
                </template> 
            </section>
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

h3 {
    @apply text-xl
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
        max-width: 50%;
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