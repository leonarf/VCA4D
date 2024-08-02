<script setup lang="ts">
import tippy from "tippy.js";
import type { Instance, Props } from "tippy.js";
import { onMounted, onUnmounted, onUpdated, ref } from "vue";
import "tippy.js/dist/tippy.css";

interface Tooltip {
  contenu: string;
  options: Partial<Props>;
}

const props = defineProps<Tooltip>();

// Setup tooltip
const tooltipRef = ref<HTMLElement>();

const tooltipInstance = ref<Instance>();

function destroyTooltip() {
  if (tooltipInstance.value) {
    tooltipInstance.value.destroy();
  }
}

function initTooltip() {
  destroyTooltip();
  tooltipInstance.value = tippy(tooltipRef.value?.parentNode as HTMLElement, {
    content: props.contenu,
    allowHTML: true,
    interactive: true,
    ...props.options,
    onMount(instance) {
      const tippyBox = instance.popper.querySelector(".tippy-box") as HTMLElement;
      const arrowElement = instance.popper.querySelector(".tippy-arrow") as HTMLElement;
      tippyBox.style.backgroundColor = "#EDEDED";
      arrowElement.style.color = "#EDEDED";
      tippyBox.style.color = "#6B6B6B";
    },
  });
}

onMounted(initTooltip);
onUpdated(initTooltip);
onUnmounted(destroyTooltip);
</script>

<template>
  <span ref="tooltipRef"></span>
</template>

<style></style>
