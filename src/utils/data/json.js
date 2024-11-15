import jsonData from '@data/data.json'

export function getAllJsonData() {
  const localStudyProperties = localStorage.getItem('localStudyData')
  const localStudy = localStudyProperties ? JSON.parse(localStudyProperties) : null
  if (!localStudy) {
    return jsonData
  }

  const category = jsonData.categories.find(
    (category) => category.prettyName === localStudy.category
  )
  return {
    ...jsonData,
    studies: [
      ...jsonData.studies,
      {
        category: category ? category.id : 'unknown',
        country: localStudy.country?.toLowerCase(),
        id: localStudy.id,
        product: localStudy.commodity?.toLowerCase(),
        title: ['Local', localStudy.commodity].join(' '),
        year: localStudy.year,
        local: true
      }
    ]
  }
}

export function getCountries() {
  return jsonData.countries
}

export function getAllKnownProducts() {
  return jsonData.categories.reduce((arr, item) => arr.concat(item.commodities), [])
}

export function getCountry(countryId) {
  return getCountries().find((country) => country.id === countryId)
}

export function getProduct(productId) {
  const jsonProducts = jsonData.products
  return jsonProducts.find((product) => product.id === productId)
}

export function getStudy(studyId) {
  const jsonStudies = jsonData.studies
  return jsonStudies.find((study) => study.id === studyId)
}

export function getProductStudies(productId) {
  return jsonData.studies.filter((study) => study.product === productId).map((study) => study.id)
}

export function getCountryStudies(countryId) {
  return jsonData.studies.filter((study) => study.country === countryId).map((study) => study.id)
}
