var StagesColors = {
    Producers: "#33A027",
    Collectors: "#ECD736",
    Processors: "#fbb02d",
    Wholesalers: "#2932D7",
    Retailers: "#384d48",
    Exporters: "#b57ba6"
}

export const getStageColor = (stageName) => {
    if (stageName in StagesColors) {
        return StagesColors[stageName]
    }
    return "#ff1100"
}

export const formatNumber = (value) => {
    if (!value) {
        return '-'
    }
    let numberDigits = 0
    let divisor = 1
    let textUnit = ''
    if (value > 1e9) {
      numberDigits = 1
      divisor = 1e9
      textUnit = 'Billions'
    } else if (value > 1e6) {
      numberDigits = 1
      divisor = 1e6
      textUnit = 'Millions'
    } else if (value > 1e3) {
        numberDigits = 0
        divisor = 1e3
        textUnit = 'k'
      }
    return `${(value / divisor).toLocaleString(undefined, { maximumFractionDigits: numberDigits })} ${textUnit}`
}