import { json } from 'd3-fetch'
export const LOCAL_STORAGE_ID = 'localStorage'
import { computeMetrics } from "./metrics";

const cachedDataByStudyId = {};

export const getStudyData = async (studyId) => {
    if (studyId === LOCAL_STORAGE_ID) {
        const localStudyData = localStorage.getItem('localStudyData')
        return localStudyData ? JSON.parse(localStudyData) : null
    }
    return fetchCachedStudyData(studyId);
}

async function fetchCachedStudyData(studyId) {
  if (cachedDataByStudyId[studyId]) { return cachedDataByStudyId[studyId]; }

  const data = await fetchedPopulatedStudyData(studyId);
  cachedDataByStudyId[studyId] = data;
  return data;
}

async function fetchedPopulatedStudyData(studyId) {
  let rawEcoData = await getStudyDataFromFileName(studyId, "eco")
  let rawSocialData = await getStudyDataFromFileName(studyId, "social")
  let rawAcvData = await getStudyDataFromFileName(studyId, "acv")

  const metaInfo = rawEcoData ? rawEcoData : rawSocialData ? rawSocialData : rawAcvData;
  const rawData = {
      ...metaInfo,
      ecoData: rawEcoData?.ecoData,
      socialData: rawSocialData?.socialData,
      acvData: rawAcvData?.acvData
  };
  return {
    ...rawData,
    metrics: computeMetrics(rawData)
  }
}

async function getStudyDataFromFileName(studyId, studyPart) {
  try {
    const result = await json(`${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-${studyPart}.json`)
      .then(json => json);
    return result;
  } catch {
    return undefined;
  }
}

export function logMissingData(studiesData) {
  const studiesWithMissingData = studiesData
    .map(inventoryMissingData)
    .filter(hasMissingData);
  
  // eslint-disable-next-line no-console
  console.log(formatReport(studiesWithMissingData));
}
function inventoryMissingData(studyData) {
  const missingDataKeys = ["ecoData", "socialData", "acvData"].filter(key => ! studyData[key]);

  return {
    id: studyData.id,
    missingDataKeys
  };
}
function hasMissingData({ missingDataKeys }) {
  return missingDataKeys.length !== 0;
}
function formatReport(studiesWithMissingData) {
  if (studiesWithMissingData.length === 0) { return ""; }

  return `Studies are missing data:\n`
    + studiesWithMissingData.map(({ id, missingDataKeys }) =>
        `- ${id} is missing: ${missingDataKeys.join(", ")}`
      ).join("\n");
}
