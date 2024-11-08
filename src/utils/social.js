const SOCIAL_COLORS = {
  NA: '#D1D5DB',
  BadScoreRed: '#ff0000',
  LowScoreOrange: '#ffc000',
  SubstantialScoreYellow: '#92d050',
  HighScoreGreen: '#00b050'
}

const average = (array) => array.reduce((a, b) => a + b) / array.length

export function getSocialAverageGroup(socialImpact) {
  return Math.round(average(socialImpact.groups.map((group) => Number(group.averageValue) || 0)), 2)
}

const socialTagsConfig = {
  na: { color: SOCIAL_COLORS['NA'], appreciation: 'n/a' },
  bad: { color: SOCIAL_COLORS['BadScoreRed'], appreciation: 'Not at all' },
  moderate: { color: SOCIAL_COLORS['LowScoreOrange'], appreciation: 'Moderate/Low' },
  substantial: { color: SOCIAL_COLORS['SubstantialScoreYellow'], appreciation: 'Substantial' },
  high: { color: SOCIAL_COLORS['HighScoreGreen'], appreciation: 'High' }
}

export function getSocialScoreColor(value) {
  return getSocialConfig(value).color
}
export function getSocialScoreLabel(value) {
  return getSocialConfig(value).appreciation
}

export function getSocialConfig(value) {
  if (isNaN(value)) {
    return socialTagsConfig.na
  }

  if (value < 1.5) {
    return socialTagsConfig.bad
  } else if (value < 2.5) {
    return socialTagsConfig.moderate
  } else if (value < 3.5) {
    return socialTagsConfig.substantial
  } else {
    return socialTagsConfig.high
  }
}
