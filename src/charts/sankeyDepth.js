import _ from "lodash";

// This is similar to what echarts does if we don't provide `depth`.
// However there's a few tweaks that help our case here
// - This allows us to define `series.maxDepth` to better scale the sankey, sicne we know the maximum depth
// - This allows us to force Producers to be on the left (if there's any loop, echarts might decide otherwise)

export function buildDepthByActor(actors, flows) {
  const { edges, nodes } = buildNodesAndEdges(actors, flows);
  console.log(edges, nodes);
  const { childNodesByNode } = parseGraph(edges);

  const sourceNodes = getSourceNodes(actors);
  const depthByNode = buildDepthForLinkedNodes(sourceNodes, { childNodesByNode });
  assignMaximumDepthToRemainingNodes(depthByNode, nodes);
  return depthByNode;
}

function buildDepthForLinkedNodes(sourceNodes, { childNodesByNode }) {
  const depthByNode = {};
  sourceNodes.forEach(sourceNode => markNodeDepthAsMinimum(sourceNode, 0, []));
  return depthByNode;

  function markNodeDepthAsMinimum(node, minimumDepth, ancestryNodes) {
    if (ancestryNodes.includes(node)) { return; } // Stop the loop

    if (_.isUndefined(depthByNode[node])) {
      depthByNode[node] = 0; 
    }
    depthByNode[node] = Math.max(depthByNode[node], minimumDepth);

    if (! childNodesByNode[node]) { return; }
    childNodesByNode[node].forEach(childNode => markNodeDepthAsMinimum(childNode, minimumDepth + 1, [...ancestryNodes, node]));
  }
}

function assignMaximumDepthToRemainingNodes(depthByNode, nodes) {
  const maxLinkedDepth = Math.max(...Object.values(depthByNode)); 
  const nodesWithoutDepth = _.difference(nodes, Object.keys(depthByNode).map(key => parseInt(key, 10)));
  nodesWithoutDepth.forEach(node => {
    depthByNode[node] = maxLinkedDepth + 1;
  });
}

function buildNodesAndEdges(actors, flows) {
  const edges = flows.map(flow => {
    const sourceActor = actors.find(actor => actor.name === flow.sellerActorName);
    const targetActor = actors.find(actor => actor.name === flow.buyerActorName);
    return [sourceActor.id, targetActor.id];
  });
  const nodes = actors.map(actor => actor.id);

  return { nodes, edges };
}

function parseGraph(edges) {
  const childNodesByNode = {};
  edges.forEach(([sourceNode, targetNode]) => {
    addToNodesDictionary(childNodesByNode, { key: sourceNode, value: targetNode });
  });

  return { childNodesByNode };

  function addToNodesDictionary(dictionary, { key, value }) {
    if (! dictionary[key]) { dictionary[key] = []; }

    dictionary[key] = _.uniq([...dictionary[key], value]) // In case there's several flows from and to the same nodes
  }
}

function getSourceNodes(actors) {
  const producers = actors.filter(actor => actor.stage === "Producers");
  
  const sourceActors = producers.length ? producers : actors;

  return sourceActors.map(actor => actor.id);
}
