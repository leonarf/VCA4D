<template>
  <div :title="`Rating: ${scale}`" class="min-w-[9rem] font-bold py-1 text-center tag" :style="{ backgroundColor, border }">
    {{ appreciation }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getSocialScoreColor } from '@utils/social.js'

const props = defineProps({
  scale: Number,
  lightVersion: Boolean,
  appreciation: String
});

const scaleColor = computed(() => getSocialScoreColor(props.scale))

const backgroundColor = computed(() => {
  return props.lightVersion ? `${scaleColor.value}20` : scaleColor.value
})
const border = computed(() => {
  return props.lightVersion ? `${scaleColor.value} solid 2px` : "none"
})

</script>

<style scoped lang="scss">
.tag{
  border-radius: 1000px;
}
</style>
