<template>
    <article class="study-section">
        <h1>Is the value chain <strong>socially sustainable</strong>?</h1>

        <div class="browsable-radar-chart">
            <BrowsableRadarChartItem title="Working conditions">
                <BrowsableRadarChartItemQuestion label="Degree of school attendance in case children are working (in any segment of the value chain)?" scale="2"></BrowsableRadarChartItemQuestion>
                <BrowsableRadarChartItemQuestion label="To what extent are remunerations in accordance with local standards?" scale="3"></BrowsableRadarChartItemQuestion>
            </BrowsableRadarChartItem>

            <BrowsableRadarChartItem title="Land &amp; water rights">
                <BrowsableRadarChartItemQuestion label="Do the companies/institutions involved in the value chain declare adhering to the VGGT?" scale="1"></BrowsableRadarChartItemQuestion>
                <BrowsableRadarChartItemQuestion label="Level of participation and consultation of all individuals and groups in the decision-making process?" scale="3"></BrowsableRadarChartItemQuestion>
            </BrowsableRadarChartItem>

            <BrowsableRadarChartItem title="Gender equality">
                <BrowsableRadarChartItemQuestion label="Do women have equal land rights as men?" scale="2"></BrowsableRadarChartItemQuestion>
                <BrowsableRadarChartItemQuestion label="Do women have control over income?" scale="1"></BrowsableRadarChartItemQuestion>
            </BrowsableRadarChartItem>

            <BrowsableRadarChartItem title="Food &amp; nutrition security">
                <BrowsableRadarChartItemQuestion label="Does the local production of food increase?" scale="1"></BrowsableRadarChartItemQuestion>
                <BrowsableRadarChartItemQuestion label="Do people have more income to allocate to food?" scale="1"></BrowsableRadarChartItemQuestion>
            </BrowsableRadarChartItem>

            <BrowsableRadarChartItem title="Social capital">
                <BrowsableRadarChartItemQuestion label="Do formal and informal farmer organisations/cooperatives participate in the value chain?" scale="0"></BrowsableRadarChartItemQuestion>
                <BrowsableRadarChartItemQuestion label="Do farmers in the value chain have access to information on agricultural practices, agricultural policies, and market prices?" scale="0"></BrowsableRadarChartItemQuestion>
            </BrowsableRadarChartItem>

            <BrowsableRadarChartItem title="Living conditions">
                <BrowsableRadarChartItemQuestion label="Are health services affordable for households?" scale="3"></BrowsableRadarChartItemQuestion>
                <BrowsableRadarChartItemQuestion label="Is primary education accessible to households?" scale="2"></BrowsableRadarChartItemQuestion>
            </BrowsableRadarChartItem>
        </div>

        <div class="study-snapshot">The study in a 6-pages snapshot</div>

        <EvaluationCriteria>
            <EvaluationCriterion v-for="part in studyData.socialData" :key="part.title" :label="part.title.split(' ').slice(1).join(' ')">
                <EvaluationCriterionLevel2 v-for="group in part.groups" 
                    :key="group.title" 
                    :label="group.title.split(' ').slice(1).join(' ')"
                    :counter="group.title.split(' ')[0]" 
                    :scale="group.averageValue"
                    :appreciation="group.averageText">
                    <EvaluationCriterionLevel3 v-for="question in group.questions" 
                        :key="question.text.split(' ')[0]" 
                        :label="question.text.split(' ').slice(1).join(' ')"
                        :counter="question.text.split(' ')[0]"
                        :scale="question.scoreValue"
                        :comment="question.comment"
                        :appreciation="question.scoreText"/>
                </EvaluationCriterionLevel2>
            </EvaluationCriterion>
        </EvaluationCriteria>
    </article>

</template>

<script setup>
import BrowsableRadarChartItem from './BrowsableRadarChartItem.vue';
import BrowsableRadarChartItemQuestion from './BrowsableRadarChartItemQuestion.vue';
import EvaluationCriteria from './EvaluationCriteria.vue';
import EvaluationCriterion from './EvaluationCriterion.vue';
import EvaluationCriterionLevel2 from './EvaluationCriterionLevel2.vue';
import EvaluationCriterionLevel3 from './EvaluationCriterionLevel3.vue';

const props = defineProps({
  studyData: Object,
  value: String
})

</script>

<style scoped lang="scss">
</style>