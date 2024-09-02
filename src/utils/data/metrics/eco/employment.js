import { sumEmployments } from "@utils/import/eco.js";

export function buildGlobalEmploymentData(ecoData) {
  const actors = ecoData.actors;
  if (! actors) { return null; }

  return {
    totalMale: sumEmployments(actors.map(actor => actor.employment?.totalMale)),
    totalFemale: sumEmployments(actors.map(actor => actor.employment?.totalFemale)),
    totalTemp: sumEmployments(actors.map(actor => actor.employment?.totalTemp)),
    totalSkilled: sumEmployments(actors.map(actor => actor.employment?.totalSkilled)),
    totalUnskilled: sumEmployments(actors.map(actor => actor.employment?.totalUnskilled)),
    total: sumEmployments(actors.map(actor => actor.employment?.total)),
  }
}
