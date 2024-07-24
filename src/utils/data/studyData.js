import { json } from 'd3-fetch'

export const LOCAL_STORAGE_ID = 'localStorage'

const getStudyDataFromFileName = (studyId, studyPart) =>
    json(`${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-${studyPart}.json`).then(json => json)


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

    return {
        ...metaInfo,
        ecoData: ecoData?.ecoData,
        socialData: socialData?.socialData,
        acvData: acvData?.acvData
    }
}
