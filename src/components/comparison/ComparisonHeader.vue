<template>
    <tr>
        <td></td>
        <td v-for="(study) in studies" :key="`${study.id}`">
            <div class="flex flex-col items-center gap-y-2"
            >
                <div v-if="study.id" class="flex flex-row items-center justify-center">
                    <LogoCountrySmall :iso-code="getStudyDetails(study).country_iso_code || 'gr'" />
                    <div>
                        {{ getStudyDetails(study).country_name }}
                    </div>
                </div>
                <Card :is-local="false" :is-open="false" :title="getProduct(study)">
                    <template v-slot:logo>
                        <LogoProductLarge :product-name="getProduct(study)"/>
                    </template>
                </Card>
            </div>
        </td>
    </tr>
</template>

<script setup>

import { slugify } from '@utils/format.js'
import { getCountry } from '@utils/data.js' 
import LogoCountrySmall from '@components/home/LogoCountrySmall.vue';
import LogoProductLarge from '@components/home/LogoProductLarge.vue';
import Card from '@components/home/Card.vue';
const props = defineProps({
    studies: Array,
})

const getProduct = (study) => {
    return study?.commodity?.toLowerCase()
}

const getStudyDetails = (study) => {
    return {
        country_name : getCountry(slugify(study?.country))?.prettyName,
        country_iso_code : getCountry(slugify(study?.country))?.iso,
    }
}

</script>

<style scoped lang="scss">
</style>
