<template>
    <div v-for="(part, index) in studyData.socialData" :key="part.title">
        <h2 class="text-xl text-[#151515] relative">{{ part.title }}</h2>
        <a :id="`social_anchor_${index + 1}`"></a>

        <SocialDetailsGroup v-for="group in part.groups" :key="group.title" :group="group" />
    </div>
</template>

<script setup>
import SocialDetailsGroup from './SocialDetailsGroup.vue';

const props = defineProps({
    studyData: Object
})
</script>

<style scoped lang="scss">
h2::before {
    content: "";
    width: 90%;
    height: 1.2rem;
    border-bottom: solid 4px #151515;
    position: absolute;
    bottom: 0
}
</style>