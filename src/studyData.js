//@ts-check

import {json} from 'd3-fetch'

import './types.js'

/**
 * @param {any} data
 * @returns {data is StudyEnvironment}
 */
function isStudyEnvironment(data){
    console.log('data for StudyEnvironment', data)
    return Object(data) === data &&
        Array.isArray(data.brief) &&
        Object(data.impacts) === data.impacts // vérification faible. PPP : à améliorer
}


/**
 * @param {any} data
 * @returns {data is Study}
 */
function isStudy(data){
    console.log('data for Study', data)

    return Object(data) === data &&
        typeof data.country === 'string' &&
        typeof data.product === 'string' &&
        Number.isFinite(data.year) && data.year >= 2000 &&
        isStudyEnvironment(data.environment)
}


/**
 * 
 * @param {StudyId} studyId 
 * @returns {Promise<Study>}
 */
export default function getStudyData(studyId){
    console.log('getStudyData')
    return json(`../data/${studyId}.json`)
        .then(data => {
            if(isStudy(data))
                return data;
            else{
                throw new TypeError(`Données de l'étude ${studyId} mal formée`)
            }
        })
}
