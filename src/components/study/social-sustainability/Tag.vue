<template>
  <div :title="`Rating: ${scale}`" class="min-w-[9rem] font-bold py-1 text-center tag" :style="{ background: scaleColor }">
    {{ appreciation }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getSocialScoreColor } from '@utils/colors.js'

const props = defineProps({
  scale: Number,
  appreciation: String
});

const scaleColor = computed(() => getSocialScoreColor(props.scale))

</script>

<style scoped lang="scss">
.tag{
  border-radius: 1000px;
}
</style>
