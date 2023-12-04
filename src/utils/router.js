export const getLink = (study, currency) => `/study?id=${study.local ? 'localStorage' : study.id}&currency=${currency}`
