<template>
    <div class="flex flex-col max-w-[300px]">
        <div v-if="!!value" class="text-3xl text-[#303030]">{{ value }}</div>
        <div v-else>
          <NoDataBadge/>
        </div>
        <div class="uppercase text-base font-semibold text-[#656565]">{{ label }}</div>
    </div>
</template>

<script setup>
import NoDataBadge from '@components/study/NoDataBadge.vue';
const props = defineProps({
  value: String,
  label: String
})
</script>

<style scoped lang="scss">
</style>
