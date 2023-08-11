//@ts-check

import {json} from 'd3-fetch'

export default function getStudyData(fileName){
    return json(`../data/${fileName}.json`).then(json => json)
}
