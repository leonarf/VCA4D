import _ from "lodash";

export function buildBenefitCostRatioData(ecoData) {
  const stages = ecoData.stages;
  const actors = ecoData.actors;

  const stagesData = stages.map(stage => buildStageBenefitCostRatioData(stage, actors))
  return {
    benefitCostRatio: buildStudyBenefitCostRatio(stagesData),
    stages: stagesData
  }
}

function buildStageBenefitCostRatioData(stage, actors) {
  const stageActors = actors.filter((actor) => actor.stage === stage.name).map(buildActorBenefitCostRatioData);

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

function buildStudyBenefitCostRatio(stagesData) {
  const netOperatingProfits = _.sumBy(stagesData, "netOperatingProfits");
  const totalCosts = _.sumBy(stagesData, "totalCosts");

  return netOperatingProfits / totalCosts;
}

function buildActorBenefitCostRatioData(actor) {
  const netOperatingProfits = actor.netOperatingProfit || 0;
  let totalCosts = actor.totalCosts;

  if (paysThemselvesWithProfits(actor)) {
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

function paysThemselvesWithProfits(actor) {
  return actor.stage === 'Producers';
}
