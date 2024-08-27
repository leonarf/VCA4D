<template>
  <tr>
    <td class="comparison-title">
      <div>
        {{ title }}
      </div>
    </td>
    <td v-for="study in studies" :key="`${study.id}`">
            
    </td>
    <td></td>
  </tr>
</template>

<script setup>
const props = defineProps({
    studies: Array,
    title: String
})

</script>

<style lang="scss">
  .comparison-title {
    @apply uppercase text-[#8A8A8A] font-bold text-sm pb-4;
  }
</style>
