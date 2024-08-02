<template>
  <div class="radio-input">
    <span class="title">{{ title }}</span>
    <label class="option" v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="uniqueId"
        :value="option.value"
        :checked="selected === option.value"
        @input="emits('update:selected', option.value)"
      />
      <span class="label">
        <span>{{ option.label }}</span>
        <span class="subtitle">{{ option.subtitle }}</span>
      </span>
    </label>
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
    align-items: flex-start;
    cursor: pointer;

    input {
      margin-top: 6px
    }

    .label {
      margin-left: 6px;
      display: flex;
      flex-direction: column;

      .subtitle {
        color: #8a8a8a;
        font-style: italic;
      }
    }
  }
}
</style>
