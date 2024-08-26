import _ from "lodash";
import { useCurrencyUtils } from '@utils/format.js'
import { buildDepthByActor } from "./sankeyDepth";

export const getSankeyData = (actors, flows, { sankeyDisplayMode, monetaryCurrency }) => {
    const { prettyAmount } = useCurrencyUtils({currency: monetaryCurrency});
    

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
            nodeWidth: 20
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
                color: actor.color
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
            switch (params?.dataType) {
              case "node":
                const actor = actors.find((actor) => actor.name === params.data.name);
                return formatTooltip({
                  "Name": params.data.name,
                  "Stage": actor ? actor.stage : undefined
                });
              case "edge":
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
              default:
                return "";
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
