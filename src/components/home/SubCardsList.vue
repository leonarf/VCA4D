<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    link: {
        type: String,
        required: false
    },
    linkTitle: {
        type: String,
        required: false
    }
})
</script>

<template>
    <div class="absolute top-[145px] bg-[#F0F0F0] p-4 rounded-lg text-white z-50">
        <div class="flex flex-row gap-x-4">
            <slot></slot>
        </div>
        <div v-if="link" class="text-center w-full">
            <RouterLink :to="link" class="text-[#2E6BAD] underline">
                {{ linkTitle }}
            </RouterLink>   
        </div>
    </div>
</template>

<style scoped lang="scss"></style>