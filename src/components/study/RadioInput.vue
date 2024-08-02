<template>
  <label v-for="option in options" :key="option.value">
    <input
      type="radio"
      :id="uniqueId"
      :value="option.value"
      :checked="selected === option.value"
      @input="emits('update:selected', option.value)"
    />
    {{ option.label }}
  </label>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance } from 'vue';

  type Option = { label: string; value: string };
  defineProps<{
      options: Option[],
      selected: string
  }>();

  const emits = defineEmits<{
    "update:selected": [value: string]
  }>()

  const uniqueId = computed(() => {
    return getCurrentInstance()?.uid; // This is a unique component instance id
  });
</script>

<style scoped lang="scss">
</style>
