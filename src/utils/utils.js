var StagesColors = {
    Producers: "#33A027",
    Collectors: "#ECD736",
    Processors: "#fbb02d",
    Wholesalers: "#2932D7",
    Retailers: "#384d48",
    Exporters: "#b57ba6"
}

const getStageColor = (stageName) => {
    if (stageName in StagesColors) {
        return StagesColors[stageName]
    }
    return "#ff1100"
}

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

var Inconsistencies = new Set()

const compareActor = (actorA, actorB) => {
    if (actorA["Stage"] in StagesWithOrder && actorB["Stage"] in StagesWithOrder) {
        if (StagesWithOrder[actorA["Stage"]] < StagesWithOrder[actorB["Stage"]]) {
            return -1;
        }
        if (StagesWithOrder[actorA["Stage"]] > StagesWithOrder[actorB["Stage"]]) {
            return 1;
        }
    }
    else if (actorA["Stage"] in StagesWithOrder) {
        Inconsistencies.add(`Stage '${actorB["Stage"]}' of actor ${actorB["Actor type name"]} is not defined in Stage description`)
        return -1
    }
    else if (actorB["Stage"] in StagesWithOrder) {
        Inconsistencies.add(`Stage '${actorA["Stage"]}' of actor ${actorA["Actor type name"]} is not defined in Stage description`)
        return 1
    }
    // a doit être égal à b
    return 0;
}

const compareRow = (rowA, rowB) => {
    if (rowA["Actor type name"] in ActorsWithOrder && rowB["Actor type name"] in ActorsWithOrder) {
        if (ActorsWithOrder[rowA["Actor type name"]] < ActorsWithOrder[rowB["Actor type name"]]) {
            return -1;
        }
        if (ActorsWithOrder[rowA["Actor type name"]] > ActorsWithOrder[rowB["Actor type name"]]) {
            return 1;
        }
    }
    else if (rowA["Actor type name"] in ActorsWithOrder) {
        Inconsistencies.add(`Actor '${rowB["Actor type name"]}' is not defined in Actors description`)
        return -1
    }
    else if (rowB["Actor type name"] in ActorsWithOrder) {
        Inconsistencies.add(`Actor '${rowA["Actor type name"]}' is not defined in Actors description`)
        return 1
    }
    // a doit être égal à b
    return 0;
}

const sortDataStudyArrays = (dataStudy) => {
    Inconsistencies = new Set()
    // Get order of stagesProcessors
    StagesWithOrder = {}
    var order = 1
    for (var stageDescription of dataStudy["Stages description"]) {
        StagesWithOrder[stageDescription["Stages"]] = order
        order++
    }
    dataStudy["Actor types"].sort(compareActor)

    // Define actors order based on stages order
    ActorsWithOrder = {}
    order = 1
    for (var actorDescription of dataStudy["Actor types"]) {
        ActorsWithOrder[actorDescription["Actor type name"]] = order
        order++
    }

    // sort dataStudy content
    dataStudy["Indicator by actor type"].sort(compareRow)
    console.log("Incohérences détectées dans les données:", Inconsistencies)
}

export default {
    getCorrespondingStage,
    getStageColor,
    sortDataStudyArrays
};
