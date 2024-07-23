export const getLink = (study, currency) => `/study?id=${study.local ? 'localStorage' : study.id}&currency=${currency}`

export function getStudyListQueryString(studyIds) {
    return studyIds.join(",");
}
export function extractStudiesFromQueryString(queryString) {
    return queryString.split(",");
}
