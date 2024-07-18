<template>
	<QuestionTitle>Is the value chain <strong>viable in the international economy</strong>?</QuestionTitle>
	    <p>
	      The VCA4D methodology assesses for each value chain its dependency on international exports as
	      well as its capacity to export on international markets with competitive price or on the
	      contrary a higher remuneration of the actors supported by porection policies.
	    </p>
	    <br>
	    <h3>Is it financially attractive to sell abroad ?</h3>
	
	    <InfoTitle title="Domestic resource cost ratio" class="mb-4" :class="{'TODO': !studyData.ecoData.macroData?.domesticResourceCostRatio}" />
	    <DomesticResourceCostRatio v-if="studyData.ecoData.macroData?.domesticResourceCostRatio" :value="studyData.ecoData.macroData?.domesticResourceCostRatio" />
	    <br>
	    <InfoTitle title="Nominal protection Coefficient" information="Domestic price / Internation parity price"
	      class="mb-4" />
	    <NominalProtectionCoefficient :value="studyData.ecoData.macroData?.nominalProtectionCoefficient" />
</template>

<script setup>
import InfoTitle from '@components/typography/InfoTitle.vue';
import DomesticResourceCostRatio from "@components/study/economic-growth/DomesticResourceCostRatio.vue";
import NominalProtectionCoefficient from "@components/study/economic-growth/NominalProtectionCoefficient.vue";
import QuestionTitle from '@components/study/QuestionTitle.vue'

defineProps({
	studyData: Object
})
</script>
