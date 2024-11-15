<template>
  <section class="section">
    <h4 :style="`color: ${textColor};`">{{ title }}</h4>
    <div class="border-t-[13px] pt-4" :style="`border-color: ${borderColor};`">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  textColor: String,
  borderColor: String
})
</script>

<style scoped lang="scss">
.section {
  margin-top: 48px;
}
</style>
