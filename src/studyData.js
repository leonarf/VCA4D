//@ts-check

import {json} from 'd3-fetch'

/**
 * @typedef { 'cashew-mali-2021' | 'autre' } StudyId
 */

/**
 * @typedef {Object} Study
 * @property {string} country
 * @property {string} product
 * @property {number} year
 */

/**
 * @param {any} data
 * @returns {data is Study}
 */
export function isStudy(data){
    return Object(data) === data &&
        typeof data.country === 'string' &&
        typeof data.product === 'string' &&
        Number.isFinite(data.year) && data.year >= 2000;
}


/**
 * 
 * @param {StudyId} studyId 
 * @returns {Promise<Study>}
 */
export default function getStudyData(studyId){
    return json(`../data/${studyId}.json`)
        .then(data => {
            if(isStudy(data))
                return data;
            else{
                throw new TypeError(`Données de l'étude ${studyId} mal formée`)
            }
        })
}
