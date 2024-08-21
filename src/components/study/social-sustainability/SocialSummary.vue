<template>
  <div>
    <h1>Is the value chain socially sustainable?</h1>
    <p>
      The analysis of social sustainability focuses on assessing established and potential
      consequences of the value chain operations in an array of six domains of importance for
      decision makers because they convey key concerns of development:
      <strong>Working Conditions</strong>, <strong>Land and Water Rights</strong>,
      <strong>Gender Equality</strong>, <strong>Food and Nutrition Security</strong>,
      <strong>Social Capital</strong>, and <strong>Living Conditions</strong>.
    </p>
    <p>
      The purpose of the social analysis is to inform on how the interaction between the value chain actors
      and the general social environment contributes to
      <strong>improving or degrading the situation of the various social groups and types of actors</strong>.
    </p>
    <p>
      The four levels of social sustainability are illustrated by different colours in the chart:
      <b :style="{ backgroundColor: getSocialScoreColor(4) }">high (green)</b>,
      <b :style="{ backgroundColor: getSocialScoreColor(3) }">substantial (yellow)</b>,
      <b :style="{ backgroundColor: getSocialScoreColor(2) }">moderate/low (orange)</b>,
      <b :style="{ backgroundColor: getSocialScoreColor(1) }">not at all (red)</b>.
    </p>
    <div class="grid grid-cols-3 w-full gap-2">
      <div class="row-span-2 self-start xl:self-end">
        <SummaryBlock
          title="Living conditions"
          :anchor="6"
          :average-value="getSocialAverageGroup(studyData.socialData[5])"
        >
          <SummaryBlockQuestion :question="questionLivingHealth"> </SummaryBlockQuestion>
          <SummaryBlockQuestion :question="questionLivingEducation"> </SummaryBlockQuestion>
        </SummaryBlock>
      </div>
      <div>
        <SummaryBlock
          title="Working conditions"
          :anchor="1"
          :average-value="getSocialAverageGroup(studyData.socialData[0])"
        >
          <SummaryBlockQuestion :question="workingConditionsHighlightQuestion1"> </SummaryBlockQuestion>
          <SummaryBlockQuestion :question="workingConditionsHighlightQuestion2"> </SummaryBlockQuestion>
        </SummaryBlock>
      </div>
      <div class="row-span-2 self-start xl:self-end">
        <SummaryBlock
          title="Land &amp; water rights"
          :anchor="2"
          :average-value="getSocialAverageGroup(studyData.socialData[1])"
        >
          <SummaryBlockQuestion :question="questionVGGT"> </SummaryBlockQuestion>
          <SummaryBlockQuestion :question="questionParticipation"> </SummaryBlockQuestion>
        </SummaryBlock>
      </div>
      <div class="row-span-2">
        <div class="w-full h-[400px]">
          <SocialRadar :study-data="studyData" />
        </div>
      </div>
      <div class="row-span-2 self-end xl:self-start">
        <SummaryBlock
          title="Social capital"
          :anchor="5"
          :average-value="getSocialAverageGroup(studyData.socialData[4])"
        >
          <SummaryBlockQuestion :question="questionFarmerParticipation"> </SummaryBlockQuestion>
          <SummaryBlockQuestion :question="questionFarmerInformation"> </SummaryBlockQuestion>
        </SummaryBlock>
      </div>
      <div class="row-span-2 self-end xl:self-start">
        <SummaryBlock
          title="Gender equality"
          :anchor="3"
          :average-value="getSocialAverageGroup(studyData.socialData[2])"
        >
          <SummaryBlockQuestion :question="questionWomenRights"> </SummaryBlockQuestion>
          <SummaryBlockQuestion :question="questionWomenIncome"> </SummaryBlockQuestion>
        </SummaryBlock>
      </div>
      <div class="">
        <SummaryBlock
          title="Food &amp; nutrition security"
          :anchor="4"
          :average-value="getSocialAverageGroup(studyData.socialData[3])"
        >
          <SummaryBlockQuestion :question="questionFoodIncrease"> </SummaryBlockQuestion>
          <SummaryBlockQuestion :question="questionFoodIncome"> </SummaryBlockQuestion>
        </SummaryBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SocialRadar from './SocialRadar.vue'
import SummaryBlock from './SummaryBlock.vue'
import SummaryBlockQuestion from './SummaryBlockQuestion.vue'
import { getSocialAverageGroup } from '@utils/misc.js'
import { getSocialScoreColor } from '@utils/colors.js'

const props = defineProps({
  studyData: Object
})

const workingConditionsHighlightQuestion1 = computed(() => props.studyData.socialData[0].groups[1].questions[0])
const workingConditionsHighlightQuestion2 = computed(() => props.studyData.socialData[0].groups[3].questions[0])

const questionVGGT = computed(() => props.studyData.socialData[1].groups[0].questions[0])
const questionParticipation = computed(() => props.studyData.socialData[1].groups[1].questions[2])

const questionWomenRights = computed(() => props.studyData.socialData[2].groups[1].questions[1])
const questionWomenIncome = computed(() => props.studyData.socialData[2].groups[2].questions[2])

const questionFoodIncrease = computed(() => props.studyData.socialData[3].groups[0].questions[0])
const questionFoodIncome = computed(() => props.studyData.socialData[3].groups[1].questions[0])

const questionFarmerParticipation = computed(
  () => props.studyData.socialData[4].groups[0].questions[0]
)
const questionFarmerInformation = computed(
  () => props.studyData.socialData[4].groups[1].questions[0]
)

const questionLivingHealth = computed(() => props.studyData.socialData[5].groups[0].questions[2])
const questionLivingEducation = computed(() => props.studyData.socialData[5].groups[2].questions[0])
</script>

<style lang="">
</style>
