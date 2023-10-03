
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
  
  const tagsColors = [
    "#ffac9e",
    "#fec875",
    "#d7e275",
    "#94d99d",
  ];
  
  export const getTagColor = (value) => tagsColors[parseInt(value)  - 1];
  
  export const COLORS_IMPORTED_PRODUCTS = ['#5F8A64', '#71A578', '#9DB95F', '#C1CC5E' ]
  export const COLORS_EXPORTED_PRODUCTS = ['#b06245', '#C46D4D']