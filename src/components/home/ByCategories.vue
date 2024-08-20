<script setup>
import QuestionTitle from '@components/study/QuestionTitle.vue';
import ByCategory from './ByCategory.vue'

const props = defineProps({
    categories: Array,
    studies: Array,
    countries: Array,
})

const getStudiesByCategory = (studies, category) => {
    if (category === 'unknown') {
        const allProducts = props.categories.reduce((array, curr) => array.concat(curr.commodities), [])
        return studies.filter(item => !allProducts.includes(item.product))
    }
    const productsForCategory = props.categories.find(item => item.id === category).commodities
    return studies.filter(item => productsForCategory.includes(item.product));
}

const filterStudiesByCategory = (category) => {
    const filteredStudies = getStudiesByCategory(props.studies, category)
    return filteredStudies.sort((study1, study2) => {
        const productSort = study1.product.localeCompare(study2.product)
        if (productSort) {
            return productSort
        }
        return study1.country.localeCompare(study2.country)
    })
};

</script>

<template>
    <section>
        <QuestionTitle>By <strong>product</strong></QuestionTitle>
        <template v-for="(category) in categories" :key="category.id">
            <ByCategory :studies="filterStudiesByCategory(category.id)" :countries="countries" :category="category"/>
        </template>
    </section>
</template>

<style scoped lang="scss">
</style>
