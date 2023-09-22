<template>
    <div class="min-w-[980px] bg-neutral-600 m-auto py-4 flex flex-col gap-y-3 items-center">
        <vue-pdf-embed :source="path" width="900" />
    </div>
</template>

<script setup>
import VuePdfEmbed from 'vue-pdf-embed'
const props = defineProps({
  path: String
});
</script>