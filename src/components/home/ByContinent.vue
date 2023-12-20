<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getLink } from '@utils/router'
import LogoProductLarge from './LogoProductLarge.vue';
import LogoProductSmall from './LogoProductSmall.vue';
import LogoCountryLarge from './LogoCountryLarge.vue';
import Section from './Section.vue';
import CardList from './CardList.vue';
import CardFooter from './CardFooter.vue';
import NumberBadge from './NumberBadge.vue';
import Card from './Card.vue';
import SubCardsList from './SubCardsList.vue';
const props = defineProps({
    continent: String,
    studies: Array,
    countries: Array,
    currency: String
})

const CONTINENT_BG_COLORS = {
    "Europe": "#0073CF",
    "Africa": "#5F8A64",
    "America": "#C46D4D",
    "Asia - Pacific": "#F6E065"
}
const CONTINENT_TEXT_COLORS = {
    "Europe": "#0073CF",
    "Africa": "#5F8A64",
    "America": "#C46D4D",
    "Asia - Pacific": "#806C00"
}

const openedCountry = ref(null)

const closeCountry = () => {
    openedCountry.value = null
}
onMounted(() => {
    document.addEventListener('click', closeCountry);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeCountry);
})

const getStudiesByCountry = () => {
    const countries = [...new Set(props.studies.map(study => study.country))]
    countries.sort((a, b) => a.localeCompare(b))
    return countries.map(country => ({
        country,
        studies: props.studies.filter(study => study.country === country)
    }))
}

const getCountry = (countryId) => {
    return props.countries.find(country => country.id === countryId)
}

</script>

<template>
    <Section :title="continent" :text-color="CONTINENT_TEXT_COLORS[continent]" :border-color="CONTINENT_BG_COLORS[continent]">
        <CardList>
            <li v-for="item in getStudiesByCountry()" :key="item.country">
                <template v-if="item.studies.length === 1">
                    <Card 
                        :link="getLink(item.studies[0], currency)"
                        :is-local="item.studies[0].local"
                        :title="getCountry(item.country).prettyName">
                        <template v-slot:logo>
                            <LogoCountryLarge :isoCode="getCountry(item.country).iso || 'gr'" />
                        </template>
                        <template v-slot:footer>
                            <CardFooter :text="item.studies[0].title">
                                <template v-slot:logo>
                                    <LogoProductSmall :product-name="item.studies[0].product" :alt="`Link to ${item.studies[0].title} study`"/>
                                </template>
                            </CardFooter>
                        </template>
                    </Card>
                </template>
                <template v-else>
                    <Card
                        @click.stop="openedCountry === item.country ? openedCountry = null : openedCountry = item.country"
                        :is-local="false"
                        :is-open="openedCountry === item.country"
                        :title="getCountry(item.country).prettyName"
                        >
                        <template v-slot:logo>
                            <LogoCountryLarge :iso-code="getCountry(item.country).iso || 'gr'" />
                        </template>
                        <template v-slot:footer>
                            <SubCardsList v-if="openedCountry === item.country"
                                :link="`/comparison/${encodeURIComponent(JSON.stringify({country: item.country}))}`"
                                :linkTitle="`Compare all ${item.country} studies`">
                            <Card v-for="study in item.studies" :key="study.id"
                                :link="getLink(study, currency)"
                                :is-local="study.local"
                                :title="study.title">
                                <template v-slot:logo>
                                    <LogoProductLarge :product-name="study.product" :alt="`Link to ${study.title} study`" />
                                </template>
                            </Card>
                        </SubCardsList>
                        <CardFooter v-else text="studies">
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

<style scoped lang="scss"></style>