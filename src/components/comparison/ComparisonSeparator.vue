<template>
  <tr class="h-12">
    <td></td>
    <td v-for="study in studies" :key="`${study.id}`"></td>
    <td></td>
  </tr>
</template>

<script setup>
const props = defineProps({
    studies: Array,
})
</script>

<style lang="scss">
</style>
