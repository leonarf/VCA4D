<template>
  <div class="default-comparison-cell" :class="valueClass">
    {{ formatedValue }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatNumber, formatPercent } from '@utils/format.js'

const props = defineProps({
    value: Number,
    valueType: {
      type: String,
      validator: (valueType) => ["percent", "number"].includes(valueType)
    }
})

const valueClass = computed(() => {
  if (! props.value) {
      return "gray"
  }
  return "blue";
});

const formatedValue = computed(() => {
  if (! props.value && typeof props.value !== "number") {
    return "-";
  }

  switch (props.valueType) {
    case "percent":
      return formatPercent(props.value);
    case "number":
      return formatNumber(props.value);
    default:
      throw new Error("Unrecognized valueType");
  }
});
</script>

<style scoped lang="scss">
    .gray {
      @apply bg-gray-300 text-gray-500
    }
    .blue {
        background-color: #A4CAFE;
    }
</style>
