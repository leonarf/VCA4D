<template>
  <Teleport to="body">
    <div v-if="opened" class="modal-overlay">
      <div class="modal">
        <slot />
        <a class="exit-button" @click="emits('close')">
          <Svg :svg="Cross" />
        </a>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import Svg from "@components/Svg.vue";
import Cross from "../images/icons/cross.svg";
defineProps({
  opened: Boolean
});

const emits = defineEmits(["close"]);

</script>


<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba($color: black, $alpha: 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    min-width: 300px;
    min-height: 100px;
    max-height: 100vh;
    padding: 20px 50px;
    border-radius: 12px;
    background-color: white;
    position: relative;

    .exit-button {
      position: absolute;
      top: 20px;
      right: 20px;
      height: 20px;
      width: 20px;
      color: #6B6B6B;

      &:hover {
        color: #404040;
      }

      cursor: pointer;
    }
  }
}
</style>
