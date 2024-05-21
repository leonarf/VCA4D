<template>
  <article>
    <SectionTitle>
      <h1>Is the value chain environmentally sustainable?</h1>
    </SectionTitle>

    <h2>Which sub-chain contributes the most to environmental impacts ?</h2>
    <p>
      Environmental sustainability of a value chain should rather be assessed by product. And yet,
      specific policies or project may be developped in order to improve the sustainability of a
      step or of some actors to improve the overall sustainability of the value chain.
    </p>
    <div class="flex flex-row justify-center gap-x-20">
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
