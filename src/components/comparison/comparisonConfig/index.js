import {
  economicsConfig,
  getJobsByStage,
  getNetOperatingProfitForOtherStages,
  getNetOperatingProfitPerProducer,
  getTotalJobs
} from './economics'
import {
  socialConfig,
  getOptionalSocialAverageGroup,
  getSocialAverageSubGroups,
  SOCIAL_PARTS
} from './social'
import { environmentConfig, getTotalImpacts, getValuesByImpact } from './environment'

export const comparisonConfig = {
  economics: economicsConfig,
  social: socialConfig,
  environment: environmentConfig
}

// WIP will be remvoed when we don't need them any longer
export {
  getJobsByStage,
  getNetOperatingProfitForOtherStages,
  getNetOperatingProfitPerProducer,
  getTotalJobs,
  getOptionalSocialAverageGroup,
  getSocialAverageSubGroups,
  SOCIAL_PARTS,
  getTotalImpacts,
  getValuesByImpact
}
