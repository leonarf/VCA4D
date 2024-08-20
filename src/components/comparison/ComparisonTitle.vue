<template>
    <tr>
        <td class="title">
            {{ title }}
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
  .title {
    @apply uppercase text-[#8A8A8A] font-bold text-sm pb-4;
  }
</style>
