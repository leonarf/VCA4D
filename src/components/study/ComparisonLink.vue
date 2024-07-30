<template>
  <RouterLink
    class="comparison-link"
    :to="{
      name: 'comparison',
      query: { studies: getStudyListQueryString(otherStudies) }
    }"
    :title="title"
    target="_blank"
  >
    <Svg :svg="BalanceLogo" height="18px"/>
    {{ otherStudies.length }}
  </RouterLink>
</template>

<script setup>
  import _ from "lodash"
  import { computed } from "vue";
  import BalanceLogo from "../../images/icons/balance.svg"
  import Svg from "@components/Svg.vue"
  import { getStudy, getProduct, getCountry, getProductStudies, getCountryStudies } from "@utils/data";
  import { getStudyListQueryString } from "@utils/router";

  const props = defineProps({
    type: {
      type: String,
      validator: (typeProp) => ["product", "country"].includes(typeProp) 
    },
    studyId: String
  })

  const otherStudies = computed(() => {
    switch(props.type) {
      case "product":
        return getProductStudies(getStudy(props.studyId).product);
      case "country":
        return getCountryStudies(getStudy(props.studyId).country);
      default:
        return [];
    }
  })
  const title = computed(() => {
    switch(props.type) {
      case "product":
        const product = getProduct(getStudy(props.studyId).product).prettyName;
        return `Compare the ${otherStudies.value.length} ${_.capitalize(product)} studies`;
      case "country":
        const country = getCountry(getStudy(props.studyId).country).prettyName;
        return `Compare the ${otherStudies.value.length} ${_.capitalize(country)} studies`;
      default:
        return "";
    }
  })
</script>

<style scoped lang="scss">
  .comparison-link {
    display: flex;
    height: 20px;
    color: #656565;
    gap: 0.25rem;
    font-size: 18px;
    line-height: 18px;

    &:hover {
      color: #1C64F2;
    }
  }
</style>
