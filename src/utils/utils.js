var StagesColors = {
    Producers: "#6AAB9C",
    Collectors: "#FA9284",
    Processors: "#E06C78",
    Wholesalers: "#5874DC",
    Retailers: "#384E78",
    Exporters: "#b57ba6",
    landOwnersFees: "#e5d08f",
    depreciation: "#e3d4b6",
    employeeWages: "#cacbce",
    financialInstitutionsInterests: "#e1dfdf"
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

export const formatPercent = (amount) => {
  return amount.toFixed(2) + '%'
}