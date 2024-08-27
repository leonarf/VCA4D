<script setup>
const props = defineProps({
    title: String,
    textColor: String,
    borderColor:String
})
</script>

<template>
  <section class="section">
    <h4 :style="`color: ${textColor};`">{{ title }}</h4>
    <div class="border-t-[13px] pt-4" :style="`border-color: ${borderColor};`">
      <slot></slot>
    </div>  
  </section>
</template>

<style scoped lang="scss">
  .section {
    margin-top: 48px;
  }
</style>
