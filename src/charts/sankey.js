import _ from "lodash";
import { useCurrencyUtils } from '@utils/format.js'
import { getColor } from '@utils/colors.js'
import { buildDepthByActor } from "./sankeyDepth";

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
    const depthByActor = buildDepthByActor(actors, flows);
    
    result.series.levels = _.orderBy(_.uniq(Object.values(depthByActor)))
      .map((_depth, index) => ({
        depth: index,
        lineStyle: {
            color: 'source',
            opacity: 0.4
        }
    }))
    result.series.maxDepth = Math.max(...Object.values(depthByActor));
    // It looks like in echarts, "nodes" key can also be named "data"
    result.series.nodes = actors.map((actor) => {
        return {
            "name": actor.name,
            "depth": depthByActor[actor.id],
            itemStyle: {
                color: getColor(actor.stage)
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
        formatter: (params) => {
            if (params?.dataType === "node" || params?.dataType === "edge"){
                if (params?.dataType === "node"){
                    const actorStage = actors.find((actor) => actor.name === params.data.name);
                    const actorStageLabel = actorStage ? actorStage.stage : undefined;
                    return formatTooltip({
                      "Name": params.data.name,
                      "Stage": actorStageLabel
                    });
                }
                else if (params?.dataType === "edge"){
                  return formatTooltip({
                    "Source": params.data.source,
                    "Target": params.data.target,
                    "Monetary value": prettyAmount.value(params.data["Monetary value"], monetaryCurrency),
                    "Products": params.data['Products'],
                    "Unitary price (local curency)": prettyAmount.value(params.data['Unitary price (local curency)'], monetaryCurrency),
                    "Volume exchanged (kg Of product)": params.data['Volume exchanged (kg Of product)'],
                    "Volume unit": params.data['Volume unit'],
                    "Remark": params.data['Remark'],
                  });
                }
            }
            else {
                return '';
            }
        }
    };
    console.log("sankey chart options:", result)
    return result;
}

function formatTooltip(items) {
  const tooltipItems = Object.entries(items)
    .map(([itemLabel, itemValue]) => formatTooltipItem(itemLabel, itemValue));

  return `
    <div style='max-width: 400px; white-space: normal;'>
      <ul style='list-style: initial; margin: 0 10px; padding: initial;'>
        ${tooltipItems.join('')}
      </ul>
    </div>
  `;
}
function formatTooltipItem(label, value) {
  return `
    <li><strong>${label}</strong>: ${value}</li>
  `;
}
