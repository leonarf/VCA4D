<script setup>
import { RouterLink } from 'vue-router'
import Skeleton from '../components/Skeleton.vue'
import { onMounted, ref } from 'vue';
import jsonData from '../../data/data.json'
import MilkLogo from '../images/icons/products/milk.svg'
import PineappleLogo from '../images/icons/products/pineapple.svg'
import BananaLogo from '../images/icons/products/banana.svg'
import CoffeeLogo from '../images/icons/products/coffee.svg'
import MangoLogo from '../images/icons/products/mango.svg'
import CashewLogo from '../images/icons/products/cashew.svg'
import CocoaLogo from '../images/icons/products/cocoa.svg'
import BeefLogo from '../images/icons/products/beef.svg'
import CornLogo from '../images/icons/products/corn.svg'
import VanillaLogo from '../images/icons/products/vanilla.svg'
import EggLogo from '../images/icons/products/egg.svg'
import CottonLogo from '../images/icons/products/cotton.svg'
import PeanutLogo from '../images/icons/products/peanut.svg'
import PalmOilLogo from '../images/icons/products/palm-tree.svg'
import CassavaLogo from '../images/icons/products/cassava.svg'
import FishLogo from '../images/icons/products/fish.svg'
import DefaultLogo from '../images/icons/products/default.svg'

const studies = ref([])
const countries = ref([])
const continents = ref([])
const categories = ref([])

const geAllJsonData = () => {
    const localStudy = JSON.parse(localStorage.getItem('localStudyProperties'))
    if (!localStudy) {
        return jsonData
    }
    const category = jsonData.categories.find(category => category.prettyName === localStudy.category)
    return {
        ...jsonData,
        studies: [
            ...jsonData.studies,
            {
                category: category ? category.id : 'unknown',
                country: localStudy.country.toLowerCase(),
                id: localStudy.id,
                product: localStudy.commodity.toLowerCase(),
                title: ["Local", localStudy.commodity, localStudy.year].join(' '),
                year: localStudy.year,
                local: true
            }
        ]
    }
}

onMounted(async () => {
    const allJsonData = geAllJsonData()
    studies.value = allJsonData.studies
    countries.value = allJsonData.countries
    continents.value = [...new Set(countries.value.map(country => country.continent))] 
    categories.value = allJsonData.categories
})

const getStudiesByCategory = (studies, category) => {
    if (category === 'unknown') {
        const allProducts = jsonData.categories.reduce((array, curr) => array.concat(curr.commodities), [])
        return studies.filter(item => !allProducts.includes(item.product))
    }
    const productsForCategory = jsonData.categories.find(item => item.id === category).commodities
    return studies.filter(item => productsForCategory.includes(item.product));
}

const filterStudiesByCategory = (category) => {
    const filteredStudies = getStudiesByCategory(studies.value, category)
    return filteredStudies.sort((study1, study2) => {
        const productSort = study1.product.localeCompare(study2.product)
        if (productSort) {
            return productSort
        }
        return study1.country.localeCompare(study2.country)
    })
};

const countriesByContinent = (continent) => countries.value.filter(country => country.continent === continent).sort((country1, country2) => country1.prettyName.localeCompare(country2.prettyName))

const filterStudiesByCountry = (country) => {
  return studies.value.filter(item => item.country === country);
};

const getProductLogo = (product) => {
    switch(product) {
        case 'milk':
            return MilkLogo
        case 'banana':
            return BananaLogo
        case 'coffee':
            return CoffeeLogo
        case 'mango':
            return MangoLogo
        case 'cashew':
            return CashewLogo
        case 'cocoa':
            return CocoaLogo
        case 'beef':
            return BeefLogo
        case 'corn':
            return CornLogo
        case 'vanilla':
            return VanillaLogo
        case 'egg':
            return EggLogo
        case 'cotton':
            return CottonLogo
        case 'groundnut':
            return PeanutLogo
        case 'pineapple':
            return PineappleLogo
        case 'oil palm':
            return PalmOilLogo
        case 'cassava':
            return CassavaLogo
        case 'aquaculture tilapia':
        case 'aquaculture':
            return FishLogo
        default:
            return DefaultLogo
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

            <section>
                <h3>Browse studies by <strong>product</strong></h3>
                
                <template v-for="category in categories" :key="category.id">
                    <h4 :style="`margin-top: 48px; color: ${category.textColor};`">{{ category.prettyName }}</h4>
                    <div class="border-t-[13px] pt-4" :style="`border-color: ${category.color};`">
                        <ul class="flex flex-row flex-wrap gap-y-4">
                            <li v-for="study in filterStudiesByCategory(category.id)" :key="study.id" class="h-full mr-4">
                                <div class="flex flex-col items-center space-y-2 w-[130px]">
                                    <RouterLink :to="`/study?id=${study.local ? 'localStorage' : study.id}`">
                                        <div :class="`w-[130px] h-[130px] ${study.local ? 'bg-[#868686]' : 'bg-[#DFDFDF]'} flex flex-col items-center justify-evenly text-[#303030] px-8 rounded-lg`">
                                            <img 
                                            :src="getProductLogo(study.product)" 
                                            :alt="`Link to ${study.title} study`"
                                            style="height: 75px; width: 75px;"
                                            class="w-24"
                                            @error="setDefaultImage">
                                            <p class="font-semibold capitalize">{{ study.product }}</p>
                                        </div>
                                    </RouterLink>
                                    <p class="text-center">{{  study.country }} {{ study.year }}</p>
                                </div>
                            </li>
                            <li v-if="filterStudiesByCategory(category.id).length === 0">
                                <strong class="TODO" >NOTHING</strong>
                            </li>
                        </ul>
                    </div>
                </template>
            </section>

            <section>
                <h3>Browse studies by <strong>country</strong></h3>
                <div class="flex flex-row justify-evenly">
                <div v-for="continent in continents" :key="continent">
                    <div class="text-xl font-bold">{{ continent }}</div>
                    <div v-for="country in countriesByContinent(continent)" :key="country.id">
                        <h4 class="mt-4">{{ country.prettyName }}</h4>
                        <ul>
                            <li v-for="study in filterStudiesByCountry(country.id)" :key="study.id" class="text-blue-600 dark:text-blue-500 hover:underline">
                                <RouterLink :to="`/study?id=${study.id}`">{{ study.title + " " + study.year }}</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div> 
            </div>
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