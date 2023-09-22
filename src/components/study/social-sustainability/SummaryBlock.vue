<template>
    <div class="bg-[#f1f1f1] rounded-lg p-4 max-w-[500px]">
        <div class="uppercase font-bold text-[#888] text-sm mb-2">{{ title }}</div>
        <slot></slot>
        <div class="browsable-radar-chart__item__more-info">
            <a class="cursor-pointer font-bold text-[#2e6bad]" @click="slideTo(anchorLink)">Explore {{ title.toLowerCase() }} &rarr;</a>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  title: String,
  anchor: Number
});

const anchorLink = computed( () => `social_anchor_${props.anchor}`);

const slideTo = (id) => {
    var element = document.getElementById(id);
    window.scrollTo({
        top: element.offsetTop-10,
        behavior: 'smooth'
    });
}

</script>

<style scoped lang="scss">
</style>