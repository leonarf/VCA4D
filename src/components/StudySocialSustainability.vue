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
            <EvaluationCriterion label="Working conditions">
                <EvaluationCriterionLevel2 label="Respect of labour rights" scale="1">
                    <EvaluationCriterionLevel3 label="To what extent do companies involved in the value chain respect the standards elaborated in the 8 fundamental ILO international labour conventions and in the ICESCR?" scale="1"></EvaluationCriterionLevel3>
                    <EvaluationCriterionLevel3 label="Is freedom of association allowed and effective (collective bargaining)?" scale="1"></EvaluationCriterionLevel3>
                    <EvaluationCriterionLevel3 label="To what extent do workers benefit from enforceable and fair contracts?" scale="0"></EvaluationCriterionLevel3>
                    <EvaluationCriterionLevel3 label="To what extent are risks of forced labour in any segment of the value chain minimized?" scale="2"></EvaluationCriterionLevel3>
                    <EvaluationCriterionLevel3 label="To what extent are any risks of discrimination in employment for specific categories of the population minimized?" scale="3"></EvaluationCriterionLevel3>
                </EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Child labour" scale="2"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Job Safety" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Attractiveness" scale="2"></EvaluationCriterionLevel2>
            </EvaluationCriterion>
            <EvaluationCriterion label="Land &amp; water rights">
                <EvaluationCriterionLevel2 label="Adherence to VVGT" scale="0"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Transparency, participation and consultation" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Equity, compensation and justice" scale="1"></EvaluationCriterionLevel2>
            </EvaluationCriterion>
            <EvaluationCriterion label="Gender equality">
                <EvaluationCriterionLevel2 label="Economic activities" scale="3"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Access to resources and services" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Decision making" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Leadership and empowerment" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Hardship and division of labour" scale="1"></EvaluationCriterionLevel2>
            </EvaluationCriterion>
            <EvaluationCriterion label="Food and nutrition security">
                <EvaluationCriterionLevel2 label="Availability of food" scale="3"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Accessibility of food" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Utilisation and nutritional adequacy" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Stability" scale="1"></EvaluationCriterionLevel2>
            </EvaluationCriterion>
            <EvaluationCriterion label="Social capital">
                <EvaluationCriterionLevel2 label="Strength of producer organisations" scale="3"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Information and confidence" scale="1"></EvaluationCriterionLevel2>
                <EvaluationCriterionLevel2 label="Social involvement" scale="1"></EvaluationCriterionLevel2>
            </EvaluationCriterion>
            <EvaluationCriterion label="Living conditions">
                <EvaluationCriterionLevel2 label="Health services" scale="3"></EvaluationCriterionLevel2>
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
</script>

<script>
//@ts-check

import '../types.js'

export default {
    name: 'StudyEconomicGrowth',
    props: ['studyData'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

article.study-section {

    h1 {
        text-decoration: underline;
        text-decoration-thickness: 3px;
        font-weight: normal;
        font-size: 24px;
        color: #151515;
        text-underline-offset: 5px;
    }

    h2 {
        font-weight: normal;
        font-size: 22px;
        color: #151515;
    }

    h3 {
        padding-left: 80px;
        font-weight: bold;
        font-size: 17px;
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-thickness: 3px;
        text-decoration-color: #999;
    }
}

</style>