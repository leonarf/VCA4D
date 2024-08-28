<template>
  <div class="download-section">
    <h3 class="download-title">Available for download</h3>
    <!-- WIP -->
    {{ studyId }}
  </div>
</template>

<script setup>
defineProps({
  studyId: String
});
</script>

<style lang="scss" scoped>
  .download-section {
    background-color: #EFEFEF;
    padding: 28px 33px;
    border-radius: 15px;

    .download-title {
      color: #8A8A8A;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  }
</style>
