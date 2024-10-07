const SOCIAL_COLORS = {
  BadScoreRed: "#ff8c8c",
  LowScoreOrange: "#ffdd75",
  SubstantialScoreYellow: "#aee376",
  HighScoreGreen : "#67db9c",
}

const average = (array) => array.reduce((a, b) => a + b) / array.length

export function getSocialAverageGroup(socialImpact) {
  return Math.round(average(socialImpact.groups.map(group => Number(group.averageValue) || 0)), 2);
}
export const getSocialScoreColor = (value) => {
  if (value < 1.5) {
    return SOCIAL_COLORS["BadScoreRed"]
  }
  else if (value < 2.5) {
    return SOCIAL_COLORS["LowScoreOrange"]
  }
  else if (value < 3.5) {
    return SOCIAL_COLORS["SubstantialScoreYellow"]
  }
  else {
    return SOCIAL_COLORS["HighScoreGreen"]
  }
}
