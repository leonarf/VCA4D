import _ from "lodash";

const ALL_EMPLOYMENT_TYPES = ["tempFemale", "tempMale", "unskilledFemale", "unskilledMale", "skilledFemale", "skilledMale"];
const FEMALE_EMPLOYMENT_TYPES = ["tempFemale", "unskilledFemale", "skilledFemale"];

export function buildGlobalEmploymentData(ecoData) {
  const actors = ecoData.actors;
  if (! actors) { return null; }

  const totalEmployments = sumActorsEmployments(actors, ALL_EMPLOYMENT_TYPES)
  return {
    femaleRatio: sumActorsEmployments(actors, FEMALE_EMPLOYMENT_TYPES) / totalEmployments
  }
}

function sumActorsEmployments(actors, employmentTypes) {
  return _.sumBy(actors, sumActorEmployment);

  function sumActorEmployment(actor) {
    if (! actor.employment) { return 0; }

    return _.sumBy(employmentTypes, type => actor.employment[type] || 0);
  }
}
