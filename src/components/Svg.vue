<template>
  <component 
    :is="svg" 
    class="svg"
  />
</template>

<script setup>
defineProps({
  svg: Function
});
</script>

<style scoped lang="scss">

</style>
