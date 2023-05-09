<template>
    <li class="evaluation-criterion">
        <a :id="encodeURIComponent(label.toLowerCase())"></a><span class="evaluation-criterion__label">{{ label }}</span>
        <ol class="evaluation-criterion__children">
            <slot></slot>
        </ol>
    </li>
</template>

<script setup>
const props = defineProps({
  label: String
})
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

li.evaluation-criterion {
  display: block;
  margin-top: 2px;
  margin-bottom: 30px;
}

%underline {
    background-image: linear-gradient(to top, #333, #333 2px, transparent 3px);
}

%evaluation-criterion-label {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    font-weight: normal;
    font-size: 20px;
    color: #151515;
    text-underline-offset: 5px;
}

.evaluation-criterion__label {
    @extend %evaluation-criterion-label;
    @extend %underline;
    text-transform: uppercase;
    font-weight: bold;
}

li.evaluation-criterion:before {
    @extend %evaluation-criterion-label;
    @extend %underline;
    content: counters(item, ".") ". ";
    counter-increment: item;
    color: #999;
    text-decoration-color: #151515;
    font-weight: bold;
}

.evaluation-criterion__children {
    counter-reset: item;
    margin-top: 20px;
}


/*
background-image: 
    -moz-linear-gradient(top, transparent, transparent $rule-mask-height, $line-color 0px);
background: linear-gradient(to top, #444, #444 19px, transparent 20px, transparent);
background-image: linear-gradient(to top, #333, #333 2px, transparent 3px);
*/


</style>