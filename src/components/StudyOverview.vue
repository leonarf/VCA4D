<template>
    <article>
        <h1>Overview</h1>
        <section class="introduction">
            <h2>Main steps in the value chain</h2>
            <ol>
                <li v-for="step in populatedSteps" :key="step.label">
                    <img class="TODO" :alt="step.label + ' illustration'">
                    <strong>{{ step.label }}</strong>
                    <p class="TODO">{{ step.description }}</p>
                </li>
            </ol>
        </section>

        <section>
            <SankeyChart :options="populatedSankeyChartData"></SankeyChart>
        </section>


        <section v-if="studyData" class="explore">
            <h2>Explore the 4 dimensions of the value chain</h2>
            
            <!--
            <p class="TODO">
                Implémenter l'idée de Sofia où on reprend les 4 dimensions
                avec pour chacune le sous-menu
                et aucun graphique
                et juste un lien vers la section correspondante

            </p>
            -->
            <RouterLink :to="'/study?id=' + studyData.id + '&view=economic-growth'">
                <h3>Contribution to growth</h3>
                <p>Learn more about <em>Contribution to GDP</em>, <em>Public finances</em>, 
                    <em>Balance of trade</em> and <em>Viability in international economy</em></p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=inclusiveness'">
                <h3>Inclusiveness</h3>
                <p>Learn more about <em>Employment</em>, <em>Profits distribution across actors</em> and 
                    <em>Impact of governance</em></p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=social-sustainability'">
                <h3>Social sustainability</h3>
                <p>Learn more about <em>Working conditions</em>, <em>Land and water rights</em>, 
                    <em>Gender equality</em>, <em>Food & nutrition security</em>,
                    <em>Social capital</em> and
                    <em>Living conditions</em>
                </p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=environment'">
                <h3>Environmental sustainability</h3>
                <p>Learn more about <em>Climate change</em>, <em>human health</em> and
                    <em>Ecosystems</em> </p>
            </RouterLink>

        </section>


        <section>
            <h2>Where these data come from?</h2>
            <p>
                <a href="../study-briefs/VCA4D 25- Mali cashew_0.pdf" target="_blank">Download the 6-page report</a>
            </p>
            <p>
                <a href="https://europa.eu/capacity4dev/value-chain-analysis-for-development-vca4d-/wiki/221-mali-cashew" target="_blank">Go to full study</a>
            </p>

            <section>
                <h3>Study conclusion</h3>
                <p>La CV anacarde au Mali est moins développée que dans les pays voisins en Afrique 
                    de l'Ouest, mais elle crée de la valeur ajoutée et de la croissance inclusive pour 
                    les acteurs. Le principal levier pour améliorer sa performance et sa durabilité se 
                    situe au niveau de la transformation. Il pourrait être envisagé la création de 
                    20-40 unités de transformation semi-industrielles/ artisanales de noix brutes 
                    en amandes et de pommes en jus. Ces créations pourraient se faire sous forme 
                    d'entreprises privées ou de coopératives, offrant des avantages en matière d'intégration 
                    de plusieurs activités de transformation, d'intégration de plusieurs étapes de la CV, 
                    de renforcement du pouvoir de négociation des producteurs, d'accès aux équipements et 
                    connaissances pour augmenter les rendements.
                </p>
                <p>Une plus grande efficience des processus techniques et de gestion de la production
                    et de la transformation doit être encouragée à tous les niveaux de la 
                    CV : efficience des rendements agronomiques, efficience énergétique, 
                    efficience générale de la productivité des unités de transformation, efficience 
                    du marketing...</p>
                <p>La durabilité sociale de la CV est exposée à plusieurs risques qui demandent
                    de la vigilance : exposition de la main d'œuvre aux travaux pénibles et/ou 
                    dangereux, fragilisation sociale et alimentaire des exploitations agricoles 
                    familiales, marginalisation et/ou accroissement de la dépendance des femmes et 
                    autres couches vulnérables, réduction de la part des producteurs dans les revenus de la CV.
                </p>
                <p>Un accent particulier doit être mis sur la fonctionnalité des organisations 
                    de producteurs notamment par le renforcement du leadership et de la bonne 
                    gouvernance. Il faut renforcer les capacités d'accès des producteurs et de leurs 
                    organisations à l'information, en particulier à l'information sur les politiques 
                    agricoles, sur les prix de marché et sur l'organisation de la CV, dans le but d'améliorer 
                    les relations de confiance entre les acteurs des différents segments et entre ces acteurs 
                    et leurs partenaires publics et privés nationaux et étrangers.</p>
                <p>Des marges d'amélioration existent également pour la durabilité environnementale, 
                    elles résident dans l'exploration des possibilités et des effets d'une valorisation 
                    par les plantations d'anacarde des terres dégradées par l'orpaillage ; et dans la 
                    valorisation des coques d'anacarde pour remplacer le bois de feu.</p>
            </section>

        </section>

    </article>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue';

import SankeyChart from './SankeyChart.vue';

const props = defineProps({
  studyData: Object
});

const steps = [
    {
        label: "Agricultural production",
        image: "TODO",
        dataKey: "Agricultural producers" 
    },
    {
        label: "Collection",
        image: "TODO",
        dataKey: "Collectors" 
    },
    {
        label: "Processing",
        image: "TODO",
        dataKey: "Processors" 
    },
    {
        label: "Wholesale",
        image: "TODO",
        dataKey: "Wholesalers" 
    },
    {
        label: "Retail",
        image: "TODO",
        dataKey: "Retailers" 
    },
    {
        label: "Export",
        image: "TODO",
        dataKey: "Exporters" 
    }
];



