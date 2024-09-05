import _ from "lodash";
import { useCurrencyUtils, formatNumber } from '@utils/format.js'
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
            "value": flow[sankeyDisplayMode],
            "edgeLabel": {
                show: true,
                formatter: () => {
                    return product;
                },
            },
            "Monetary value": prettyAmount.value(monetaryValue, monetaryCurrency),
            "Volume exchanged (kg Of product)": formatNumber(volumeExchanged),
            "Products": product,
            "Unitary price (local curency)": prettyAmount.value(unitPrice, monetaryCurrency),
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
                return formatTooltip("Name", {
                  "Name": params.data.name,
                  "Stage": findActorStage(actors, params.data.name)
                });
              case "edge":
                return formatTooltip("Products", {
                  "Source": params.data.source,
                  "Target": params.data.target,
                  "Monetary value": params.data["Monetary value"],
                  "Products": params.data['Products'],
                  "Unitary price (local curency)": params.data['Unitary price (local curency)'],
                  "Volume exchanged (kg Of product)": params.data['Volume exchanged (kg Of product)'],
                  "Volume unit": params.data['Volume unit'],
                  "Remark": params.data['Remark'],
                });
              default:
                console.error("Unrecognized dataType");
            }
        }
    };
    return result;
}

function findActorStage(actors, actorName) {
  const actor = actors.find((actor) => actor.name === actorName);
  return actor ? actor.stage : undefined;
}

function formatTooltip(titleKey, items) {
  let listKeys = Object.keys(items);
  let title = null;
  if (listKeys.includes(titleKey)) {
    title = items[titleKey];
    listKeys = listKeys.filter(key => key !== titleKey);
  }
  const tooltipItems = listKeys
    .map((itemLabel) => formatTooltipItem(itemLabel, items[itemLabel]));

  return `
    <div style='max-width: 400px; white-space: normal;'>
      ${title ? `
        <div style='font-size: 16px; margin-bottom: 10px'>
          <strong>${title}</strong>
        </div>
      ` : ``}
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
