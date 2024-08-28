<template>
  <tr class="h-12">
    <td />
    <td v-for="study in studies" :key="`${study.id}`" />
    <td />
  </tr>
</template>

<script setup>
defineProps({
    studies: Array,
})
</script>

<style lang="scss">
</style>
