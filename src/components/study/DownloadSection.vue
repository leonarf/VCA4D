<template>
  <div class="download-section">
    <h3 class="download-title">Available for download</h3>
    <div class="links">
      <div
        v-for="{ urlKey, title, subtitle, link } in displayedLinksColumns"
        :key="urlKey"
        class="url-item"
      >
        <a class="url-title" target="_blank" :href="link">{{ title }}</a>
        <span v-if="subtitle" class="url-subtitle">{{ subtitle }}</span>
      </div>
      <div class="url-item contact">
        To access full data, please
        <a class="url-title" target="_blank" href="mailto:olimpia.orlandoni@agrinatura-eu.eu"
          >contact our team</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  studyUrls: Object
})

const linkColumns = [
  { title: 'Study 6 page snapshot (pdf)', urlKey: 'briefPdf' },
  { title: 'Study full report (pdf)', urlKey: 'fullPdf' }
]

const displayedLinksColumns = computed(() => {
  return linkColumns
    .map(populateLink)
    .filter(hasLink)
    .filter((column) => column.length !== 0)

  function populateLink(columnItem) {
    return {
      ...columnItem,
      link: props.studyUrls[columnItem.urlKey]
    }
  }
  function hasLink(columnItem) {
    return !!columnItem.link
  }
})
</script>

<style lang="scss" scoped>
.download-section {
  padding: 39px 46px;
  border-radius: 15px;

  .download-title {
    color: #8a8a8a;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-bottom: 16px;
  }

  .links {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .url-item {
    width: 50%;
    width: 100%;

    .url-title {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .url-subtitle {
      margin-left: 5px;
      font-style: italic;
      color: #8a8a8a;
    }

    &.contact {
      color: #383d46;
    }
  }
}
</style>
