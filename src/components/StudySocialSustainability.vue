<template>
    <article class="study-section">
        <h1>Is the value chain <strong>socially sustainable</strong>?</h1>

        <div class="flex flex-col flex-wrap">
            <div class="flex flex-row w-full justify-center">
                <BrowsableRadarChartItem title="Working conditions" class="w-full">
                    <BrowsableRadarChartItemQuestion
                        label="Degree of school attendance in case children are working (in any segment of the value chain)?"
                        :scale="questionSchoolChildren.scoreValue" :appreciation="questionSchoolChildren.scoreText">
                    </BrowsableRadarChartItemQuestion>
                    <BrowsableRadarChartItemQuestion
                        label="To what extent are remunerations in accordance with local standards?"
                        :scale="questionRemuneration.scoreValue" :appreciation="questionRemuneration.scoreText">
                    </BrowsableRadarChartItemQuestion>
                </BrowsableRadarChartItem>
            </div>

            <div class="flex flex-row">
                <div class="flex flex-col w-1/3 justify-around">
                    <BrowsableRadarChartItem title="Living conditions" class="max-w-1/3">
                        <BrowsableRadarChartItemQuestion label="Are health services affordable for households?"
                            :scale="questionLivingHealth.scoreValue" :appreciation="questionLivingHealth.scoreText">
                        </BrowsableRadarChartItemQuestion>
                        <BrowsableRadarChartItemQuestion label="Is primary education accessible to households?"
                            :scale="questionLivingEducation.scoreValue" :appreciation="questionLivingEducation.scoreText">
                        </BrowsableRadarChartItemQuestion>
                    </BrowsableRadarChartItem>

                    <BrowsableRadarChartItem title="Social capital" class="max-w-1/3">
                        <BrowsableRadarChartItemQuestion
                            label="Do formal and informal farmer organisations/cooperatives participate in the value chain?"
                            :scale="questionFarmerParticipation.scoreValue"
                            :appreciation="questionFarmerParticipation.scoreText"></BrowsableRadarChartItemQuestion>
                        <BrowsableRadarChartItemQuestion
                            label="Do farmers in the value chain have access to information on agricultural practices, agricultural policies, and market prices?"
                            :scale="questionFarmerInformation.scoreValue"
                            :appreciation="questionFarmerInformation.scoreText"></BrowsableRadarChartItemQuestion>
                    </BrowsableRadarChartItem>
                </div>
                <div class="w-full">
                    <Radar :options="chartData" />
                </div>
                <div class="flex flex-col w-1/3 justify-around">
                    <BrowsableRadarChartItem title="Land &amp; water rights">
                        <BrowsableRadarChartItemQuestion
                            label="Do the companies/institutions involved in the value chain declare adhering to the VGGT?"
                            :scale="questionVGGT.scoreValue" :appreciation="questionVGGT.scoreText">
                        </BrowsableRadarChartItemQuestion>
                        <BrowsableRadarChartItemQuestion
                            label="Level of participation and consultation of all individuals and groups in the decision-making process?"
                            :scale="questionParticipation.scoreValue" :appreciation="questionParticipation.scoreText">
                        </BrowsableRadarChartItemQuestion>
                    </BrowsableRadarChartItem>

                    <BrowsableRadarChartItem title="Gender equality">
                        <BrowsableRadarChartItemQuestion label="Do women have equal land rights as men?"
                            :scale="questionWomenRights.scoreValue" :appreciation="questionWomenRights.scoreText">
                        </BrowsableRadarChartItemQuestion>
                        <BrowsableRadarChartItemQuestion label="Do women have control over income?"
                            :scale="questionWomenIncome.scoreValue" :appreciation="questionWomenIncome.scoreText">
                        </BrowsableRadarChartItemQuestion>
                    </BrowsableRadarChartItem>
                </div>
            </div>
            <div class="flex flex-row w-full justify-center">
                <BrowsableRadarChartItem title="Food &amp; nutrition security" class="max-w-1/3">
                    <BrowsableRadarChartItemQuestion label="Does the local production of food increase?"
                        :scale="questionFoodIncrease.scoreValue" :appreciation="questionFoodIncrease.scoreText">
                    </BrowsableRadarChartItemQuestion>
                    <BrowsableRadarChartItemQuestion label="Do people have more income to allocate to food?"
                        :scale="questionFoodIncome.scoreValue" :appreciation="questionFoodIncome.scoreText">
                    </BrowsableRadarChartItemQuestion>
                </BrowsableRadarChartItem>
            </div>
        </div>

        <EvaluationCriteria>
            <EvaluationCriterion v-for="part in studyData.socialData" :key="part.title"
                :label="part.title.split(' ').slice(1).join(' ')">
                <EvaluationCriterionLevel2 v-for="group in part.groups" :key="group.title"
                    :label="group.title.split(' ').slice(1).join(' ')" :counter="group.title.split(' ')[0]"
                    :scale="group.averageValue" :appreciation="group.averageText">
                    <EvaluationCriterionLevel3 v-for="question in group.questions" :key="question.text.split(' ')[0]"
                        :label="question.text.split(' ').slice(1).join(' ')" :counter="question.text.split(' ')[0]"
                        :scale="question.scoreValue" :comment="question.comment" :appreciation="question.scoreText" />
                </EvaluationCriterionLevel2>
            </EvaluationCriterion>
        </EvaluationCriteria>
    </article>
</template>

<script setup>
import { computed } from 'vue';
import BrowsableRadarChartItem from './BrowsableRadarChartItem.vue';
import BrowsableRadarChartItemQuestion from './BrowsableRadarChartItemQuestion.vue';
import EvaluationCriteria from './EvaluationCriteria.vue';
import EvaluationCriterion from './EvaluationCriterion.vue';
import EvaluationCriterionLevel2 from './EvaluationCriterionLevel2.vue';
import EvaluationCriterionLevel3 from './EvaluationCriterionLevel3.vue';

import Radar from '@charts/Radar.vue'

const props = defineProps({
    studyData: Object,
    value: String
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

const average = (array) => array.reduce((a, b) => a + b) / array.length
const getAverageGroup = (index) => Math.round(average(props.studyData.socialData[index].groups.map(group => Number(group.averageValue) || 0)), 2)

const averageWorking = computed(() => getAverageGroup(0))
const averageLand = computed(() => getAverageGroup(1))
const averageGender = computed(() => getAverageGroup(2))
const averageFood = computed(() => getAverageGroup(3))
const averageSocial = computed(() => getAverageGroup(4))
const averageLiving = computed(() => getAverageGroup(5))

const chartData = computed(() => {
    const values = [averageWorking.value, averageLiving.value, averageSocial.value, averageFood.value, averageGender.value, averageLand.value]
    return {
        radar: {
            indicator: [
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 },
                { name: '', max: 4 }
            ],
            center: ['50%', '50%'],
            radius: '75%',
            splitArea: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#FF9933'
                }
            },
            axisLabel: {
                show: false,
            }
        },
        series: [
            {
                type: 'radar',
                areaStyle: {
                    color: "#FFCC99"
                },
                itemStyle: {
                    color: "#FF9933"
                },
                data: [
                    {
                        value: values,
                        name: 'Allocated Budget',
                    }
                    
                ]
            }
        ]
    };
})
</script>

<style scoped lang="scss"></style>