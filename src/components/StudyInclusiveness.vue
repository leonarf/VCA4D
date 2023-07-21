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
        <p class="TODO">Number of actors : c'est le même graphique qu'en haut de la page, est-ce qu'on le remet vraiment?
        </p>

        <h3>What is the impact of the <strong>governance systems</strong> on income distribution?</h3>
        <InfoTitle title="Share of farm gate price in final price" class="mb-4 mt-8" />
        <p class="TODO">Missing data to be able to display graphic</p>
        <InfoTitle title="Gini index" class="mb-4 mt-8" />
        <p class="TODO">Missing data to be able to display graphic</p>
    </article>
</template>

<script setup>
import SectionTitle from '@typography/SectionTitle.vue'
import EmploymentDistributionActors from './study/inclusiveness/EmploymentDistributionActors.vue'
import EmploymentDistributionJobs from './study/inclusiveness/EmploymentDistributionJobs.vue'
import NetOperatingProfit from './study/inclusiveness/NetOperatingProfit.vue'
import NetOperatingProfitPerActor from './study/inclusiveness/NetOperatingProfitPerActor.vue'
import InfoTitle from '@typography/InfoTitle.vue'

const props = defineProps({
    studyData: Object,
    currency: String
})

</script>

<script>
//@ts-check

import '../types.js'
export default {
    name: 'StudyEconomicGrowth',
    props: ['studyData'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss"></style>