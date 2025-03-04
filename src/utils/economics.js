export const getTotalAddedValue = (study) =>
  study.ecoData?.actors
    .map((actor) => actor.directAddedValue || 0)
    .reduce((res, curr) => res + curr, 0)
