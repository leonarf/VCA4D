import _ from "lodash";

const ALL_EMPLOYMENT_TYPES = ["tempFemale", "tempMale", "unskilledFemale", "unskilledMale", "skilledFemale", "skilledMale"];
const FEMALE_EMPLOYMENT_TYPES = ["tempFemale", "unskilledFemale", "skilledFemale"];

export function buildGlobalEmploymentData(ecoData) {
  const actors = ecoData.actors;
  if (! actors) { return null; }

  const totalEmployments = sumActorsEmployments(actors, ALL_EMPLOYMENT_TYPES)
  return {
    femaleRatio: sumActorsEmployments(actors, FEMALE_EMPLOYMENT_TYPES) / totalEmployments,
    employmentByStage: buildEmploymentByStage(actors),
  }
}

function sumActorsEmployments(actors, employmentTypes) {
  return _.sumBy(actors, actor => sumActorEmployment(actor, employmentTypes));
}

function sumActorEmployment(actor, employmentTypes) {
  if (! actor.employment) { return 0; }

  return _.sumBy(employmentTypes, type => actor.employment[type] || 0);
}

function buildEmploymentByStage(actors) {
  const employmentByStage = {};

  const stages = _.uniq(actors.map(actor => actor.stage));
  stages.forEach(stage => {
    const stageActors = actors.filter(actor => actor.stage === stage);
    employmentByStage[stage] = sumActorsEmploymentByType(stageActors);
  });

  return employmentByStage;
}
function sumActorsEmploymentByType(actors) {
  return {
    tempFemale: sumActorsEmployments(actors, ["tempFemale"]),
    tempMale: sumActorsEmployments(actors, ["tempMale"]),
    unskilledFemale: sumActorsEmployments(actors, ["unskilledFemale"]),
    unskilledMale: sumActorsEmployments(actors, ["unskilledMale"]),
    skilledFemale: sumActorsEmployments(actors, ["skilledFemale"]),
    skilledMale: sumActorsEmployments(actors, ["skilledMale"]),
    employmentActorDistribution: getEmploymentActorDistribution(actors),
  }
}
function getEmploymentActorDistribution(actors) {
  const actorsEmploymentDistribution = actors.map(actor => ({
    name: actor.name,
    total: sumActorEmployment(actor, ALL_EMPLOYMENT_TYPES)
  }));

  if (actorsEmploymentDistribution.some(actor => actor.total === 0)) { return null; }

  return actorsEmploymentDistribution;
}
