<template>
  <div
    :title="`Rating: ${scale}`"
    class="min-w-[9rem] py-1 text-center tag"
    :class="{ bold: ! lightVersion }"
    :style="{ backgroundColor, border }"
  >
    {{ appreciation }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getSocialScoreColor, getSocialScoreLabel } from '@utils/social.js'

const props = defineProps({
  scale: Number,
  lightVersion: Boolean
});

const scaleColor = computed(() => getSocialScoreColor(props.scale))

const backgroundColor = computed(() => {
  return props.lightVersion ? `${scaleColor.value}20` : scaleColor.value
})
const border = computed(() => {
  return props.lightVersion ? `${scaleColor.value} solid 2px` : "none"
})

const appreciation = computed(() => getSocialScoreLabel(props.scale))

</script>

<style scoped lang="scss">
.tag {
  border-radius: 1000px;

  &.bold {
    font-weight: 700;
  }
}
</style>
