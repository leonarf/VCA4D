
const ADDITIONAL_COLORS = ["#e5d08f", "#e3d4b6",
  "#cacbce",
  "#e1dfdf"]

var StagesColors = {
  Producers: "#6AAB9C",
  Collectors: "#FA9284",
  Processors: "#E06C78",
  Wholesalers: "#5874DC",
  Retailers: "#384E78",
  Exporters: "#b57ba6",
  landOwnersFees: ADDITIONAL_COLORS[0],
  depreciation: ADDITIONAL_COLORS[1],
  employeeWages:ADDITIONAL_COLORS[2],
  financialInstitutionsInterests: ADDITIONAL_COLORS[3]
}

var ChainValuesColors = {}

export const addColorsForValueChains = (valuechains) => {
  // TODO remplir ChainValuesColors avec de bonnes couleurs en utilisant une heuristique basée sur l'impact de la chaîne de valeur si possible
  // Du genre + polluant = plus rouge
}


export const getStageColor = (stageName, isEnvironment = false) => {
  if (isEnvironment) {
    return getSubChainColor(stageName)
  }
  if (stageName in StagesColors) {
    return StagesColors[stageName]
  }
  if (stageName in ChainValuesColors) {
    return ChainValuesColors[stageName]
  }
  else {
    var pickedColor = ADDITIONAL_COLORS[Object.keys(ChainValuesColors).length % ADDITIONAL_COLORS.length]
    ChainValuesColors[stageName] = pickedColor
    return ChainValuesColors[stageName]
  }
  return "#ff1100"
}

const SUB_CHAIN_COLORS = [
  "#6AAB9C",
  "#FA9284",
  "#E06C78",
  "#5874DC",
  "#384E78",
  "#b57ba6",
]

const RING_COLORS = [
  '#8B0000',
  '#00008B',
  '#006400',
  '#4B0082',
  '#5A3A3A',
  '#008080'
]

let subChainsColors = {}
const getSubChainColor = (subchainName) => {
  if (!(subchainName in subChainsColors)) {
    subChainsColors[subchainName] = SUB_CHAIN_COLORS[Object.keys(subChainsColors).length % SUB_CHAIN_COLORS.length]
  }
  return subChainsColors[subchainName]

}

let ringColors = {}
export const getRingColor = (name) => {
  if (!(name in ringColors)) {
    ringColors[name] = RING_COLORS[Object.keys(ringColors).length % RING_COLORS.length]
  }
  return ringColors[name]
} 

export const addColors = (sankeyStages) => {
  let ret = sankeyStages.map(sStage => (sStage.name in StagesColors) ? ({...sStage, color: StagesColors[sStage.name]}) : sStage)
  
  const stagesWithNoColors = ret.filter(sStage => !sStage.color)
  stagesWithNoColors.map((stage, index) => {
    const color = ADDITIONAL_COLORS[index % ADDITIONAL_COLORS.length]
    ret = ret.map(sStage => sStage.name === stage.name ? {...sStage, color} : sStage)
  })
  return ret
}

const tagsColors = [
  "#ffac9e",
  "#fec875",
  "#d7e275",
  "#94d99d",
];

export const getTagColor = (value) => tagsColors[Math.round(value) - 1]

export const COLORS_IMPORTED_PRODUCTS = ['#5F8A64', '#71A578', '#9DB95F', '#C1CC5E']
export const COLORS_EXPORTED_PRODUCTS = ['#b06245', '#C46D4D']