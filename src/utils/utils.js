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

export default {
    getStageColor
};
