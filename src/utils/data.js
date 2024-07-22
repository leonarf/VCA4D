import { json } from 'd3-fetch'
import jsonData from '@data/data.json'

export const LOCAL_STORAGE_ID = 'localStorage'

const getStudyDataFromFileName = (studyId, studyPart) =>
    json(`${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-${studyPart}.json`).then(json => json)

export const getBriefPdfPath = async (studyId) => {
    let pdfUrl = `${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-brief-report.pdf`
    let res = await fetch(pdfUrl, { method: 'HEAD' })
    if (res.status === 200) {
        console.log("pdf found!!!", pdfUrl)
        return pdfUrl;
    }
    console.log("got status", res.status, "for pdf", pdfUrl)
    return null
}

export const getFullReportPdfPath = async (studyId) => {
    let pdfUrl = `${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-full-report.pdf`
    let res = await fetch(pdfUrl, { method: 'HEAD' })
    if (res.status === 200) {
        console.log("pdf found!!!", pdfUrl)
        return pdfUrl;
    }
    console.log("got status", res.status, "for pdf", pdfUrl)
    return null
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
        ecoData = await getStudyDataFromFileName(studyId, "eco")
    } catch {
        console.log(`did not find eco data for ${studyId}`)
    }
    try {
        socialData = await getStudyDataFromFileName(studyId, "social")
    } catch {
        console.log(`did not find social data for ${studyId}`)
    }
    try {
        acvData = await getStudyDataFromFileName(studyId, "acv")
    } catch {
        console.log(`did not find acv data for ${studyId}`)
    }
    const metaInfo = ecoData ? ecoData : socialData ? socialData : acvData

    let fullReportPdfUrl = await getFullReportPdfPath(studyId)
    let briefReportPdfUrl = await getBriefPdfPath(studyId)

    console.log("fullReportPdfUrl :", fullReportPdfUrl)
    return {
        ...metaInfo,
        ecoData: ecoData?.ecoData,
        socialData: socialData?.socialData,
        acvData: acvData?.acvData,
        fullReportPdfUrl: fullReportPdfUrl,
        briefReportPdfUrl: briefReportPdfUrl
    }
}

export const getAllJsonData = () => {
    const localStudyProperties = localStorage.getItem('localStudyData')
    const localStudy = localStudyProperties ? JSON.parse(localStudyProperties) : null
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

export const getAllKnownProducts = () => {
    return jsonData.categories.reduce((arr, item) => arr.concat(item.commodities), [])
}

export const getCountry = (countryId) => getCountries().find(country => country.id === countryId)

export function getProduct(productId) {
    const jsonProducts = jsonData.products;
    return jsonProducts.find(product => product.id === productId);
}

export function getStudy(studyId) {
    const jsonStudies = jsonData.studies;
    return jsonStudies.find(study => study.id === studyId);
}
