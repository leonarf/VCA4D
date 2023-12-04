<script setup>
import { RouterLink } from 'vue-router'
import MilkLogo from '@images/icons/products/milk.svg'
import PineappleLogo from '@images/icons/products/pineapple.svg'
import BananaLogo from '@images/icons/products/banana.svg'
import CoffeeLogo from '@images/icons/products/coffee.svg'
import MangoLogo from '@images/icons/products/mango.svg'
import CashewLogo from '@images/icons/products/cashew.svg'
import CocoaLogo from '@images/icons/products/cocoa.svg'
import BeefLogo from '@images/icons/products/beef.svg'
import CornLogo from '@images/icons/products/corn.svg'
import VanillaLogo from '@images/icons/products/vanilla.svg'
import EggLogo from '@images/icons/products/egg.svg'
import CottonLogo from '@images/icons/products/cotton.svg'
import PeanutLogo from '@images/icons/products/peanut.svg'
import PalmOilLogo from '@images/icons/products/palm-tree.svg'
import CassavaLogo from '@images/icons/products/cassava.svg'
import FishLogo from '@images/icons/products/fish.svg'
import DefaultLogo from '@images/icons/products/default.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
const props = defineProps({
    studies: Array,
    countries: Array,
    currency: String,
    category: Object
})

const openedProduct = ref(null)

const closeProduct = () => {
    openedProduct.value = null
}
onMounted(() => {
    document.addEventListener('click', closeProduct);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeProduct);
})

const getStudiesByProduct = () => {
    const products = [... new Set(props.studies.map(study => study.product))]
    return products.map(product => ({
        product,
        studies: props.studies.filter(study => study.product === product)
    }))
}

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

const getCountry = countryId => props.countries.find(country => country.id === countryId)

const getLink = (study) => `/study?id=${study.local ? 'localStorage' : study.id}&currency=${props.currency}`

</script>

<template>
    <template v-if="studies.length > 0">
        <h4 :style="`margin-top: 48px; color: ${category.textColor};`">{{ category.prettyName }}</h4>
        <div class="border-t-[13px] pt-4" :style="`border-color: ${category.color};`">
            <ul class="flex flex-row flex-wrap gap-y-4 gap-x-6">
            <li v-for="item in getStudiesByProduct()" :key="item.product">
                <template v-if="item.studies.length === 1">
                    <div class="card min-h-[180px]">
                        <RouterLink :to="getLink(item.studies[0])" class="w-[150px]">
                            <div :class="`card-icon ${item.studies[0].local ? 'bg-[#868686]' : 'bg-[#DFDFDF] hover:bg-[#CFCFCF]'}`">
                                <img 
                                :src="getProductLogo(item.product)" 
                                :alt="`Link to ${item.studies[0].title} study`"
                                style="height: 75px; width: 75px;"
                                class="w-24"
                                @error="setDefaultImage">
                                <p class="font-semibold capitalize">{{ item.product }}</p>
                            </div>
                        </RouterLink>
                        <div class="flex flex-row w-full">
                            <div :class="`fib fi-${getCountry(item.studies[0].country).iso || 'gr'} w-[1.75rem] h-[1.75rem] bg-cover rounded-full mr-2`"></div>
                            <div class="max-w-[112px]">{{  getCountry(item.studies[0].country).prettyName  }}</div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="card min-h-[180px] relative" @click.stop="openedProduct === item.product ? openedProduct = null : openedProduct = item.product">
                        <div :class="`cursor-pointer card-icon ${openedProduct === item.product ? 'bg-[#9B9B9B]' : 'bg-[#DFDFDF] hover:bg-[#CFCFCF]'}`">
                            <img 
                            :src="getProductLogo(item.product)" 
                            style="height: 75px; width: 75px;"
                            class="w-24"
                            @error="setDefaultImage">
                            <p class="font-semibold capitalize">{{ item.product }}</p>
                        </div>
                        <div v-if="openedProduct === item.product" 
                        class="absolute top-[145px] bg-[#F0F0F0] p-4 rounded-lg text-white z-50">
                            <div class="flex flex-row gap-x-4">
                                <div v-for="study in item.studies" :key="study.id" class="card">
                                    <RouterLink :to="getLink(study)" class="w-[150px]">
                                        <div :class="`card-icon ${study.local ? 'bg-[#868686]' : 'bg-[#DFDFDF]'}`">
                                            <div :class="`fib fi-${getCountry(study.country)?.iso || 'gr'} w-[3.5rem] h-[3.5rem] bg-cover rounded-full`"></div>
                                            <div class="font-semibold capitalize max-h-[45px] text-md">{{  getCountry(study.country)?.prettyName }}</div>
                                        </div>
                                    </RouterLink>
                                </div>
                            </div>    
                        </div>
                        <div v-else class="flex flex-row w-full justify-start">
                            <div class="bg-[#6C6C6C] text-white w-[1.75rem] h-[1.75rem] text-center rounded-full text-sm leading-[1.75rem] font-semibold mr-2">{{  item.studies.length }}</div>
                            countries
                        </div>
                    </div>
                </template>
            </li>                
        </ul>
        </div>
    </template>
</template>

<style scoped lang="scss">

.card {
    @apply flex flex-col items-center space-y-1 w-[150px]
}

.card-icon {
    @apply flex flex-col items-center justify-evenly text-[#303030] px-2 text-center rounded-lg w-full h-[140px] pt-4 pb-2
}
</style>