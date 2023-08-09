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

    <AddedValue :studyData="studyData" :currency="currency"/>
    <ReturnOnInvestment :studyData="studyData" :currency="currency"/>
    <PublicFinances :studyData="studyData" :currency="currency"/>
      

    <h3 class="mt-12">What is the contribution of the value chain to the <strong>balance of trade</strong>?</h3>
    <p class="TODO">Missing data to be able to display graphic</p>

    <h3 class="mt-12">Is the value chain <strong>viable in the international economy</strong>?</h3>
    <p>
      The VCA4D methodology assesses for each value chain its dependency on international exports as
      well as its capacity to export on international markets with competitive price or on the
      contrary a higher remuneration of the actors supported by porection policies.
    </p>
    <h1>Is it financially attractive to sell abroad ?</h1>

    <InfoTitle title="Domestic resource cost ratio" class="mb-4" />
    <p class="TODO">Missing data to be able to display graphic</p>
    <InfoTitle title="Nominal protection Coefficient" information="Domestic price / Internation parity price"
      class="mb-4" />
    <p class="TODO">Missing data to be able to display graphic</p>
  </article>
</template>

<script setup>
import ReturnOnInvestment from './study/economic-growth/ReturnOnInvestment.vue'
import AddedValue from './study/economic-growth/AddedValue.vue'
import PublicFinances from './study/economic-growth/PublicFinances.vue'
import InfoTitle from '@typography/InfoTitle.vue'
import SectionTitle from '@typography/SectionTitle.vue'

const props = defineProps({
  studyData: Object,
  currency: String
})

</script>

<style scoped lang="scss"></style>
