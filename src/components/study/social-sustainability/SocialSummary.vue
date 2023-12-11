<template>
    <h1>Is the value chain <strong>socially sustainable</strong>?</h1>
        <div class="grid grid-cols-3 w-full text-center gap-2">
            <div class="row-span-2 self-start xl:self-end">
                <SummaryBlock title="Living conditions" :anchor="6" :average-value="getSocialAverageGroup(studyData.socialData, 5)">
                    <SummaryBlockQuestion
                        :question="questionLivingHealth">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionLivingEducation">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
            <div>
                <SummaryBlock title="Working conditions" :anchor="1" :average-value="getSocialAverageGroup(studyData.socialData, 0)">
                    <SummaryBlockQuestion
                        :question="questionSchoolChildren">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionRemuneration">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
            <div class="row-span-2 self-start xl:self-end">
                <SummaryBlock title="Land &amp; water rights" :anchor="2" :average-value="getSocialAverageGroup(studyData.socialData, 1)">
                    <SummaryBlockQuestion
                        :question="questionVGGT">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionParticipation">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
            <div  class="row-span-2">
                <div class="w-full h-[400px]">
                    <SocialRadar :study-data="studyData" />
                </div>
            </div>
            <div class="row-span-2 self-end xl:self-start">
                <SummaryBlock title="Social capital" :anchor="5" :average-value="getSocialAverageGroup(studyData.socialData, 4)">
                    <SummaryBlockQuestion
                        :question="questionFarmerParticipation">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionFarmerInformation">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
            <div class="row-span-2 self-end xl:self-start">
                <SummaryBlock title="Gender equality" :anchor="3" :average-value="getSocialAverageGroup(studyData.socialData, 2)">
                    <SummaryBlockQuestion
                        :question="questionWomenRights">
                    </SummaryBlockQuestion>
                    <SummaryBlockQuestion
                        :question="questionWomenIncome">
                    </SummaryBlockQuestion>
                </SummaryBlock>
            </div>
            <div class="">
                <SummaryBlock title="Food &amp; nutrition security" :anchor="4" :average-value="getSocialAverageGroup(studyData.socialData, 3)">
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
import { getSocialAverageGroup } from '@utils/misc.js'

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