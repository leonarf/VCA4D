<style scoped lang="scss">
.contents-of-the-file{
    background-color: rgb(236, 236, 236);
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
}
.tab_in_error{
    border-left: 10px solid #FF9280;
    padding: 1rem;
}
.tab_ok{
    border-left: 10px solid #02AA18;
    padding: 1rem;
}
.tab-present{
    color:#02AA18
}
.property{
    margin-top: 2rem;
}
.checkmark{
    background-color: #FF9280;
    border-radius: 100%;
    color: white;
    width: 26px;
    height: 26px;
    display: inline-block;
    text-align: center;
    font-weight: 900;
    vertical-align: center;
    margin-right: 5px;
}
.error-title{
    color: #FF9280;
}
</style>

<template>
  <div class="contents-of-the-file">
    <div
      v-bind:class="{
        tab_ok: errors.length == 0,
        tab_in_error: errors.length > 0,
      }"
    >
      <h3>Tab: {{ spreadsheetName }}</h3>
      <p v-if="!spreadsheetMissing" class="tab-present">Tab present in the file</p>
      <div v-for="(error, index) in errors" :key="index">
        <div class="property">
          <p class="error-title"><span class="checkmark">✕</span> {{ error.level }}</p>
          <p :innerHTML="error.message"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  errors: Object,
  spreadsheetName: String
})

const spreadsheetMissing = computed(() => {
  if (props.errors.length == 0) {
    return true
  }
  else if (props.errors.length == 1
    && props.errors[0].message == `Sheet '${props.spreadsheetName}' is missing.`
  ) {
    return true
  }
  return false
})
</script>