<template>
  <RouterLink
    class="comparison-link "
    :to="route"
    :title="title"
  >
    <Svg :svg="BalanceLogo" height="20px"/>
    {{ hasOtherStudies ? allStudies.length : "" }}
  </RouterLink>
</template>

<script setup>
  import _ from "lodash";
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

  const allStudies = computed(() => {
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
    return {
      name: "comparison",
      query: { studies: getStudyListQueryString(allStudies.value) }
    }
  })

  const title = computed(() => {
    if (! hasOtherStudies.value) {
      return "Go to comparison page";
    }

    switch(props.type) {
      case "product":
        const product = _.lowerCase(getProduct(getStudy(props.studyId).product).prettyName);
        return `Compare the ${allStudies.value.length} ${product} studies`;
      case "country":
        const country = getCountry(getStudy(props.studyId).country).prettyName;
        return `Compare the ${allStudies.value.length} ${country} studies`;
      default:
        return "";
    }
  })

  const hasOtherStudies = computed(() => {
    return allStudies.value.length > 1
  })
</script>

<style scoped lang="scss">
  .comparison-link {
    display: flex;
    height: 20px;
    gap: 0.25rem;
    font-size: 18px;
    line-height: 18px;
    height: 20px;
    align-items: flex-end;
    color: #656565;
    cursor: pointer;

    &:hover {
      color: #1C64F2;
    }
  }
</style>
