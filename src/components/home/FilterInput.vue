<template>
  <div class="flex gap-1">
    <input :id="uniqueId" type="checkbox" :value="value" @change="emits('toggle')" />
    <label :for="uniqueId">{{ label }}</label>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
defineProps({
  label: String,
  value: Boolean
})

const uniqueId = computed(() => {
  return getCurrentInstance().uid // This is a unique component instance id
})
const emits = defineEmits(['toggle'])
</script>

<style scoped lang="scss"></style>
