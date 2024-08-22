import _ from "lodash";

export function buildDepthByActor(actors, flows) {
  const { edges, nodes } = buildNodesAndEdges(actors, flows);
  const {
    childNodesByNode,
    sourceNodes
   } = parseGraph(nodes, edges);

  const depthByNode = buildDepthForLinkedNodes(sourceNodes, { childNodesByNode });
  assignMaximumDepthToRemainingNodes(depthByNode, nodes);

  return depthByNode;
}

function buildDepthForLinkedNodes(sourceNodes, { childNodesByNode, parentNodesByNode }) {
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

function parseGraph(nodes, edges) {
  const childNodesByNode = {};
  const parentNodesByNode = {};
  edges.forEach(([sourceNode, targetNode]) => {
    addToNodesDictionary(childNodesByNode, { key: sourceNode, value: targetNode });
    addToNodesDictionary(parentNodesByNode, { key: targetNode, value: sourceNode });
  });

  return {
    childNodesByNode,
    sourceNodes: getNodesWithoutParents(nodes, parentNodesByNode)
  };

  function addToNodesDictionary(dictionary, { key, value }) {
    if (! dictionary[key]) { dictionary[key] = []; }

    dictionary[key] = _.uniq([...dictionary[key], value]) // In case there's several flows from and to the same nodes
  }
}
function getNodesWithoutParents(nodes, parentNodesByNode) {
  const nodesWithParents = Object.keys(parentNodesByNode).map(key => parseInt(key, 10));
  return _.difference(nodes, nodesWithParents);
}
