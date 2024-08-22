<template>
  <article>
    <SectionTitle>
      <h1>What is the contribution of the value chain to <strong>economic growth</strong>?</h1>
    </SectionTitle>
    <p>
      The economic analysis aims at measuring and interpreting the <strong>profitability and economic sustainability</strong>
      of the value chain operations for all the actors directly involved. Its purpose is to inform on the 
      economic <strong>effects</strong> of the value chain within the national economy in terms of 
      <strong>growth generation</strong> and <strong>distribution of incomes</strong>. 
      It also assesses its <strong>viability</strong> within the global economy.  
    </p>

    <BenefitCostRatio :studyData="studyData" :currency="currency"/>
    <AddedValue :studyData="studyData" :currency="currency"/>
    <PublicFinances :studyData="studyData" :currency="currency"/>
      
    <BalanceOfTrade :study-data="studyData" :currency="currency" />

    <AbroadSelling :studyData="studyData"/>
    <AttachmentLink :studyId="studyData.id" attachmentType="eco.xlsx" />
  </article>
</template>

<script setup>
import BenefitCostRatio from './study/economic-growth/BenefitCostRatio.vue'
import AddedValue from './study/economic-growth/AddedValue.vue'
import PublicFinances from './study/economic-growth/PublicFinances.vue'
import SectionTitle from '@typography/SectionTitle.vue'
import BalanceOfTrade from './study/economic-growth/BalanceOfTrade.vue'
import AbroadSelling from './study/economic-growth/AbroadSelling.vue'
import AttachmentLink from '@components/pdf/AttachmentLink.vue'

const props = defineProps({
  studyData: Object,
  currency: String
})
</script>

<style scoped lang="scss"></style>
