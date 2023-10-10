<template>
    <SankeyChart :options="populatedSankeyChartData"></SankeyChart>
    <div>Display mode: <button @click="toggleSankeyGraphDisplayMode">{{ sankeyGraphPossibleDisplayModesList[sankeyGraphDisplayMode] }}</button></div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { prettyFormatAmount } from '@/utils/currency.js'
import { getStageColor } from '@/utils/colors.js'

import SankeyChart from '../SankeyChart.vue';

const props = defineProps({
  studyData: Object
});

const sankeyGraphPossibleDisplayModesList = [
    "monetaryValue",
    "volumeExchanged"
];

const sankeyGraphDisplayMode = ref(0);

const toggleSankeyGraphDisplayMode = () => {
    sankeyGraphDisplayMode.value = (sankeyGraphDisplayMode.value + 1) % sankeyGraphPossibleDisplayModesList.length;
};

const populatedSankeyChartData = computed ( () => {
    let monetaryCurrency = props.studyData.targetCurrency
    const { stages, actors, flows } = props.studyData.ecoData

    let result = {
        title: {
            text: "The various actors and their share in the flows of the value chain",
        },
        series: {
            type: 'sankey',
            layoutIterations: 10,
            emphasis: {
                focus: 'adjacency'
            },
            nodeWidth: 20,
            nodeGap: 50
        }
    };

    result.series.levels = stages.map(({ name, index }) => {
        const stageColor = getStageColor(name)
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

    const maxDepth = Math.max(stages.map(stage => stage.index))

    // It looks like in echarts, "nodes" key can also be named "data"
    result.series.nodes = actors.map((actor) => {
        const actorStage = stages.find((stage) => stage.name === actor.stage);
        if (!actorStage) {
            console.log("Stage not found for", actor)
        }
        return {
            "name": actor.name,
            "depth": actorStage ? actorStage.index : maxDepth + 1 // Actor with unknown stages will be at far right
        };
    });

    result.series.links = flows.map((flow) => {
        const { buyerActorName, sellerActorName, product, monetaryValue, volumeExchanged, unitPrice, volumeUnit } = flow
        const sourceActor = actors.find((actor) => actor.name === sellerActorName);
        const targetActor = actors.find((actor) => actor.name === buyerActorName);
        if (targetActor == sourceActor) {
            return {} // Ignore autoconsumption
        }
        return {
            "source": sourceActor.name,
            "target": targetActor.name,
            "value": Math.log(flow[sankeyGraphPossibleDisplayModesList[sankeyGraphDisplayMode.value]]),
            "edgeLabel": {
                show: true,
                formatter: () => {
                    return product;
                }
            },
            "Monetary value": monetaryValue,
            "Volume exchanged (kg Of product)": volumeExchanged,
            "Products": product,
            "Unitary price (local curency)": unitPrice,
            "Volume Unit": volumeUnit,
            "Remark": ''
        };
    });
    result.tooltip = {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params, ticket) => {
            if (params?.dataType === "node" || params?.dataType === "edge"){
                let items = [];
                let rendered_items = [];
                if (params?.dataType === "node"){
                    const actorStage = actors.find((actor) => actor.name === params.data.name);
                    const actorStageLabel = actorStage ? actorStage.stage : undefined;
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
                            value: prettyFormatAmount(params.data["Monetary value"], monetaryCurrency)
                        },
                        {
                            label: "Products",
                            value: params.data['Products']
                        },
                        {
                            label: "Unitary price (local curency)",
                            value: prettyFormatAmount(params.data['Unitary price (local curency)'], monetaryCurrency)
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

    return result;
});
</script>

<style scoped lang="scss">
</style>
