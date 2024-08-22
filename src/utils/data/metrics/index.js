import { buildBenefitCostRatioData } from "./eco/benefitCostRatio";

export function computeMetrics(studyData) {
  return {
    eco: buildEcoMetrics(studyData)
  }
}

function buildEcoMetrics(studyData) {
  if (! studyData.ecoData) { return null; }

  return {
    benefitCostRatio: buildBenefitCostRatioData(studyData.ecoData)
  };
}
