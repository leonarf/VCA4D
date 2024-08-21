<template>
  <div class="default-comparison-cell" :class="valueClass">
      {{ value ? format(value) : '-' }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatNumber, formatPercent } from '@utils/format.js'

const props = defineProps({
    value: Number,
    reverseColors: Boolean,
    valueType: {
      type: String,
      validator: (valueType) => ["percent", "number"].includes(valueType)
    }
})

const valueClass = computed(() => getPositiveOrNegativeClass(props.reverseColors ? -props.value : props.value))
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
      throw new Error("Unrecognized valueType");
  }
}
</script>

<style scoped lang="scss">
    .gray {
      @apply bg-gray-300 text-gray-500
    }
    .negative {
        background-color: #ffac9e;
    }
    .positive {
        background-color: #94d99d;
    }
</style>
