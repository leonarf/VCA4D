<template>
  <div class="download-section">
    <h3 class="download-title">Available for download</h3>
    <div class="links">
      <div
        v-for="(keyList, index) in urlKeysLists"
        :key="index"
      >
        <div
          v-for="urlKey in keyList"
          :key="urlKey"
          class="url-item"
        >
          <a class="url-title" :href="studyUrls[urlKey]">{{ buildTitle(urlKey) }}</a>
          <span class="url-subtitle">{{ buildSubTitle(urlKey) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  studyUrls: Object
});

const urlKeysLists = [
  ["briefPdf", "fullPdf"],
  ["ecoXlsx", "socialXlsx", "acvXlsx"]
];
function buildTitle(urlKey) {
  switch (urlKey) {
    case "briefPdf":
      return "Study 6 page snapshot (pdf)";
    case "fullPdf":
      return "Study full report (pdf)";
    case "ecoXlsx":
      return "Economic data (xlsx)";
    case "socialXlsx":
      return "Social sustainability data (xlsx)";
    case "acvXlsx":
      return "Environmental data (xlsx)";
    default:
      console.error("Unrecognized url type");
  }
}
function buildSubTitle(urlKey) {
  switch (urlKey) {
    case "ecoXlsx":
      return "Contribution to economic growth and Inclusiveness";
    case "briefPdf":
    case "fullPdf":
    case "socialXlsx":
    case "acvXlsx":
      return "";
    default:
      console.error("Unrecognized url type")
  }
}
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
      margin-bottom: 16px;
    }

    .links {
      display: flex;

      > * {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }

    .url-item {
      width: 50%;
      width: 100%;

      .url-title {
        cursor: pointer;
        color: #2E6BAD;

        &:hover {
          text-decoration: underline;
        }
      }

      .url-subtitle {
        margin-left: 5px;
        font-style: italic;
        color: #8A8A8A;
      }
    }
  }
</style>
