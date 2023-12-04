<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    link: {
        required: false,
        type: String
    },
    isLocal: Boolean,
    isOpen: Boolean,
    title: String
})
</script>

<template>
    <div class="card min-h-[180px] relative">
        <component :is="link ? 'RouterLink' : 'v-fragment'" :to="link" class="w-[150px]">
            <div :class="`cursor-pointer card-icon ${isLocal ? 'bg-[#868686]' : (isOpen ? '#9B9B9B' :  'bg-[#DFDFDF]')} hover:bg-[#CFCFCF]`">
                <slot name="logo"></slot>
                <p class="font-semibold capitalize text-center">{{ title }}</p>
            </div>  
        </component>
        <slot name="footer"></slot>   
    </div>
</template>

<style scoped lang="scss">
.card {
    @apply flex flex-col items-center space-y-1 w-[150px]
}
.card-icon {
    @apply flex flex-col items-center justify-evenly text-[#303030] px-2 text-center rounded-lg w-full h-[140px] pt-4 pb-2
}
</style>