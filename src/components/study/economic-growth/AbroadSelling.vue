<template>
  <QuestionTitle>Is the value chain <strong>viable in the international economy</strong>?</QuestionTitle>
  <p>
    The VCA4D methodology assesses for each value chain its dependency on international exports as
    well as its capacity to export on international markets with competitive price or on the
    contrary a higher remuneration of the actors supported by protection policies.
  </p>
  <br />
  <h3>Is the value chain able to compete within the international market?</h3>

  <InfoTitle
    class="mb-4 mt-4"
    title="Domestic Resource Cost ratio (DRC)"
    information="
      The DRC measures the value of domestic factors necessary to gain one foreign currency unit.<br>
      DRC < 1 means that the value chain is viable in the global economy because
      the value of domestic factors which are consumed is lower than the value they produce, without any subventions on input and taxes on output
      (from the standpoint of the international markets and considering the present level of remuneration of domestic factors)."
  />
  <div>
    <DomesticResourceCostRatio
      v-if="studyData.ecoData.macroData?.domesticResourceCostRatio"
      :value="studyData.ecoData.macroData?.domesticResourceCostRatio"
    />
    <NoDataBadge v-else />
  </div>
  <br />
  <InfoTitle
    title="Nominal Protection Coefficient (NPC)"
    information="
      NPC assesses the international competitiveness by comparing the national and international prices of every value chain product.<br>
      A NPC > 1 means that the domestic value is higher than the international market price.
      Thus, the overall value chain remuneration is higher than it would be if applying international parity prices."
    class="mb-4"
  />
  <NominalProtectionCoefficient
    :value="studyData.ecoData.macroData?.nominalProtectionCoefficient"
  />
</template>

<script setup>
import InfoTitle from '@components/typography/InfoTitle.vue'
import DomesticResourceCostRatio from '@components/study/economic-growth/DomesticResourceCostRatio.vue'
import NominalProtectionCoefficient from '@components/study/economic-growth/NominalProtectionCoefficient.vue'
import QuestionTitle from '@components/study/QuestionTitle.vue'
import NoDataBadge from '@components/study/NoDataBadge.vue'

defineProps({
  studyData: Object
})
</script>
