<template>
  <component :is="svg" class="svg" />
</template>

<script setup>
defineProps({
  svg: Object
})
</script>

<style scoped lang="scss"></style>
