<template>
  <div class="card-footer">
    <div class="logo">
      <slot name="logo" />
    </div>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped lang="scss">
.card-footer {
  display: flex;
  gap: 5px;

  justify-content: left;
  align-items: flex-start;

  .logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .text {
    margin-top: 2px;
  }
}
</style>
