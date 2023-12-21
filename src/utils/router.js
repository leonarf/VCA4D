export const getLink = (study, currency) => `/study?id=${study.local ? 'localStorage' : study.id}&currency=${currency}`

export const getCompareCountryLink = (countryId) => {
    const params = new URLSearchParams({
        country: countryId
    })
    return params.toString()
}

export const getCompareProductLink = (productId) => {
    const params = new URLSearchParams({
        product: productId
    })
    return params.toString()
}