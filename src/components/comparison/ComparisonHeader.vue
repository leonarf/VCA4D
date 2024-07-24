<template>
    <tr>
        <td></td>
        <td v-for="(study) in studiesWithDetails" :key="`${study.id}`">
            <div class="flex flex-col items-center gap-y-2"
            >
                <div v-if="study.id" class="flex flex-row items-center justify-center">
                    <CardFooter :text="study.country_name">
                        <template v-slot:logo>
                            <LogoCountrySmall :iso-code="study['country_iso_code'] || 'gr'" />
                        </template>
                    </CardFooter>
                </div>
                <Card
                    :link="getLink(study, 'LOCAL')"
                    :is-local="false"
                    :is-open="false"
                    :title="study.product.prettyName">
                    <template v-slot:logo>
                        <LogoProductLarge :product-name="study.product.id"/>
                    </template>
                </Card>
            </div>
        </td>
    </tr>
</template>

<script setup>

import { computed } from 'vue';
import { slugify } from '@utils/format.js'
import { getCountry, getProduct } from '@utils/data'
import { getLink } from '@utils/router'
import LogoCountrySmall from '@components/home/LogoCountrySmall.vue';
import LogoProductLarge from '@components/home/LogoProductLarge.vue';
import Card from '@components/home/Card.vue';
import CardFooter from '@components/home/CardFooter.vue';
const props = defineProps({
    studies: Array,
})

const studiesWithDetails = computed(() => {
    return props.studies.map(getStudyDetails);
})

const getStudyDetails = (study) => {
    const country_iso_code = getCountry(slugify(study?.country))?.iso || "gr";
    const productKey = study?.commodity?.toLowerCase();

    return {
        ...study,
        country_name : getCountry(slugify(study?.country))?.prettyName,
        country_iso_code: country_iso_code,
        product: getProduct(productKey)
    }
}

</script>

<style scoped lang="scss">
</style>
