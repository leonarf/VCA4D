import _ from 'lodash'

export function buildNetOperatingProfit(ecoData) {
  const actors = ecoData.actors
  if (!actors) {
    return null
  }
  const stages = _.uniq(actors.map((actor) => actor.stage))

  const netOperatingProfitByStage = {}

  stages.forEach((stageName) => {
    const stageActors = actors.filter((actor) => actor.stage === stageName)
    const subTotalOperatingProfit = _.sumBy(stageActors, (actor) => actor.netOperatingProfit || 0)
    const subTotalNumberOfActors = _.sumBy(stageActors, (actor) => actor.numberOfActors || 0)
    const partialStageActors = stageActors.map((actor) => ({
      name: actor.name,
      netOperatingProfit: actor.netOperatingProfit,
      numberOfActors: actor.numberOfActors
    }))

    if (subTotalOperatingProfit !== 0 && subTotalNumberOfActors !== 0) {
      netOperatingProfitByStage[stageName] = {
        totalProfit: subTotalOperatingProfit,
        profitPerActor: subTotalOperatingProfit / subTotalNumberOfActors,
        stageActors: partialStageActors
      }
    }
  })

  return netOperatingProfitByStage
}
