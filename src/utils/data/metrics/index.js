import { buildReturnOnInvestmentData } from "./eco/returnOnInvestment";

export function computeMetrics(studyData) {
  return {
    eco: {
      returnOnInvestment: buildReturnOnInvestmentData(studyData)
    }
  }
}
