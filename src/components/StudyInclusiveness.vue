<template>
    <article class="mt-8">
        <SectionTitle>
            <h1>Is the Value Chain economic growth <strong>inclusive</strong>?</h1>
        </SectionTitle>
        <p>
            To build an image of the inclusiveness of the value chain, a VCA4D study 
            highlights how the Value Chain organisation and governance involve the various 
            stakeholders and how the incomes and employment generated are distributed 
            among social groups. The value chain specific impact on vulnerable groups 
            such as subsistence-oriented farmers, smallholders, women, youth, and 
            marginalised people (landless rural workers, minority communities…) is 
            closely documented. Please also visit
            <RouterLink 
                :to="`/study?id=${studyData.id}&view=social-sustainability&currency=${studyData.targetCurrency}`"
                :class="{ disabled: !studyData.socialData}"
                class="text-blue-600"
            >
                our page on Social Sustainability
            </RouterLink>
        </p>

        <QuestionTitle>How is <strong>income</strong> distributed across actors of the value chain?</QuestionTitle>
        <p>Income distribution is a tangible indicator of how households and businesses 
            take advantage of the Value chain operations. The share of Net Operating Profits 
            across Value chain actors helps indicate the disadvantaged actors who benefit less 
            from the Value chain activities.</p>
        <p>Actors that are in small numbers but receive a significant 
            share of the Value chain Net Operating Profit are in a stronger position of negotiation in 
            front of those more divided.</p>
        <p>It is to be noted that the Net Operating Profit is only related 
            to the Value chain activity and does not include any other revenue from any other activities.</p>
        
        <div class="flex flex-col gap-y-4 mt-4">
            <NetOperatingProfit :studyData="studyData" :currency="currency"/>
            <NetOperatingProfitPerActor :studyData="studyData" :currency="currency" />
        </div>

        <QuestionTitle class="mt-8">How is <strong>employment</strong> distributed across the value chain?</QuestionTitle>
        <p>Employment data only relate to full time equivalent jobs for this specific value chain and do not include total
            employment of each actor. In addition, the informal family workforce at the agricultural production level is not
            accounted for.</p>
        <div class="flex flex-col gap-y-4 mt-4">
            <EmploymentDistributionActors :studyData="studyData"/>
            <EmploymentDistributionJobs :studyData="studyData"/>
        </div>

        <br>

        <QuestionTitle>What is the impact of the <strong>governance system</strong> on the income distribution?</QuestionTitle>
        <InfoTitle
            title="Share of farm gate price in final price"
            information="It is the share of domestic consumer price or FOB export price, in the case of export, in the final consumer price abroad (if possible)."
            class="mb-4 mt-8"
        />
        <div>
            <ShareOfFarmPrice v-if="hasPricesData" :data="pricesData"/>
            <NoDataBadge v-else/>
        </div>
        <br />
        <InfoTitle
            title="Gini index"
            information="Explanation for Gini Index: It is the Value chain Gini Index indicating the level of equality of Net Operating Profit income distribution per individual actor in the Value chain distribution across Value chain actors. A Value chain Gini Index of zero indicates perfect equality while an index close to one refers to a significant inequality where few actors in the Value chain receive a greater part of the Value chain aggregated Net Operating Profit income."
            class="mb-4 mt-8"
        />
        <div class="mb-8">
            <GiniIndex v-if="studyData.ecoData.macroData?.giniIndex" :value="studyData.ecoData.macroData?.giniIndex"/>
            <NoDataBadge v-else/>
        </div>
    </article>
</template>

<script setup>
import SectionTitle from '@typography/SectionTitle.vue'
import { RouterLink } from "vue-router";
import EmploymentDistributionActors from './study/inclusiveness/EmploymentDistributionActors.vue'
import EmploymentDistributionJobs from './study/inclusiveness/EmploymentDistributionJobs.vue'
import NetOperatingProfit from './study/inclusiveness/NetOperatingProfit.vue'
import NetOperatingProfitPerActor from './study/inclusiveness/NetOperatingProfitPerActor.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import GiniIndex from './study/inclusiveness/GiniIndex.vue'
import ShareOfFarmPrice from './study/inclusiveness/ShareOfFarmPrice.vue'
import NoDataBadge from '@components/study/NoDataBadge.vue';
import QuestionTitle from "@components/study/QuestionTitle.vue"
import { computed } from 'vue'
import { useCurrencyUtils } from '@utils/format'
import { LOCAL_STORAGE_ID } from '@utils/data'


const props = defineProps({
    studyData: Object,
    currency: String
})

const { prettyAmount, convertAmount } = useCurrencyUtils(props);

const hasPricesData = computed(() => {
    if (!props.studyData.ecoData.farmToFinalPricesRatio) {
        return false
    }
    return props.studyData.ecoData.farmToFinalPricesRatio.length > 0
})
const isLocalStudy = computed(() => {
    return studyId === LOCAL_STORAGE_ID;
})


const pricesData = computed(() => {
    if (!hasPricesData.value) {
        return null
    }
    return props.studyData.ecoData.farmToFinalPricesRatio.map(item => ({
        label: item.label,
        farmProduct: item.farmProduct,
        endProducts: item.endProducts,
        farm: prettyAmount.value(convertAmount.value(item.farmPrice)),
        final: prettyAmount.value(convertAmount.value(item.endPrice)),
        ratio: item.farmPrice / item.endPrice
    }))
})

</script>

<style scoped lang="scss"></style>
