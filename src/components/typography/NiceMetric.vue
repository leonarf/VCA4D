<template>
  <div class="flex flex-col max-w-[300px]">
    <div class="value">
      {{ displayedValue }}
    </div>
    <div class="title">
      <div class="label">
        {{ label }}
      </div>
      <InfoTooltip v-if="description" :text="description" />
    </div>
  </div>
</template>

<script setup>
import InfoTooltip from '@components/typography/InfoTooltip.vue'
import { computed } from 'vue'

const props = defineProps({
  description: String,
  value: String,
  label: String
})
const displayedValue = computed(() => {
  if (!props.value && typeof props.value !== 'number') {
    return '-'
  }
  return props.value
})
</script>

<style scoped lang="scss">
.value {
  color: #303030;
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.title {
  color: #656565;
  display: flex;
  align-items: center;
  gap: 5px;

  .label {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    text-transform: uppercase;
  }
}
</style>
