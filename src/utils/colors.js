const AVAILABLE_COLORS = {
  StageProducerGreen : "#6AAB9C",
  StageCollectorSalmon : "#FA9284",
  StageProcessorRed : "#E06C78",
  StageWholesalerBlue : "#5874DC",
  StageRetailerDarkBlue : "#384E78",
  Grey : "#CACBCE",
  LightGrey : "E1DFDF",
  Bronze : "#E5D08F",
  LightBronze : "#E3D4B6",
  BadScoreRed: "#ffac9e",
  LowScoreOrange: "#fec875",
  SubstantialScoreYellow: "#d7e275",
  HighScoreGreen : "#94d99d",
}

var FixedColorsMapping = {
  Producers: AVAILABLE_COLORS["StageProducerGreen"],
  Collectors: AVAILABLE_COLORS["StageCollectorSalmon"],
  Processors: AVAILABLE_COLORS["StageProcessorRed"],
  Wholesalers: AVAILABLE_COLORS["StageWholesalerBlue"],
  Retailers: AVAILABLE_COLORS["StageRetailerDarkBlue"],
  landOwnersFees: AVAILABLE_COLORS["Bronze"],
  depreciation: AVAILABLE_COLORS["LightBronze"],
  employeeWages:AVAILABLE_COLORS["Grey"],
  financialInstitutionsInterests: AVAILABLE_COLORS["LightGrey"]
}

var DynamicColorsMapping = {}

export const getColor = (itemName) => {
  if (itemName in FixedColorsMapping) {
    return FixedColorsMapping[itemName]
  }
  if (itemName in DynamicColorsMapping) {
    return DynamicColorsMapping[itemName]
  }
  var pickedColorName = Object.keys(AVAILABLE_COLORS)[Object.keys(DynamicColorsMapping).length % Object.keys(AVAILABLE_COLORS).length]
  console.log("Dynamically added color to item", itemName, pickedColorName)
  DynamicColorsMapping[itemName] = AVAILABLE_COLORS[pickedColorName]
  return DynamicColorsMapping[itemName]
}

const RING_COLORS = [
  '#8B0000',
  '#00008B',
  '#006400',
  '#4B0082',
  '#5A3A3A',
  '#008080'
]

let ringColors = {}
export const getRingColor = (name) => {
  if (!(name in ringColors)) {
    ringColors[name] = RING_COLORS[Object.keys(ringColors).length % RING_COLORS.length]
  }
  return ringColors[name]
} 

export const getSocialScoreColor = (value) => {
  if (value < 1.5) {
    return AVAILABLE_COLORS["BadScoreRed"]
  }
  else if (value < 2.5) {
    return AVAILABLE_COLORS["LowScoreOrange"]
  }
  else if (value < 3.5) {
    return AVAILABLE_COLORS["SubstantialScoreYellow"]
  }
  else {
    return AVAILABLE_COLORS["HighScoreGreen"]
  }
}

export const COLORS_IMPORTED_PRODUCTS = ['#5F8A64', '#71A578', '#9DB95F', '#C1CC5E']
export const COLORS_EXPORTED_PRODUCTS = ['#b06245', '#C46D4D']
