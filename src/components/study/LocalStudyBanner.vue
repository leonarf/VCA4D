<template>
  <Teleport to="body">
    <div class="local-study-banner">
      ⚠️ <b>NOT PUBLISHED : </b>&nbsp;
      This study hasn’t been published to the web and is only available on your device. 
      Once ready, publish it by contacting BASIC or 
      &nbsp;<a class="remove-action" @click="emits('click-clear')">click here to remove it from your device</a>
    </div>
  </Teleport>
</template>

<script setup>
const emits = defineEmits(["click-clear"])
</script>

<style scoped lang="scss">
.local-study-banner {
  background-color: #FFCE0B;

  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  top: 0;

  .remove-action {
    cursor: pointer;
    color: #3F83F8;

    &:hover {
      color: #1C64F2;
    }
  }
}
</style>
