<template>
  <div>
    <h3>Main steps in the value chain</h3>
    <div class="flex flex-row flex-wrap gap-y-8 justify-evenly mt-4 mb-8">
      <div
        class="text-[#303030] text-center flex flex-col space-y-2 items-center max-w-[200px]"
        v-for="step in populatedSteps"
        :key="step.name"
      >
        <img
          style="height: 50px; width: 50px"
          :src="getStepLogo(step)"
          :alt="step.name + ' illustration'"
        />
        <div class="font-semibold">{{ step.name }}</div>
        <p class="text-center">{{ step.description || 'Pas de description' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import ProcessingLogo from '../images/icons/processing.svg'
import RetailLogo from '../images/icons/retail.svg'
import EndUseLogo from '../images/icons/end_use.svg'
import WholesaleLogo from '../images/icons/wholesale.svg'
import CollectionLogo from '../images/icons/collection.svg'
import ProductionLogo from '../images/icons/production.svg'
import ExportLogo from '../images/icons/export.svg'

const props = defineProps({
    stagesDescription: Object
})

const DISPLAY_STEPS = [
  'Producers',
  'Collectors',
  'Processors',
  'Wholesalers',
  'Retailers',
  'End use'
]

const populatedSteps = computed(() => {
  return props.stagesDescription
    .filter((stage) => DISPLAY_STEPS.includes(stage.name))
    .map((stage) => ({
      ...stage,
      image: ``
    }))
})

const getStepLogo = (step) => {
  switch (step.name) {
    case 'Producers':
      return ProductionLogo
    case 'Collectors':
      return CollectionLogo
    case 'Processors':
      return ProcessingLogo
    case 'Wholesalers':
      return WholesaleLogo
    case 'Retailers':
      return RetailLogo
    case 'Exporters':
      return ExportLogo
    case 'End use':
      return EndUseLogo
    default:
      return ''
  }
}
</script>

<style scoped lang="scss">
</style>
