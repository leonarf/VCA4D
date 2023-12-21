<template>
    <tr>
        <td></td>
        <td v-for="(study) in studies" :key="`${study.id}`">
            <div class="flex flex-col items-center gap-y-2"
            >
                <div class="flex flex-row items-center justify-center">
                    <LogoCountrySmall :iso-code="getCountry(slugify(study.country))?.iso || 'gr'" />
                    <div>
                        {{ getCountry(slugify(study.country))?.prettyName }}
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

</script>

<style scoped lang="scss">
</style>