<template>
  <div>
    <a class="add-studies-button" @click="opened = true">
      <Svg class="plus" :svg="PlusLogo"/>
      <div>Add studies</div>
    </a>
    <Modal
      :opened="opened"
      @close="opened = false"
    >
      <div class="modal-title">Select studies to compare</div>
      <StudiesListTable
        :selectedStudies="currentStudySelection"
        @select-studies="selectStudies($event)"
      />
    </Modal>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import PlusLogo from '../../images/icons/plus.svg'
  import Svg from "@components/Svg.vue"
  import Modal from "@components/Modal.vue"
  import StudiesListTable from './StudiesListTable.vue';

  defineProps({
    currentStudySelection: Array
  })

  const opened = ref(false);

  const emits = defineEmits(["select-studies"]);

  function selectStudies(studySelection) {
    opened.value = false;
    emits("select-studies", studySelection);
  }
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
  .modal-title {
    font-size: 40px;
    margin-bottom: 20px;
  }
</style>
