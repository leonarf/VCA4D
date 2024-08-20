<template>
  <tr class="rounded">
      <td>
          <div class="subtitle">{{ title }}</div>
          <div class="definition">{{ subtitle }}</div>
      </td>
      <td v-for="(study, index) in studies" :key="`value_added__${study.id}`">
        <slot :value="values[index]"></slot>
      </td>
      <td></td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    studies: Array,
    title: String,
    subtitle: String,
    getValue: Function,
})

const values = computed(() => props.studies.map(study => props.getValue(study)))
</script>
