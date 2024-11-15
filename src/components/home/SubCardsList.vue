<template>
  <div class="p-4 rounded-lg text-white z-50 sub-cards-list">
    <div class="studies-list">
      <slot />
    </div>
    <div v-if="link" class="text-center w-full">
      <RouterLink :to="link" class="text-[#2E6BAD] underline">
        {{ linkTitle }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  link: {
    type: Object,
    required: false
  },
  linkTitle: {
    type: String,
    required: false
  }
})
</script>

<style scoped lang="scss">
.studies-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
