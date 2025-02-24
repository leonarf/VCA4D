<template>
  <Teleport to="body">
    <div class="local-study-banner">
      <div class="warning">⚠️ <b>NOT PUBLISHED : </b>&nbsp;</div>
      <div>
        This study hasn’t been published to the web and is only available on your device. Once
        ready, publish it by adding the files on the GitHub repository, or &nbsp;<a
          class="remove-action"
          @click="emits('click-clear')"
          >click here to remove it from your device</a
        >
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const emits = defineEmits(['click-clear'])
</script>

<style scoped lang="scss">
.local-study-banner {
  background-color: #ffce0b;

  min-height: 50px;
  padding: 12px;
  display: flex;
  align-items: top;
  justify-content: center;
  width: 100%;
  position: fixed;
  top: 0;

  > .warning {
    flex-shrink: 0;
  }

  .remove-action {
    cursor: pointer;
    color: #3f83f8;

    &:hover {
      color: #1c64f2;
    }
  }
}
</style>
