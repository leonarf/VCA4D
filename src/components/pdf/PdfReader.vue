<template>
    <div class="min-w-[980px] bg-neutral-600 m-auto py-4 flex flex-col gap-y-3 items-center">
        <div class="flex flex-row">
            <button 
                :disabled="!canPrevious" 
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                @click="prev"
            >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
            </button>
            <div class="px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50 md:inline-flex">
                {{ currentPage }} / 6
            </div>
            <button 
                :disabled="!canNext" 
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                @click="next"
            >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
            </button>
        </div>
        <vue-pdf-embed :source="path" width="900" :page="currentPage"/>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed'
const props = defineProps({
  path: String
});

const currentPage = ref(1)

const canPrevious = computed(() => currentPage.value > 1)
const canNext = computed(() => currentPage.value < 6)
const next = () => currentPage.value += 1
const prev = () => currentPage.value -= 1
</script>