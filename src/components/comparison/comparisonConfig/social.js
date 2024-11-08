import { getSocialAverageGroup } from '@utils/social.js'

const SOCIAL_PARTS = [
  'Working conditions',
  'Land and water rights',
  'Gender equality',
  'Food and nutrition security',
  'Social capital',
  'Living conditions'
]

export const socialConfig = SOCIAL_PARTS.map((part, index) => ({
  title: part,
  getValue: (study) => getOptionalSocialAverageGroup(study.socialData?.[index]),
  getSubValues: (study) => getSocialAverageSubGroups(study.socialData?.[index]),
  format: 'social'
}))

function getOptionalSocialAverageGroup(socialImpact) {
  if (!socialImpact) {
    return null
  }

  return getSocialAverageGroup(socialImpact)
}

function getSocialAverageSubGroups(socialImpact) {
  if (!socialImpact) {
    return null
  }

  const socialAverageSubGroupsByName = {}
  socialImpact.groups.forEach((group) => {
    const groupTitleWithoutNumber = group.title.slice(4)
    socialAverageSubGroupsByName[groupTitleWithoutNumber] = Math.round(group.averageValue)
  })
  return socialAverageSubGroupsByName
}
