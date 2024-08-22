export function buildDepthByActor(actors, flows) {
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

  const depthByActor = {};
  const maxDepth = Math.max(...sankeyStages.map(sStage => sStage.index))
  actors.forEach((actor) => {
    const sankeyStage = sankeyStages.find(sStage => sStage.name === actor.stage)
    depthByActor[actor.id] = sankeyStage ? sankeyStage.index : maxDepth + 1; // Actor with unknown stages will be at far right,
  });

  return depthByActor;
}
