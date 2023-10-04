<template>
    <h1>Is the value chain <strong>socially sustainable</strong>?</h1>
    <br />
    <div class="flex flex-col flex-wrap">
        <div class="flex flex-row w-full justify-center">
            <SummaryBlock title="Working conditions" class="w-full" :anchor="1" :average-value="getSocialAverageGroup(studyData.socialData, 0)">
                <SummaryBlockQuestion
                    :question="questionSchoolChildren">
                </SummaryBlockQuestion>
                <SummaryBlockQuestion
                    :question="questionRemuneration">
                </SummaryBlockQuestion>
            </SummaryBlock>
        </div>

        <div class="flex flex-row">
            <div class="flex flex-col w-1/3 justify-around">
                <SummaryBlock title="Living conditions" class="max-w-1/3" :anchor="6" :average-value="getSocialAverageGroup(studyData.socialData, 5)">
                    <SummaryBlockQuestion
                        :question="questionLivingHealth">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionLivingEducation">
                    </SummaryBlockQuestion>
                </SummaryBlock>
                <SummaryBlock title="Social capital" class="max-w-1/3" :anchor="5" :average-value="getSocialAverageGroup(studyData.socialData, 4)">
                    <SummaryBlockQuestion
                        :question="questionFarmerParticipation">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionFarmerInformation">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
            <div class="w-full">
                <SocialRadar :study-data="studyData" />
            </div>
            <div class="flex flex-col w-1/3 justify-around">
                <SummaryBlock title="Land &amp; water rights" :anchor="2" :average-value="getSocialAverageGroup(studyData.socialData, 1)">
                    <SummaryBlockQuestion
                        :question="questionVGGT">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionParticipation">
                    </SummaryBlockQuestion>
                </SummaryBlock>
                <SummaryBlock title="Gender equality" :anchor="3" :average-value="getSocialAverageGroup(studyData.socialData, 2)">
                    <SummaryBlockQuestion
                        :question="questionWomenRights">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionWomenIncome">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
        </div>
        <div class="flex flex-row w-full justify-center">

            <SummaryBlock title="Food &amp; nutrition security" class="max-w-1/3" :anchor="4" :average-value="getSocialAverageGroup(studyData.socialData, 3)">
                    <SummaryBlockQuestion
                        :question="questionFoodIncrease">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionFoodIncome">
                    </SummaryBlockQuestion>
                </SummaryBlock>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import SocialRadar from './SocialRadar.vue';
import SummaryBlock from './SummaryBlock.vue'
import SummaryBlockQuestion from './SummaryBlockQuestion.vue'
import { getSocialAverageGroup } from '@/utils/misc.js'

const props = defineProps({
    studyData: Object
})
const questionSchoolChildren = computed(() => props.studyData.socialData[0].groups[1].questions[0])
const questionRemuneration = computed(() => props.studyData.socialData[0].groups[3].questions[0])

const questionVGGT = computed(() => props.studyData.socialData[1].groups[0].questions[0])
const questionParticipation = computed(() => props.studyData.socialData[1].groups[1].questions[2])

const questionWomenRights = computed(() => props.studyData.socialData[2].groups[1].questions[1])
const questionWomenIncome = computed(() => props.studyData.socialData[2].groups[2].questions[2])

const questionFoodIncrease = computed(() => props.studyData.socialData[3].groups[0].questions[0])
const questionFoodIncome = computed(() => props.studyData.socialData[3].groups[1].questions[0])

const questionFarmerParticipation = computed(() => props.studyData.socialData[4].groups[0].questions[0])
const questionFarmerInformation = computed(() => props.studyData.socialData[4].groups[1].questions[0])

const questionLivingHealth = computed(() => props.studyData.socialData[5].groups[0].questions[2])
const questionLivingEducation = computed(() => props.studyData.socialData[5].groups[2].questions[0])

</script>

<style lang="">
    
</style>