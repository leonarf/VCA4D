<template>
  <article>
    <SectionTitle>
      <h1>What is the contribution of the value chain to <strong>economic growth</strong>?</h1>
    </SectionTitle>
    <p>
      VCA4D analyses show not only the value chain's contribution to the national wealth and to the
      wealth in agriculture. The methodology has also developped data on the distribution of the net
      benefits across the various actors of the value chain, including the contribution left to the
      state budget, after public investment in the value chain.
    </p>

    <ReturnOnInvestment :studyData="studyData" :currency="currency"/>
    <AddedValue :studyData="studyData" :currency="currency"/>
    <PublicFinances :studyData="studyData" :currency="currency"/>
      
    <BalanceOfTrade :study-data="studyData" :currency="currency" />

    <AbroadSelling :studyData="studyData"/>
  </article>
</template>

<script setup>
import ReturnOnInvestment from './study/economic-growth/ReturnOnInvestment.vue'
import AddedValue from './study/economic-growth/AddedValue.vue'
import PublicFinances from './study/economic-growth/PublicFinances.vue'
import SectionTitle from '@typography/SectionTitle.vue'
import BalanceOfTrade from './study/economic-growth/BalanceOfTrade.vue'
import AbroadSelling from './study/economic-growth/AbroadSelling.vue'

const props = defineProps({
  studyData: Object,
  currency: String
})
</script>

<style scoped lang="scss"></style>
