
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



export const getStageColor = (stageName) => {
  if (stageName in StagesColors) {
    return StagesColors[stageName]
  }
  return "#ff1100"
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