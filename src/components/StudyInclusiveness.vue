<template>
    <article class="study-section">
        <h1>Is the economic growth <strong>inclusive</strong>?</h1>

        <p>A value chain is inclusive in one country not only by the number of jobs created, but also considering these jobs' quality. The way the income is distributed across the value chain from the samll producers to the consumers also tell about the power dynamics and the policies that may be improved for more inclusiveness. For detailed information on the value chain's impact on the most vulnerable groups, like women and youth, please go directly to Social sustainability part (*link).</p>

        <h2>How is <strong>employment</strong> distributed across the value chain?</h2>
        <p>Methodology</p>
        <p>Employment data only relate to full time equivalent jobs for this specific value chain and do not include total employment of each actor. In addition, the informal family workforce at the agricultural production level is not accounted for.</p>

        <h4>Number of actors [?]</h4>
        <p class="TODO">Prendre les données dans l'excel économique, feuille Indicator by actor type, colonne Number Of actors In the value chain</p>
        <h4>Jobs [?]</h4>
        <p class="TODO">Prendre les données dans l'excel économique, feuille Employment</p>

        <h2>How is <strong>income</strong> distributed across actors of the value chain?</h2>
        <p>Actors that are in small numbers but receive an important share of the value chain's net operating profit are in a stronger position of negociation in front of actore that are more divided.</p>
        <p>NB: The income data only relate to this specific value chain: the data do not include any other income from any other activity.</p>
        <p>net operating profit across actor types</p>
        <p class="TODO">Prendre les données dans l'excel économique, feuille Indicator by actor type, colonne Net operating profit (local currency)</p>
        <p class="TODO">Number of actors : c'est le même graphique qu'en haut de la page, est-ce qu'on le remet vraiment?</p>

        <h2>What is the impact of the <strong>governance systems</strong> on income distribution?</h2>
        <p>Share of farm gate price in final price</p>
        <p class="TODO">Missing data to be able to display graphic</p>
        <p>Gini index</p>
        <p class="TODO">Missing data to be able to display graphic</p>
    </article>

</template>

<script setup>
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