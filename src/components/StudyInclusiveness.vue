<template>
    <article class="mt-8">
        <SectionTitle>
            <h1>Is the economic growth <strong>inclusive</strong>?</h1>
        </SectionTitle>
        <p>A value chain is inclusive in one country not only by the number of jobs created, but also considering these
            jobs' quality. The way the income is distributed across the value chain from the samll producers to the
            consumers also tell about the power dynamics and the policies that may be improved for more inclusiveness. For
            detailed information on the value chain's impact on the most vulnerable groups, like women and youth, please go
            directly to Social sustainability part (*link).</p>

        <h3 class="mt-8">How is <strong>employment</strong> distributed across the value chain?</h3>

        <p>Methodology</p>
        <p>Employment data only relate to full time equivalent jobs for this specific value chain and do not include total
            employment of each actor. In addition, the informal family workforce at the agricultural production level is not
            accounted for.</p>
        <EmploymentDistributionActors :studyData="studyData" class="mb-4 mt-8"/>
        <EmploymentDistributionJobs :studyData="studyData" class="mt-8"/>

        <h3>How is <strong>income</strong> distributed across actors of the value chain?</h3>
        <p>Actors that are in small numbers but receive an important share of the value chain's net operating profit are in
            a stronger position of negociation in front of actore that are more divided.</p>
        <p>NB: The income data only relate to this specific value chain: the data do not include any other income from any
            other activity.</p>
        <NetOperatingProfit :studyData="studyData" :currency="currency" class="mb-4 mt-8"/>
        <NetOperatingProfitPerActor :studyData="studyData" :currency="currency" class="mb-4 mt-8" />
        <br>

        <h3>What is the impact of the <strong>governance systems</strong> on income distribution?</h3>
        <InfoTitle title="Share of farm gate price in final price" class="mb-4 mt-8" :class="{'TODO': !hasPricesData}" />
        <ShareOfFarmPrice v-if="hasPricesData" :data="pricesData"/>
        <br />
        <InfoTitle title="Gini index" class="mb-4 mt-8" :class="{ 'TODO': !studyData.giniIndex}" />
        <GiniIndex v-if="studyData.giniIndex" :value="studyData.giniIndex"/>
    </article>
</template>

<script setup>
import SectionTitle from '@typography/SectionTitle.vue'
import EmploymentDistributionActors from './study/inclusiveness/EmploymentDistributionActors.vue'
import EmploymentDistributionJobs from './study/inclusiveness/EmploymentDistributionJobs.vue'
import NetOperatingProfit from './study/inclusiveness/NetOperatingProfit.vue'
import NetOperatingProfitPerActor from './study/inclusiveness/NetOperatingProfitPerActor.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import GiniIndex from './study/inclusiveness/GiniIndex.vue'
import ShareOfFarmPrice from './study/inclusiveness/ShareOfFarmPrice.vue'
import { computed } from 'vue'
import { useUtils } from '../utils/utils'

const props = defineProps({
    studyData: Object,
    currency: String
})

const { prettyAmount, convertAmount } = useUtils(props);

const hasPricesData = computed(() => {
    if (!props.studyData.ecoData.farmToFinalPricesRatio) {
        return false
    }
    return props.studyData.ecoData.farmToFinalPricesRatio.length > 0
})

const pricesData = computed(() => {
    if (!hasPricesData.value) {
        return null
    }
    return props.studyData.ecoData.farmToFinalPricesRatio.map(item => ({
        label: item.label,
        farm: prettyAmount.value(convertAmount.value(item.farmPrice)),
        final: prettyAmount.value(convertAmount.value(item.finalPrice)),
        ratio: item.farmPrice / item.finalPrice * 100
    }))
})

</script>

<style scoped lang="scss"></style>