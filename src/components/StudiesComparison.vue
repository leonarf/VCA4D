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

<style lang="scss" scoped>
:deep(*) {
    td {
        box-sizing: border-box;
    }
    td {
        @apply w-1/5
    }

    tr td:not(:first-child):not(:last-child):not(:nth-last-child(2)) {
      @apply border-r-2
    }
}
</style>
