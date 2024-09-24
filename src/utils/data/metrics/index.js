import { buildBenefitCostRatioData } from "./eco/benefitCostRatio.js";
import { buildGlobalEmploymentData } from "./eco/employment.js";
import { buildNetOperatingProfitPerActor } from "./eco/netOperatingProfitPerActor.js";

export function computeMetrics(studyData) {
  return {
    eco: buildEcoMetrics(studyData)
  }
}

function buildEcoMetrics(studyData) {
  if (! studyData.ecoData) { return null; }

  return {
    benefitCostRatio: buildBenefitCostRatioData(studyData.ecoData),
    employment: buildGlobalEmploymentData(studyData.ecoData),
    netOperatingProfitPerActor: buildNetOperatingProfitPerActor(studyData.ecoData)
  };
}
