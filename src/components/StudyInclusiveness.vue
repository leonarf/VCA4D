<template>
  <article class="mt-8">
    <SectionTitle>
      <h1>Is the value chain economic growth <strong>inclusive</strong>?</h1>
    </SectionTitle>
    <p>
      To build an image of the inclusiveness of the value chain, a VCA4D study highlights how the
      value chain organisation and governance involve the various stakeholders and how the incomes
      and employment generated are distributed among social groups. The value chain specific impact
      on vulnerable groups such as subsistence-oriented farmers, smallholders, women, youth, and
      marginalised people (landless rural workers, minority communities…) is closely documented.
      Please also visit
      <RouterLink
        :to="`/study?id=${studyData.id}&view=social-sustainability&currency=${studyData.targetCurrency}`"
        :class="{ disabled: !studyData.socialData }"
        class="text-blue-600"
      >
        our page on Social Sustainability
      </RouterLink>
    </p>

    <QuestionTitle>How is <strong>income</strong> distributed among actors in the value chain?</QuestionTitle>
    <p>
      Income distribution is a tangible indicator of how households and businesses take advantage of
      the value chain operations. The share of Net Operating Profits across value chain actors helps
      indicate the disadvantaged actors who benefit less from the value chain activities.
    </p>
    <p>
      Actors that are in small numbers but receive a significant share of the value chain Net
      Operating Profit are in a stronger position of negotiation in front of those more divided.
    </p>
    <p>
      It is to be noted that the Net Operating Profit is only related to the value chain activity
      and does not include any other revenue from any other activities.
    </p>

    <div class="flex flex-col gap-y-4 mt-4">
      <NetOperatingProfit :studyData="studyData" :currency="currency" />
      <NetOperatingProfitPerActor :studyData="studyData" :currency="currency" />
    </div>

    <QuestionTitle class="mt-8">How is <strong>employment</strong> distributed across the value chain?</QuestionTitle>
    <p>
      Employment data only relate to waged Full Time Equivalent (FTE) jobs for this specific value chain.
      The informal family workforce at the agricultural production level is not accounted for.
    </p>
    <div class="flex flex-col gap-y-4 mt-4">
      <EmploymentDistributionActors :studyData="studyData" />
      <EmploymentDistributionJobs :studyData="studyData" />
    </div>

    <br />

    <QuestionTitle>
      What is the impact of the <strong>governance system</strong> on the income distribution?
    </QuestionTitle>
    <QuestionTitle>What percentage of the final price does the producer get?</QuestionTitle>
    <InfoTitle
      title="Share of farm gate price in final price"
      information="It is the share of domestic consumer price or FOB export price, in the case of export, in the final consumer price abroad (if possible)."
      class="mb-4 mt-8"
    />
    <div>
      <ShareOfFarmPrice
        v-if="hasPricesData"
        :studyData="studyData"
        :currency="currency"
        :data="props.studyData.ecoData.farmToFinalPricesRatio"
      />
      <NoDataBadge v-else />
    </div>
    <QuestionTitle>How equal is the income distribution along the value chain?</QuestionTitle>
    <InfoTitle
      title="Gini index"
      information="
        It is the value chain Gini Index indicating the level of equality of Net Operating Profit income distribution per individual actor in the value chain distribution across value chain actors.<br>
        A value chain Gini Index of zero indicates perfect equality.<br>
        On the other hand, an index close to one means that few actors in the value chain receive a greater part of the value chain aggregated Net Operating Profit income.
      "
      class="mb-4 mt-8"
    />
    <div class="mb-8">
      <GiniIndex
        v-if="studyData.ecoData.macroData?.giniIndex"
        :value="studyData.ecoData.macroData?.giniIndex"
      />
      <NoDataBadge v-else />
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SectionTitle from '@typography/SectionTitle.vue'
import EmploymentDistributionActors from './study/inclusiveness/EmploymentDistributionActors.vue'
import EmploymentDistributionJobs from './study/inclusiveness/EmploymentDistributionJobs.vue'
import NetOperatingProfit from './study/inclusiveness/NetOperatingProfit.vue'
import NetOperatingProfitPerActor from './study/inclusiveness/NetOperatingProfitPerActor.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import GiniIndex from './study/inclusiveness/GiniIndex.vue'
import ShareOfFarmPrice from './study/inclusiveness/ShareOfFarmPrice.vue'
import NoDataBadge from '@components/study/NoDataBadge.vue'
import QuestionTitle from '@components/study/QuestionTitle.vue'

const props = defineProps({
  studyData: Object,
  currency: String
})

const hasPricesData = computed(() => {
  if (!props.studyData.ecoData.farmToFinalPricesRatio) {
    return false
  }
  return props.studyData.ecoData.farmToFinalPricesRatio.length > 0
})
</script>

<style scoped lang="scss"></style>
