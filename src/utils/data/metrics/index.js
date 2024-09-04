import { buildBenefitCostRatioData } from "./eco/benefitCostRatio.js";
import { buildGlobalEmploymentData } from "./eco/employment.js";

export function computeMetrics(studyData) {
  return {
    eco: buildEcoMetrics(studyData)
  }
}

function buildEcoMetrics(studyData) {
  if (! studyData.ecoData) { return null; }

  return {
    benefitCostRatio: buildBenefitCostRatioData(studyData.ecoData),
    employment: buildGlobalEmploymentData(studyData.ecoData)
  };
}
