const AVAILABLE_COLORS = {
  StageProducerGreen: '#6AAB9C',
  StageCollectorSalmon: '#FA9284',
  StageProcessorRed: '#E06C78',
  StageWholesalerBlue: '#5874DC',
  StageRetailerDarkBlue: '#384E78',
  StageEndUsePurple: '#9A6AB5',
  Grey: '#CACBCE',
  LightGrey: '#E1DFDF',
  Bronze: '#E5D08F',
  LightBronze: '#E3D4B6'
}

const FixedColorsMapping = {
  Producers: AVAILABLE_COLORS['StageProducerGreen'],
  Collectors: AVAILABLE_COLORS['StageCollectorSalmon'],
  Processors: AVAILABLE_COLORS['StageProcessorRed'],
  Wholesalers: AVAILABLE_COLORS['StageWholesalerBlue'],
  Retailers: AVAILABLE_COLORS['StageRetailerDarkBlue'],
  'End use': AVAILABLE_COLORS['StageEndUsePurple'],
  landOwnersFees: AVAILABLE_COLORS['Bronze'],
  depreciation: AVAILABLE_COLORS['LightBronze'],
  employeeWages: AVAILABLE_COLORS['Grey'],
  financialInstitutionsInterests: AVAILABLE_COLORS['LightGrey'],
  government: AVAILABLE_COLORS['SubstantialScoreYellow']
}

const DynamicColorsMapping = {}

export function getColor(itemName, isEnvironment) {
  if (isEnvironment) {
    return getEnvironmentDynamicColor(itemName)
  }
  return FixedColorsMapping[itemName] || AVAILABLE_COLORS.Grey
}

function getEnvironmentDynamicColor(itemName) {
  return DynamicColorsMapping[itemName] || findNewColor()

  function findNewColor() {
    const nextColorCode =
      Object.keys(DynamicColorsMapping).length % Object.keys(AVAILABLE_COLORS).length
    var pickedColorName = Object.keys(AVAILABLE_COLORS)[nextColorCode]
    DynamicColorsMapping[itemName] = AVAILABLE_COLORS[pickedColorName]
    return DynamicColorsMapping[itemName]
  }
}

export const COLORS_IMPORTED_PRODUCTS = ['#5F8A64', '#71A578', '#9DB95F', '#C1CC5E']
export const COLORS_EXPORTED_PRODUCTS = ['#b06245', '#C46D4D']
