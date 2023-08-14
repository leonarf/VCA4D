<template>
    <div class="browsable-radar-chart__item">
        <div class="browsable-radar-chart__item__title">{{ title }}</div>
        <slot></slot>
        <div class="browsable-radar-chart__item__more-info"><a @click="slideTo(anchorLink)">Explore {{ title.toLowerCase() }} &rarr;</a></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  title: String
});

const anchorLink = computed( () => {
    return encodeURIComponent(props.title.toLowerCase());
});

const slideTo = (id) => {
    var element = document.getElementById(id);
    window.scrollTo({
        top: element.offsetTop-10,
        behavior: 'smooth'
    });
}

const setUrlHash = (id) => {
    window.location.hash = '#' + id;
};

const slideToAndSetUrlHash = (id) => {
    slideTo(id);
    setTimeout(() => {setUrlHash(id)}, 3000);
}

</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

.browsable-radar-chart__item {
    background: #f1f1f1;
    border-radius: 10px;
    padding: 12px;
    max-width: 500px;
    margin-bottom: 5px;
}
.browsable-radar-chart__item__title {
  text-transform: uppercase;
  font-weight: bold;
  color: #888;
  font-size: 14px;
  margin-bottom: 5px;
}

.browsable-radar-chart__item__more-info a {
    color: #2e6bad;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
}


</style>