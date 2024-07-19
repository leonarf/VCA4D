<template>
  <article>
    <SectionTitle>
      <h1>Is the value chain environmentally sustainable?</h1>
    </SectionTitle>
    <p>
      The approach to evaluate the environmental sustainability of the value chain is twofold. 
    </p>
    <p>
      First, damages entailed by the VC operations are calculated on <strong>Resource depletion</strong>, 
      <strong>Ecosystem quality</strong> and <strong>Human health</strong>, as well as their contribution 
      to <trong>Climate Change</trong> through the quantitative <strong>Life Cycle Assessment (LCA)</strong>.
    </p>
    <p> 
      Second, an <strong>exploratory assessment of biodiversity risks is provided</strong>. 
      The appraisal of the environmental sustainability of the value chain is carried out by combining quantitative and qualitative data.
    </p>
    <p class="mt-4">
      LCA inventories the material and energy flows used, produced or released by the activities of the VC. 
      The substances emitted or consumed by the activities at each stage are recorded and measured. 
      According to their physical, chemical and biological nature, they activate cause-and-effect 
      chains that induce changes in the environment. These changes cause (or counteract) specific 
      environmental problems such as terrestrial acidification, freshwater deprivation or ecotoxicity.
    </p><p>
      LCA refers to the effects as <strong>“impacts”</strong> (the “midpoints” level). The consequences of these impacts 
      on Natural Resources, Ecosystem Quality and Human Health are referred to as <strong>“damage”</strong>. 
      LCA also enables to measure the contribution of the VC to climate change through its <strong>carbon footprint</strong>.

    </p>

    <QuestionTitle>Which sub-chain contributes the most to environmental impacts ?</QuestionTitle>
    <p>
      Sub-chains can be compared according to the damage they generate in the three areas of protection. 
      This highlights the gaps between them and helps determine actions for environmental improvements.
    </p>
    <div class="flex flex-row justify-center gap-x-20 mb-8 mt-4">
      <div class="flex flex-row justify-center gap-x-4">
          <label v-for="unit in units" :key="unit.value"
          :class="{
            'inline-block w-40 h-10 text-center py-2 border-2 rounded cursor-pointer text-black text-md': true,
            'border-blue-200 bg-blue-100': selectedUnit === unit.value,
            'border-gray-200 bg-gray-100': selectedUnit !== unit.value 
          }" 
            >
            <input
            type="radio"
            :id="unit.value"
            :value="unit.value"
            v-model="selectedUnit"
            name="radioGroup"
            class="hidden"
            />
            {{ unit.label }}
          </label>
      </div>
      <div class="flex flex-row justify-center gap-x-4">
          <label v-for="perUnit in perUnits" :key="perUnit.value"
          :class="{
            'inline-block w-40 h-10 text-center py-2 border-2 rounded cursor-pointer text-black text-md': true,
            'border-blue-200 bg-blue-100': selectedPerUnit === perUnit.value,
            'border-gray-200 bg-gray-100': selectedPerUnit !== perUnit.value 
          }" 
            >
            <input
            type="radio"
            :id="perUnit.value"
            :value="perUnit.value"
            v-model="selectedPerUnit"
            name="radioGroup"
            class="hidden"
            />
            {{ perUnit.label }}
          </label>
      </div>
    </div>
    <template v-if="studyData">
      <div v-for="impact in allBarChartsData" :key="impact.name">
        <ImpactDataviz :impact="impact" :per-unit="selectedPerUnit" :volumes="yearlyVolumes"/>
      </div>
    </template>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import SectionTitle from '@typography/SectionTitle.vue'
import ImpactDataviz from '@components/study/environment/ImpactDataviz.vue'
import { ACVImpacts } from '@utils/misc.js'
import QuestionTitle from "@components/study/QuestionTitle.vue"

const props = defineProps({
  studyData: Object
})

const allBarChartsData = computed(() => {
  var majorImpactsNames = ACVImpacts.map((impact) => impact.name)
  var impactsToDrawOnGraph = props.studyData.acvData.impacts.filter((impact) => {
    if (!majorImpactsNames.includes(impact.name)) {
      return false
    }
    return selectedUnit.value === "PT" ? (impact.unit === 'Pt') : (impact.unit !== 'Pt')
    })

  return impactsToDrawOnGraph
})

const yearlyVolumes = computed(() => {
  var result = {}
  props.studyData.acvData.valuechains.map(item => {
    result[item.name] = item.volume
  })
  return result
})

const units = [
  { label: 'Pt', value: 'PT' },
  { label: 'Other units', value: 'OTHER' },
];

const perUnits = [
  {
    label: "Per year", value: "year"},
    {label: "Per functional unit", value: "functional unit"}
]

const selectedUnit = ref(units[0].value); 
const selectedPerUnit = ref(perUnits[0].value); 

</script>

<style scoped lang="scss"></style>
