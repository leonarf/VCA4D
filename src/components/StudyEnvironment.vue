<template>
  <article>
    <SectionTitle>
      <h1>Is the value chain environmentally sustainable?</h1>
    </SectionTitle>

    <h2>Which step in the chain has most impact ?</h2>
    <p>
      Environmental sustainability of a value chain should rather be assessed by product. And yet,
      specific policies or project may be developped in order to improve the sustainability of a
      step or of some actors to improve the overall sustainability of the value chain.
    </p>
    <template v-if="studyData">
      <div v-for="allImpactData, impactName in allBarChartsData" :key="impactName">
        <ImpactDataviz :impactData="allImpactData" :impactName="impactName"/>
      </div>
    </template>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import SectionTitle from '@typography/SectionTitle.vue'
import ImpactDataviz from '@/components/study/environment/ImpactDataviz.vue'
import { ACVImpacts } from '@/utils/misc.js'

const props = defineProps({
  studyData: Object
})

const allBarChartsData = computed(() => {
  var majorImpactsNames = ACVImpacts.map((impact) => impact.name)
  var impactsToDrawOnGraph = props.studyData.acvData.impacts.filter((impact) => {
    return majorImpactsNames.includes(impact.name)
  })

  var series = {}
  for (var impact of impactsToDrawOnGraph) {
    if (!(impact.name in series)) {
      series[impact.name] = {}
    }
    series[impact.name][impact.unit] = impact
  }
  return series
})
</script>

<style scoped lang="scss"></style>
