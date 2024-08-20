<template>
  <tr class="rounded">
      <td>
          <div class="subtitle">{{ title }}</div>
          <div class="definition">{{ subtitle }}</div>
      </td>
      <td v-for="(study, index) in studies" :key="`value_added__${study.id}`">
          <ComparisonDefaultCell
            :value="values[index]"
            :valueType="valueType"
            :reverseColors="reverseColors"
          />
      </td>
      <td></td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';
import ComparisonDefaultCell from './ComparisonDefaultCell.vue';

const props = defineProps({
    studies: Array,
    title: String,
    subtitle: String,
    getValue: Function,
    reverseColors: Boolean,
    valueType: {
      type: String,
      validator: (valueType) => ["percent", "number"].includes(valueType)
    }
})

const values = computed(() => props.studies.map(study => props.getValue(study)))
</script>
