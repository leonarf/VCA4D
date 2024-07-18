<script setup>
import { computed, getCurrentInstance } from 'vue';
const props = defineProps({
    label: String,
    value: Boolean
});

const uniqueId = computed(() => {
  return getCurrentInstance().uid; // This is a unique component instance id
});
const emits = defineEmits(["toggle"])

</script>

<template>
  <div class="flex gap-1">
    <input type="checkbox" :value="value" :id="uniqueId" @change="emits('toggle')"/>
    <label :for="uniqueId">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
</style>