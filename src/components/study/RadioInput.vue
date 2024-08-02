<template>
  <div class="radio-input">
    <span class="title">{{ title }}</span>
    <div class="option" v-for="option in options" :key="option.value">
      <label>
        <input
          type="radio"
          :id="uniqueId"
          :value="option.value"
          :checked="selected === option.value"
          @input="emits('update:selected', option.value)"
        />
        <span class="label">{{ option.label }}</span>
      </label>
      <span class="subtitle">{{ option.subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance } from 'vue';

  type Option = { label: string; value: string, subtitle: string };
  defineProps<{
      options: Option[],
      selected: string,
      title: string
  }>();

  const emits = defineEmits<{
    "update:selected": [value: string]
  }>()

  const uniqueId = computed(() => {
    return getCurrentInstance()?.uid; // This is a unique component instance id
  });
</script>

<style scoped lang="scss">
.radio-input {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .title {
    font-weight: 700;
  }

  .option {
    display: flex;
    flex-direction: column;

    .label {
      margin-left: 6px;
    }

    .subtitle {
      margin-left: 20px;
      color: #8a8a8a;
      font-style: italic;
    }
  }
}
</style>
