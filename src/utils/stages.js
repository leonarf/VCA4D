const PRETTY_NAME_BY_STEP = {
  'Producers': 'Production',
  'Collectors': 'Collection',
  'Processors': 'Processing',
  'Wholesalers': 'Wholesaling',
  'Retailers': 'Retailing',
  'End use': 'End use'
};

export const STAGES = Object.keys(PRETTY_NAME_BY_STEP);

export function getStageLabel(stageKey) {
  return PRETTY_NAME_BY_STEP[stageKey];
}
