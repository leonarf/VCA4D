<template>
  <div v-for="(part, index) in studyData.socialData" :key="part.title">
    <h2 :id="`social_anchor_${index + 1}`" class="text-xl text-[#151515] relative">
      <InfoTitle :title="part.title" :information="getTooltipText(part.title)" />
    </h2>
    <SocialDetailsGroup v-for="group in part.groups" :key="group.title" :group="group" />
  </div>
</template>

<script setup>
import SocialDetailsGroup from './SocialDetailsGroup.vue'
import InfoTitle from '@typography/InfoTitle.vue'

const props = defineProps({
  studyData: Object
})

let tooltipTexts = {
    "1. WORKING CONDITIONS": `This social domain informs on how the interaction between the VC actors and the general environment
        contributes to improving or degrading the situation of the various social groups and types of actors based on the main themes:
        respect of international norms, respect of contracts, risks of discrimination and forced labour,
        job safety, attractiveness, and child labour and education.`,
    "2. LAND & WATER RIGHTS":`This social domain informs on how the interaction between the VC actors and the general environment
            contributes to improving or degrading the situation of the various social groups and types of actors based on the main themes:
            adherence to and application of Voluntary Guidelines on the Responsible Governance of Tenure of Land and Fisheries and Forests (VGGT),
            equity and security of access to land/water resources, transparency of procedures,
            consultation, arbitration procedures, compensation procedures, etc.`,
    "3. GENDER EQUALITY": `This social domain informs on how the interaction between the VC actors and the general environment
            contributes to improving or degrading the situation of the various social groups and types of actors based on the main themes:
            inclusion/exclusion of women/vulnerable groups in certain activities, access to resources, goods and services
            (land, credit, extension services, inputs, etc.), participation in decision-making (on activities, organisation, income, etc.),
            responsibility and empowerment in collective processes, and strenuous working conditions.`,
    "4. FOOD AND NUTRITION SECURITY": `This social domain informs on how the interaction between the VC actors and the general environment
        contributes to improving or degrading the situation of the various social groups and types of actors based on the main themes:
        availability and accessibility of food, utilisation and nutritional adequacy, stability of supply and price.`,
    "5. SOCIAL CAPITAL": `This social domain informs on how the interaction between the VC actors and the general environment
        contributes to improving or degrading the situation of the various social groups and types of actors based on the main themes:
        strength and representativeness of producers’ organisations, information sharing, level of trust among actors,
        participation in decisions and community activities, and taking traditional practices into account.`,
    "6. LIVING CONDITIONS": `This social domain informs on how the interaction between the VC actors and the general environment
        contributes to improving or degrading the situation of the various social groups and types of actors based on the main themes:
        the access to facilities and services for health, water and sanitation, housing, education and training;
        and (ii) the quality of these infrastructures and services`,
}

function getTooltipText(partName) {
    console.log(partName)
    return tooltipTexts[partName]
}
</script>

<style scoped lang="scss">
h2::before {
  content: '';
  width: 90%;
  height: 1.2rem;
  border-bottom: solid 4px #151515;
  position: absolute;
  bottom: 0;
}
</style>
