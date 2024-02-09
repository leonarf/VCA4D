import {json} from 'd3-fetch'
import jsonData from '@data/data.json'

export const LOCAL_STORAGE_ID = 'localStorage'

const getStudyDataFromFileName = (fileName) => json(`${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${fileName}.json`).then(json => json)

export const getStudiesByCountry = async (countryId) => {
    const studyIds = jsonData.studies.filter(study => study.country === countryId).map(study => study.id)
    let ret = []
    for (const studyId of studyIds) {
        const study = await getStudyData(studyId)
        ret.push(study)
    }
    return ret
}

export const getStudiesByProduct = async (productId) => {
    const studyIds = jsonData.studies.filter(study => study.product === productId).map(study => study.id)
    let ret = []
    for (const studyId of studyIds) {
        const study = await getStudyData(studyId)
        ret.push(study)
    }
    return ret
}

export const getStudyData = async (studyId) => {

    if (studyId === LOCAL_STORAGE_ID) {
        const localStudyData = localStorage.getItem('localStudyData')
        return localStudyData ? JSON.parse(localStudyData) : null
    }
    let ecoData = undefined
    let socialData = undefined
    let acvData = undefined
    try {
        ecoData = await getStudyDataFromFileName(`${studyId}-eco`)
    } catch {
        console.log(`did not find eco data for ${studyId}`)
    }
    try {
        socialData = await getStudyDataFromFileName(`${studyId}-social`)
    } catch {
        console.log(`did not find social data for ${studyId}`)
    }
    try {
        acvData = await getStudyDataFromFileName(`${studyId}-acv`)
    } catch {
        console.log(`did not find acv data for ${studyId}`)
    }
    const metaInfo = ecoData ? ecoData : socialData ? socialData : acvData
    return {
        ...metaInfo,
        ecoData: ecoData?.ecoData,
        socialData: socialData?.socialData,
        acvData: acvData?.acvData
    }
}

export const getAllJsonData = () => {
    const localStudyProperties = localStorage.getItem('localStudyProperties')
    const localStudy = localStudyProperties ?  JSON.parse(localStudyProperties) : null
    if (!localStudy) {
        return jsonData
    }

    const category = jsonData.categories.find(category => category.prettyName === localStudy.category)
    return {
        ...jsonData,
        studies: [
            ...jsonData.studies,
            {
                category: category ? category.id : 'unknown',
                country: localStudy.country?.toLowerCase(),
                id: localStudy.id,
                product: localStudy.commodity?.toLowerCase(),
                title: ["Local", localStudy.commodity].join(' '),
                year: localStudy.year,
                local: true
            }
        ]
    }
}

export const getCountries = () => {
    return jsonData.countries
}

export const getCountry = (countryId) => getCountries().find(country => country.id === countryId)
