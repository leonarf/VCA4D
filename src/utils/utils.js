import { isProxy, toRaw } from 'vue';

const getCorrespondingStage = (actorTypeName, studyData) => {
    for (var stageDescription of studyData["Actor types"]) {
        if (stageDescription["Actor type name"] == actorTypeName) {
            return stageDescription["Stage"]
        }
    }
    return null
}

var StagesWithOrder = {}
var ActorsWithOrder = {}

var Inconsistencies = []

const compareActor = (actorA, actorB) => {
    if (actorA["Stage"] in StagesWithOrder && actorB["Stage"] in StagesWithOrder) {
        if (StagesWithOrder[actorA["Stage"]] < StagesWithOrder[actorB["Stage"]]) {
            console.log(actorA["Stage"], "beats", actorB["Stage"])
            return -1;
        }
        if (StagesWithOrder[actorA["Stage"]] > StagesWithOrder[actorB["Stage"]]) {
            console.log(actorB["Stage"], "beats", actorA["Stage"])
            return 1;
        }
    }
    else if(actorA["Stage"] in StagesWithOrder) {
        Inconsistencies.push(`Stage '${actorA["Stage"]} of actor ${actorA["Actor type name"]} is not defined in Stage description`)
        return -1
    }
    else if(actorB["Stage"] in StagesWithOrder) {
        Inconsistencies.push(`Stage '${actorB["Stage"]} of actor ${actorB["Actor type name"]} is not defined in Stage description`)
        return 1
    }
    // a doit être égal à b
    return 0;
}

const compareRow = (rowA, rowB) => {
    if (rowA["Actor type name"] in ActorsWithOrder && rowB["Actor type name"] in ActorsWithOrder) {
        if (ActorsWithOrder[rowA["Actor type name"]] < ActorsWithOrder[rowB["Actor type name"]]) {
            console.log(rowA["Actor type name"], "beats", rowB["Actor type name"])
            return -1;
        }
        if (ActorsWithOrder[rowA["Actor type name"]] > ActorsWithOrder[rowB["Actor type name"]]) {
            console.log(rowB["Actor type name"], "beats", rowA["Actor type name"])
            return 1;
        }
    }
    else if(rowA["Actor type name"] in ActorsWithOrder) {
        Inconsistencies.push(`Actor '${rowA["Actor type name"]} is not defined in Actors description`)
        return -1
    }
    else if(rowB["Actor type name"] in ActorsWithOrder) {
        Inconsistencies.push(`Actor '${rowB["Actor type name"]} is not defined in Actors description`)
        return 1
    }
    // a doit être égal à b
    return 0;
}

const sortDataStudyArrays = (dataStudy) => {
    // Get order of stages
    StagesWithOrder = {}
    var order = 1
    for (var stageDescription of dataStudy["Stages description"]) {
        StagesWithOrder[stageDescription["Stages"]] = order
        order++
    }
    console.log("orders", StagesWithOrder)
    dataStudy["Actor types"].sort(compareActor)

    // Define actors order based on stages order
    ActorsWithOrder = {}
    order = 1
    for (var actorDescription of dataStudy["Actor types"]) {
        ActorsWithOrder[actorDescription["Actor type name"]] = order
        order++
    }    
    console.log("orders", ActorsWithOrder)

    // sort dataStudy content
    dataStudy["Indicator by actor type"].sort(compareRow)
    console.log("Incohérences détectées dans les données:", Inconsistencies)
}

export default {
    getCorrespondingStage,
    sortDataStudyArrays
};
