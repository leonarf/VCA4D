import _ from 'lodash'

export function getAllSubKeys(studies, getSubValues) {
  const subValues = studies.map((study) => getSubValues(study, studies))
  return _.union(...subValues.map(Object.keys))
}
