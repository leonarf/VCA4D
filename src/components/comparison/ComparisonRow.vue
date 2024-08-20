<template>
  <tr class="rounded">
      <td>
          <div class="subtitle">{{ title }}</div>
          <div class="definition">{{ subtitle }}</div>
      </td>
      <td v-for="(study, index) in studies" :key="`value_added__${study.id}`">
          <div :class="getAddedValueClass(values[index])">
              {{ values[index] ? format(values[index]) : '-' }}
          </div>
      </td>
      <td></td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';
import { formatNumber, formatPercent } from '@utils/format.js'

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

function getAddedValueClass(value) {
  return getPositiveOrNegativeClass(props.reverseColors ? -value : value);
}
function getPositiveOrNegativeClass(value) {
  if (!value) {
      return "gray"
  }
  if (value < 0) {
      return "negative"
  }
  return "positive"
}

function format(value) {
  switch (props.valueType) {
    case "percent":
      return formatPercent(value);
    case "number":
      return formatNumber(value);
    default:
      return "";
  }
}
</script>

<style scoped lang="scss">
    .negative {
        background-color: #ffac9e;
    }
    .positive {
        background-color: #94d99d;
    }
</style>
