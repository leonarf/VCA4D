<template>
  <section>
    <h3 class="section-title mt-12">By <strong>country</strong></h3>
    <template v-for="continent in continents" :key="continent">
      <ByContinent
        class="continent"
        :continent="continent"
        :studies="getStudiesByContinent(continent)"
        :countries="countries"
      />
    </template>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import ByContinent from './ByContinent.vue';


const props = defineProps({
    categories: Array,
    studies: Array,
    countries: Array,
})

const continents = computed(() => [...new Set(props.countries.map(country => country.continent))])

const getStudiesByContinent = (continent) => {
    const countries = props.countries.filter(country => country.continent === continent).map(country => country.id)
    return props.studies.filter(study => countries.includes(study.country))
}
</script>

<style scoped lang="scss">
.continent:not(:first-child) {
  margin-top: 48px;
}
.section-title {
  font-size: 28px;
}
</style>
