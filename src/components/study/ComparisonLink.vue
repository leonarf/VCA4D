<template>
  <RouterLink
    v-if="! disabled"
    class="comparison-link "
    :to="route"
    :title="title"
  >
    <Svg :svg="BalanceLogo" height="20px"/>
    {{ otherStudies.length }}
  </RouterLink>
  <span
    v-else
    class="no-comparison"
    :title="noStudyTitle"
  >
    <Svg :svg="BalanceLogo" height="20px"/>
  </span>
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

  const route = computed(() => {
    if (disabled.value) { return {}; }
    return {
      name: "comparison",
      query: { studies: getStudyListQueryString(otherStudies.value) }
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
  const noStudyTitle = computed(() => {
    return `No other study for this ${props.type}`;
  })

  const disabled = computed(() => {
    return otherStudies.value.length <= 1;
  });
</script>

<style scoped lang="scss">
  .comparison-link, .no-comparison {
    display: flex;
    height: 20px;
    gap: 0.25rem;
    font-size: 18px;
    line-height: 18px;
    height: 20px;
    align-items: flex-end;
  }

  .comparison-link {
    color: #656565;
    cursor: pointer;

    &:hover {
      color: #1C64F2;
    }
  }
  .no-comparison {
    color: #BBB;
  }
</style>
