<template>
    <ol class="evaluation-criteria">
        <slot></slot>
    </ol>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

ol.evaluation-criteria {
    counter-reset: item;
}
li { 
    display: block;
}
li:before {
    content: counters(item, ".") " ";
    counter-increment: item
}

</style>