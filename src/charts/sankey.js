import { useCurrencyUtils } from '@utils/format.js'
import { getColor } from '@utils/colors.js'

const getNodeGap = (studyData) => {
    // First we look at number of flows we have. We force it in the range [10, 40]
    const nbFlows  = studyData.ecoData.flows.length
    const MIN_NB_FLOWS = 10
    const MAX_NB_FLOWS = 40
    const normalizedNbFlows = Math.max(Math.min(nbFlows, MAX_NB_FLOWS), MIN_NB_FLOWS)

    // Based on the number of flows, we set a "Node gap".
    // Node gap will be between 50 and 200. The more flows, the smallest node gap
    const percent = (normalizedNbFlows - MIN_NB_FLOWS) / (MAX_NB_FLOWS - MIN_NB_FLOWS)
    const MIN_NODE_GAP = 50
    const MAX_NODE_GAP = 200
    return Math.floor(MIN_NODE_GAP + (1.0 - percent) * (MAX_NODE_GAP - MIN_NODE_GAP))
}

export const getSankeyData = (studyData, sankeyDisplayMode) => {
    const { prettyAmount, convertAmount } = useCurrencyUtils({currency : studyData.targetCurrency});
    let monetaryCurrency = studyData.targetCurrency
    const { actors, flows } = studyData.ecoData

    let result = {
        title: {
            text: "",
        },
        series: {
            type: 'sankey',
            layoutIterations: 10,
            emphasis: {
                focus: 'adjacency'
            },
            nodeWidth: 20,
            nodeGap: getNodeGap(studyData)
        }
    };

    // For each flow we identify the source Stage and the destination Stage
    const sankeyFlows = flows.map(flow => {
        const sourceActor = actors.find(a => a.name === flow.sellerActorName)
        var sourceStage = "Unknown"
        if (!sourceActor) {
            console.log(`did not found actor ${flow.sellerActorName} in actors`)
        } else {
            sourceStage = sourceActor.stage
        }
        const destActor = actors.find(a => a.name === flow.buyerActorName)
        var destStage = "Unknown"
        if (!destActor) {
            console.log(`did not found actor ${flow.buyerActorName} in actors`)
        } else {
            destStage = destActor.stage
        }

        return {
            ...flow,
            sourceStage,
            destStage
        }
    })

    // List of all stages in flows
    let sankeyStages = [...new Set(sankeyFlows.map(sFlow => [sFlow.sourceStage, sFlow.destStage])
        .reduce((arr, val) => arr.concat(val), []))]

    // For each stage, identify the list of source stages and destination stages.
    sankeyStages = sankeyStages.map(stage => {
        const flowsToStage = sankeyFlows.filter(sFlow => sFlow.destStage === stage && sFlow.sourceStage !== stage).map(sFlow => sFlow.sourceStage)
        const flowsFromStage = sankeyFlows.filter(sFlow => sFlow.sourceStage === stage && sFlow.destStage !== stage).map(sFlow => sFlow.destStage)

        let ret = {
            name: stage,
            inStages: [...new Set(flowsToStage)],
            outStages: [...new Set(flowsFromStage)],
        }
        // Stages that have no sources have an index of 0. Flows only start from them
        if (flowsToStage.length === 0) {
            ret = {
                ...ret,
                index: 0
            }
        }
        return ret
    })

    sankeyStages.forEach(item => {item.color = getColor(item.name)})
    // Attribute an index to each stage. If a stage with index N give a flow to another stage it will have index N + 1
    for (let idx = 0; idx < 15; idx++) {
        const stages = sankeyStages.filter(sStage => sStage.index === idx)
        const outStages = [... new Set(stages.reduce((arr, stage) => arr.concat(stage.outStages), []))]
        if (outStages.length === 0) {
            break
        }
        for (const toStage of outStages) {
            let tmpStage = sankeyStages.find(stage => stage.name === toStage)
            if (!tmpStage.index) {
                tmpStage.index = idx + 1
            }
        }
    }

    result.series.levels = sankeyStages.map(sStage => ({
        depth: sStage.index,
        lineStyle: {
            color: 'source',
            opacity: 0.4
        }
    }))

    const maxDepth = Math.max(...sankeyStages.map(sStage => sStage.index))
    result.series.maxDepth = maxDepth + 1
    // It looks like in echarts, "nodes" key can also be named "data"
    result.series.nodes = actors.map((actor) => {
        const sankeyStage = sankeyStages.find(sStage => sStage.name === actor.stage)
        if (!sankeyStage) {
            console.log("Stage not found for", actor)
        }
        return {
            "name": actor.name,
            "depth": sankeyStage ? sankeyStage.index : maxDepth + 1, // Actor with unknown stages will be at far right,
            itemStyle: {
                color: sankeyStage.color
            }
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
            "target": targetActor? targetActor.name : buyerActorName,
            "value": Math.log(flow[sankeyDisplayMode]),
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
                            value: prettyAmount.value(params.data["Monetary value"], monetaryCurrency)
                        },
                        {
                            label: "Products",
                            value: params.data['Products']
                        },
                        {
                            label: "Unitary price (local curency)",
                            value: prettyAmount.value(params.data['Unitary price (local curency)'], monetaryCurrency)
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
    console.log("sankey chart options:", result)
    return result;
}
