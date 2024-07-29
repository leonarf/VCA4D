<template>
    <tr>
        <td></td>
        <td v-for="(study) in studiesWithDetails" :key="`${study.id}`">
            <div class="study-box">
                <div class="card-box">
                    <Card
                        :link="getLink(study, 'LOCAL')"
                        :is-local="false"
                        :is-open="false"
                        :title="study.product.prettyName">
                        <template v-slot:logo>
                            <LogoProductLarge :product-name="study.product.id"/>
                        </template>
                    </Card>
                    <a v-if="IS_COMPARISON_V2_ACTIVATED" class="remove-button" @click="removeStudy(study.id)">
                        <Svg :svg="CrossLogo"/>
                    </a>
                </div>
                <div v-if="study.id" class="footer">
                    <CardFooter :text="study.country_name">
                        <template v-slot:logo>
                            <LogoCountrySmall :iso-code="study['country_iso_code'] || 'gr'" />
                        </template>
                    </CardFooter>
                </div>
            </div>
        </td>
        <td class="add-studies">
            <AddStudiesButton
                v-if="IS_COMPARISON_V2_ACTIVATED"
                :currentStudySelection="studiesWithDetails.map(study => study.id)"
                @select-studies="emits('select-studies', $event)"
            />
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
import Svg from '@components/Svg.vue';
import AddStudiesButton from '@components/comparison/AddStudiesButton.vue';
import CrossLogo from '../../images/icons/cross.svg'

const IS_COMPARISON_V2_ACTIVATED = false;
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

const emits = defineEmits(["select-studies"]);

function removeStudy(studyIdToRemove) {
    const currentStudyIds = props.studies.map(study => study.id);
    const newStudySelection = currentStudyIds.filter(studyId => studyId !== studyIdToRemove);
    emits("select-studies", newStudySelection);
}

</script>

<style scoped lang="scss">
.study-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    height: 200px;

    .card-box {
        position: relative;

        .remove-button {
            width: 20px;
            height: 20px;
            padding: 5px;
            border-radius: 100%;
            background-color: #868686;
            color: white;
            cursor: pointer;

            position: absolute;
            top: -5px;
            right: -5px;

            &:hover {
                background-color: #ffac9e;
            }
        }
    }

    .footer {
        display: flex;
        width: 115px;
    }
}
.add-studies {
    display: flex;
    padding: 30px;

}
</style>
