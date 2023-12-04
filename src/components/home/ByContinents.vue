<script setup>
import { computed } from 'vue';
import ByContinent from './ByContinent.vue';


const props = defineProps({
    categories: Array,
    studies: Array,
    countries: Array,
    currency: String
})

const continents = computed(() => [...new Set(props.countries.map(country => country.continent))])

const getStudiesByContinent = (continent) => {
    const countries = props.countries.filter(country => country.continent === continent).map(country => country.id)
    return props.studies.filter(study => countries.includes(study.country))
}
</script>

<template>
    <section>
        <h3>Browse studies by <strong>country</strong></h3>
        <template v-for="continent in continents" :key="continent">
            <ByContinent :continent="continent" :studies="getStudiesByContinent(continent)" :countries="countries" :currency="currency"/>
        </template>
    </section>
</template>

<style scoped lang="scss">
</style>