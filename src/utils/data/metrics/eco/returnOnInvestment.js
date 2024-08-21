import _ from "lodash";

export function buildReturnOnInvestmentData(studyData) {
  const stages = studyData.ecoData.stages;
  const actors = studyData.ecoData.actors;

  return {
    stages: stages.map(stage => buildStageReturnOnInvestmentData(stage, actors))
  }
}

function buildStageReturnOnInvestmentData(stage, actors) {
  const stageActors = actors.filter((actor) => actor.stage === stage.name).map(buildActorReturnOnInvestmentData);

  const netOperatingProfits = _.sumBy(stageActors, "netOperatingProfits");
  const totalCosts = _.sumBy(stageActors, "totalCosts");

  return {
    name: stage.name,
    actors: stageActors,
    netOperatingProfits,
    totalCosts,
    benefitCostRatio: netOperatingProfits / totalCosts,
  }
}

function buildActorReturnOnInvestmentData(actor) {
  const netOperatingProfits = actor.netOperatingProfit || 0;
  let totalCosts = actor.totalCosts;

  if (actor.stage === 'Producers') {
    totalCosts += netOperatingProfits;
  }
  return {
    name: actor.name,
    stage: actor.stage,
    netOperatingProfits,
    totalCosts,
    benefitCostRatio: netOperatingProfits / totalCosts,
  };
}
