import { computed } from 'vue'

export function useActorsAndStages(props) {
  const stages = computed(() => props.studyData.ecoData.stages)
  const actors = computed(() => props.studyData.ecoData.actors)

  return {
    stages,
    actors
  }
}

export const ACVImpacts = [
  {
    name: 'Global warming',
    helpBoxText:
      "LCA measures the the Value Chain's contribution to climate change by a <b>carbon footprint</b>, translating all the GHG emissions into a quantity of released CO2 that would have the equivalent effect. The unit is kg of CO2 equivalent."
  },
  {
    name: 'Human health',
    label: 'Human health hazard',
    helpBoxText:
      'LCA aims at capturing negative effects on quality of life (morbidity) and life expectancy (mortality). The indicator is expressed by DALY (Disability Adjusted Loss of Life Years) that refers to Reduction of the potential number of healthy life years due to premature morbidity or mortality.'
  },
  {
    name: 'Ecosystems',
    label: 'Ecosystem degradation',
    helpBoxText:
      'LCA focuses on the impairment in the functions and structure of natural ecosystems through a variety of damage to all kinds of local wildlife species leading to loss integrated over time. The usual indicator that measures the impact on Ecosystem Quality is the Potentially Disappeared Fraction of species (PDF) during one year. The unit is expressed by “species.yr”.'
  },
  {
    name: 'Resources',
    label: 'Resources depletion',
    helpBoxText:
      'LCA aims at capturing depletion of resources by focusing on the level of non-renewable stocks and the rate of use of renewable resources to their replacement. The indicator is the increased cost to continue extractions which is expressed by US $.'
  }
]

export function clearLocalStorage() {
  localStorage.removeItem('localWorkbook')
  localStorage.removeItem('localStudyData')
}
