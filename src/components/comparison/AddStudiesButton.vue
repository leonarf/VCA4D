<template>
  <a class="add-studies-button">
    <Svg class="plus" :svg="PlusLogo"/>
    <div>Add studies</div>
  </a>
</template>

<script setup>
  import PlusLogo from '../../images/icons/plus.svg'
  import Svg from "@components/Svg.vue"
</script>

<style scoped lang="scss">
  .add-studies-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #3F83F8;
    text-align: center;
    min-width: 100px;

    .plus {
      height: 30px;
    }

    &:hover {
      color: #1C64F2;
    }
  }
</style>