const getStepDescription = (studyData, dataKey) => {
    return studyData?.data["Stages description"]?.find(el => {return el["Stages"] === dataKey;} )?.["Description"];
};

const populatedSteps = computed( () => {
    return steps.map((step) => {
        return {
            ...step,
            description: getStepDescription(props.studyData, step.dataKey) // we take into account the fact that at first rendering, `studyData` can be undefined
        };
    });
});

const populatedSankeyChartData = computed ( () => {
    let chartTitle = "The various actors and their share in the flows of the value chain";
    let nodes = [];
    let links = [];
    let monetaryCurrency = "&euro;";
    let stages = [];
    let levels = [];
    let result = {
        title: {
            text: chartTitle,
            //left: "center"
        },
        series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
                focus: 'adjacency'
            },
            nodes: [],
            links: []
        }
    };
    const colors = [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc"
    ];
    if (!props.studyData){
        chartTitle += "(NOT ENOUGH DATA)";
        result.title.text = chartTitle;
        return result;
    } else {
        let valueChainTab = props.studyData?.data["Value Chain"];
        monetaryCurrency = valueChainTab.find((row) => {return row["Property"] === "Currency"})["Value"];
        let stagesTab = props.studyData?.data["Stages description"];
        stages = stagesTab.map((row, index) => {
            return {
                label: row["Stages"],
                description: row["Description"],
                index: index
            };
        });
        levels = stagesTab.map((row, index) => {
            //const stageColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            const stageColor = colors[index%colors.length];
            return {
              depth: index,
              itemStyle: {
                color: stageColor
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            };
        });

        let actorTypesTab = props.studyData?.data["Actor types"];
        nodes = actorTypesTab.map((actor) => {
            const actorStage = stages.find((stage) => { return stage.label === actor["Stage"]});
            return {
                "name": actor["Actor type name"],
                "depth": actorStage?.index
            };
        });
        let flowByactorTypesTab = props.studyData?.data["Flow by actor type"];
        links = flowByactorTypesTab.map((row) => {
            const sourceActor = actorTypesTab.find((actor) => {return actor["Actor type code"] === row["Seller actor type code"];});
            const targetActor = actorTypesTab.find((actor) => {return actor["Actor type code"] === row["Buyer actor type code"];});
            return {
                "source": sourceActor["Actor type name"],
                "target": targetActor["Actor type name"],
                "value": row["Monetary value"],
                "edgeLabel": {
                    show: true,
                    formatter: () => {
                        return row["Products"];
                    }
                },
                "Volume exchanged (kg Of product)": row["Volume exchanged (kg Of product)"],
                "Products": row["Products"],
                "Unitary price (local curency)": row["Unitary price (local curency)"],
                "Volume Unit": row["Volume Unit"],
                "Remark": row["Remark"]
            };
        });
        result.tooltip = {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: (params, ticket) => {
                // console.log("tooltip.formatter params:", params, "ticket:", ticket);
                if (params?.dataType === "node" || params?.dataType === "edge"){
                    let items = [];
                    let rendered_items = [];
                    if (params?.dataType === "node"){
                        const actorStage = actorTypesTab.find((actor) => { return actor["Actor type name"] === params.data.name});
                        const actorStageLabel = actorStage ? actorStage["Stage"] : undefined;
                        items = [
                            {
                                label: "Name",
                                value: params.data.name
                            },
                            {
                                label: "Stage",
                                value: actorStageLabel
                            }
                        ];
                    }
                    else if (params?.dataType === "edge"){
                        items = [
                            {
                                label: "Source",
                                value: params.data.source,
                            },
                            {
                                label: "Target",
                                value: params.data.target
                            },
                            {
                                label: "Monetary value",
                                value: `${params.data.value} ${monetaryCurrency}`
                            },
                            {
                                label: "Products",
                                value: params.data['Products']
                            },
                            {
                                label: "Unitary price (local curency)",
                                value: params.data['Unitary price (local curency)']
                            },
                            {
                                label: "Volume exchanged (kg Of product)",
                                value: params.data['Volume exchanged (kg Of product)']
                            },
                            {
                                label: "Volume unit",
                                value: params.data['Volume unit']
                            },
                            {
                                label: "Remark",
                                value: params.data['Remark']
                            }
                        ];
                    }
                    rendered_items = items.map((item) => {
                        if (item.value === undefined){
                            return null;
                        }
                        return `<li><strong>${item.label}</strong>: ${item.value}</li>`;
                    });
                    return `<div style='max-width: 400px; white-space: normal;'><ul style='list-style: initial; margin: 0 10px; padding: initial;'>${rendered_items.join('')}</ul></div>`;
                }
                else {
                    return '';
                }
            }
        };
        result.series.nodes = nodes; // It looks like in echarts, "nodes" key can also be named "data"
        result.series.links = links;
        result.series.levels = levels;
    }
    return result;
});
</script>

<style scoped lang="scss">
article {
    section.introduction{
        ol{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;

            list-style: none;
            margin: 0;

            li{
                width: 18%;

                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;

                img{
                    width: 70%;
                    height: 5rem;
                    margin-bottom: 1rem;
                }
            }
        }
    }

    section.explore{
        a{
            display: block;
            width: 100%;
            min-height: 6rem;

            padding: 1rem;
            margin-bottom: 1rem;

            position: relative;

            color: unset;
            text-decoration: none;

            background-color: bisque;
            border-radius: 1rem;

            h3{
                text-transform: uppercase;
                margin: 0;
            }

            p{
                margin: 0;
            }
            
            &::after{
                content: '→';
                
                color: blue;
                font-size: 2rem;

                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

}
</style>