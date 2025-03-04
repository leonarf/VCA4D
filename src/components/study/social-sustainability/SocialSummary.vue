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
      The purpose of the social analysis is to inform on how the interaction between the value chain
      actors and the general social environment contributes to
      <strong
        >improving or degrading the situation of the various social groups and types of
        actors</strong
      >.
    </p>
    <p>
      The four levels of social sustainability are illustrated by different colours in the chart:
      <b class="highlight" :style="{ backgroundColor: getSocialScoreColor(4) }">high (dark green)</b
      >,
      <b class="highlight" :style="{ backgroundColor: getSocialScoreColor(3) }"
        >substantial (light green)</b
      >,
      <b class="highlight" :style="{ backgroundColor: getSocialScoreColor(2) }"
        >moderate/low (yellow)</b
      >,
      <b class="highlight" :style="{ backgroundColor: getSocialScoreColor(1) }">not at all (red)</b
      >.
    </p>
    <div class="social-summary">
      <div class="summary-block side-block block-top">
        <SummaryBlock
          title="Living conditions"
          :anchor="6"
          :averageValue="getSocialAverageGroup(studyData.socialData[5])"
        >
          <SummaryBlockQuestion :question="questionLivingHealth" />
          <SummaryBlockQuestion :question="questionLivingEducation" />
        </SummaryBlock>
      </div>
      <div class="summary-block block-top">
        <SummaryBlock
          title="Working conditions"
          :anchor="1"
          :averageValue="getSocialAverageGroup(studyData.socialData[0])"
        >
          <SummaryBlockQuestion :question="workingConditionsHighlightQuestion1" />
          <SummaryBlockQuestion :question="workingConditionsHighlightQuestion2" />
        </SummaryBlock>
      </div>
      <div class="summary-block side-block block-top">
        <SummaryBlock
          title="Land &amp; water rights"
          :anchor="2"
          :averageValue="getSocialAverageGroup(studyData.socialData[1])"
        >
          <SummaryBlockQuestion :question="questionVGGT" />
          <SummaryBlockQuestion :question="questionParticipation" />
        </SummaryBlock>
      </div>
      <div class="radar-block w-full h-[400px]">
        <SocialRadar :studyData="studyData" />
      </div>
      <div class="summary-block side-block block-bottom">
        <SummaryBlock
          title="Social capital"
          :anchor="5"
          :averageValue="getSocialAverageGroup(studyData.socialData[4])"
        >
          <SummaryBlockQuestion :question="questionFarmerParticipation" />
          <SummaryBlockQuestion :question="questionFarmerInformation" />
        </SummaryBlock>
      </div>
      <div class="summary-block side-block block-bottom">
        <SummaryBlock
          title="Gender equality"
          :anchor="3"
          :averageValue="getSocialAverageGroup(studyData.socialData[2])"
        >
          <SummaryBlockQuestion :question="questionWomenRights" />
          <SummaryBlockQuestion :question="questionWomenIncome" />
        </SummaryBlock>
      </div>
      <div class="summary-block block-bottom">
        <SummaryBlock
          title="Food &amp; nutrition security"
          :anchor="4"
          :averageValue="getSocialAverageGroup(studyData.socialData[3])"
        >
          <SummaryBlockQuestion :question="questionFoodIncrease" />
          <SummaryBlockQuestion :question="questionFoodIncome" />
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
import { getSocialAverageGroup, getSocialScoreColor } from '@utils/social.js'

const props = defineProps({
  studyData: Object
})

const workingConditionsHighlightQuestion1 = computed(
  () => props.studyData.socialData[0].groups[1].questions[0]
)
const workingConditionsHighlightQuestion2 = computed(
  () => props.studyData.socialData[0].groups[3].questions[0]
)

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

<style lang="scss" scoped>
.highlight {
  padding: 1px 3px;
}

.social-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5em;
  width: 100%;
  margin-top: 1rem;

  .radar-block {
    height: 400px;
    width: 100%;
    grid-row: span 2 / span 2;
    display: flex;
    justify-content: center;
  }
  .summary-block {
    display: flex;
    justify-content: center;
    height: fit-content;
  }
  .side-block {
    grid-row: span 2 / span 2;
  }
  .block-top {
    align-self: end;
  }
  .block-bottom {
    align-self: start;
  }

  @media screen and (max-width: 1600px) {
    .side-block {
      grid-row: span 1 / span 1;
    }
    .radar-block {
      grid-column: span 3 / span 3;
    }
  }
}
</style>
