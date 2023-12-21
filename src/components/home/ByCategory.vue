<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getLink, getCompareProductLink } from '@utils/router'
import LogoCountrySmall from './LogoCountrySmall.vue';
import LogoCountryLarge from './LogoCountryLarge.vue';
import LogoProductLarge from './LogoProductLarge.vue';
import CardList from './CardList.vue'
import Section from './Section.vue';
import CardFooter from './CardFooter.vue';
import NumberBadge from './NumberBadge.vue';
import Card from './Card.vue';
import SubCardsList from './SubCardsList.vue'
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

const getCountry = countryId => props.countries.find(country => country.id === countryId)


</script>

<template>
    <template v-if="studies.length > 0">
        <Section :title="category.prettyName" :text-color="category.textColor" :border-color="category.color">
            <CardList>
                <li v-for="item in getStudiesByProduct()" :key="item.product">
                    <template v-if="item.studies.length === 1">
                        <Card
                            :link="getLink(item.studies[0], currency)"
                            :is-local="item.studies[0].local"
                            :title="item.product">
                            <template v-slot:logo>
                                <LogoProductLarge :product-name="item.product"
                                        :alt="`Link to ${item.studies[0].title} study`" />
                            </template>
                            <template v-slot:footer>
                                <CardFooter :text="getCountry(item.studies[0].country).prettyName ">
                                <template v-slot:logo>
                                <LogoCountrySmall :iso-code="getCountry(item.studies[0].country)?.iso || 'gr'" />
                                </template>
                            </CardFooter>
                            </template>
                        </Card>
                    </template>
                    <template v-else>
                        <Card
                            @click.stop="openedProduct === item.product ? openedProduct = null : openedProduct = item.product"
                            :is-local="false"
                            :is-open="openedProduct === item.product"
                            :title="item.product"
                            >
                            <template v-slot:logo>
                                <LogoProductLarge :product-name="item.product" />
                            </template>
                            <template v-slot:footer>
                                <SubCardsList v-if="openedProduct === item.product" 
                                :link="`/comparison/${getCompareProductLink(item.product)}`"
                                :linkTitle="`Compare all ${item.product} studies`">
                                    <Card v-for="study in item.studies" :key="study.id"
                                            :link="getLink(study, currency)"
                                            :is-local="study.local"
                                            :title="getCountry(study.country)?.prettyName">
                                        <template v-slot:logo>
                                            <LogoCountryLarge :iso-code="getCountry(study.country)?.iso || 'gr'" />
                                        </template>
                                    </Card>
                                </SubCardsList>
                            <CardFooter v-else text="countries">
                                <template v-slot:logo>
                                    <NumberBadge :value="item.studies.length" />
                                </template>
                            </CardFooter>
                            </template>
                        </Card>
                    </template>
                </li>
            </CardList>
        </Section>
    </template>
</template>

<style scoped lang="scss"></style>