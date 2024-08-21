import { buildReturnOnInvestmentData } from "./eco/returnOnInvestment";

export function computeMetrics(studyData) {
  return {
    eco: buildEcoMetrics(studyData)
  }
}

function buildEcoMetrics(studyData) {
  if (! studyData.ecoData) { return null; }

  return {
    returnOnInvestment: buildReturnOnInvestmentData(studyData.ecoData)
  };
}
