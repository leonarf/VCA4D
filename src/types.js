/**
 * @typedef { 'cashew-mali-2021' | 'autre' } StudyId
 */

/**
 * @typedef {Object} PerStepImpact
 * @property {number} `Agricultural-production`
 * @property {number} `Collection`
 * @property {number} `Processing`
 * @property {number} `Retail`
 * @property {number} `Export`
 * @property {number} `Transport`
 */

/**
 * @typedef {Object} EnvironmentImpactsMidPoints
 * @property {PerStepImpact} `Global-warming`
 * @property {PerStepImpact} `Stratospheric-ozone-depletion`
 * @property {PerStepImpact} `Ionizing-radiation`
 * @property {PerStepImpact} `Ozone-formation-human-health`
 */

/**
 * @typedef {Object} EnvironmentImpactsHumanHealthImpacts
 * @property {PerStepImpact} `Global-warming-human-health`
 * @property {PerStepImpact} `Stratospheric-ozone-depletion`
 * @property {PerStepImpact} `Ionizing-radiation`
 * @property {PerStepImpact} `Ozone-formation-human-health`
 * @property {PerStepImpact} `Fine-particulate-matter-formation`
 * @property {PerStepImpact} `Human-carcinogenic-toxicity`
 * @property {PerStepImpact} `Human-non-carcinogenic-toxicity`
 * @property {PerStepImpact} `Water-consumption-human-health`
 */


/**
 * @typedef {Object} EnvironmentImpacts
 * @property {EnvironmentImpactsMidPoints} `mid-points`
 * @property {EnvironmentImpactsHumanHealthImpacts} `human-health`
 */

/**
 * @typedef {Object} StudyEnvironment
 * @property {string[]} brief
 * @property {EnvironmentImpacts} impacts
 */

/**
 * @typedef {Object} Study
 * @property {string} country
 * @property {string} product
 * @property {number} year
 * @property {StudyEnvironment} environment
 */
