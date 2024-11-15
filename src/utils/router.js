export const getLink = (study) => `/study?id=${study.local ? 'localStorage' : study.id}`

export function getStudyListQueryString(studyIds) {
  return studyIds.join(',')
}
export function extractStudiesFromQueryString(queryString) {
  return queryString.split(',')
}
