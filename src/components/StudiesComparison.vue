<template>
    <table class="w-full">
        <tbody>
            <ComparisonHeader
                :studies="studies"
                @select-studies="emit('select-studies',$event)"
            />
            <ComparisonEconomics :studies="studies" />
            
            <ComparisonSeparator :studies="studies" />

            <ComparisonSocial :studies="studies" />
            
            <ComparisonSeparator :studies="studies" />
            
            <ComparisonEnvironment :studies="studies" />
        </tbody>
    </table>
</template>

<script setup>

import ComparisonHeader from '@components/comparison/ComparisonHeader.vue'
import ComparisonSocial from '@components/comparison/ComparisonSocial.vue'
import ComparisonSeparator from '@components/comparison/ComparisonSeparator.vue'
import ComparisonEnvironment from './comparison/ComparisonEnvironment.vue'
import ComparisonEconomics from './comparison/ComparisonEconomics.vue'
const props = defineProps({
    studies: Array,
})
const emit = defineEmits(["select-studies"]);

</script>

<style lang="scss">
td {
    box-sizing: border-box;
}
td {
    @apply w-1/5
}
td.title {
    @apply uppercase text-[#8A8A8A] font-bold text-sm pb-4;
}
td:first-child {
    min-width: 220px;
    padding-right: 20px;
}
.definition {
    @apply text-[#9B9B9B] italic
}

.light-blue {
    @apply bg-blue-200
}
.mid-blue {
    @apply bg-blue-400
}
.dark-blue {
    @apply bg-blue-500
}
.gray {
    @apply bg-gray-300 text-gray-500
}
.light-green {
    @apply bg-green-200
}
.dark-green {
    @apply bg-green-700
}
.light-red {
    @apply bg-red-300
}
.dark-red {
    @apply bg-red-700
}
.right-border {
    @apply border-r-2
}
tr td:not(:first-child):not(:last-child):not(:nth-last-child(2)) {
  @apply border-r-2
}
tr.rounded td:not(:first-child) div {
  @apply text-center text-sm py-1.5
}
tr.rounded td:nth-child(2) div{
    @apply rounded-l-full
}
tr.rounded td:nth-last-child(2) div {
    @apply rounded-r-full
}
</style>
