<template>
  <RouterLink class="comparison-link" :to="route" :title="title">
    <Svg :svg="ArrowsLogo" height="23px" />
    {{ hasOtherStudies ? allStudies.length : '' }}
  </RouterLink>
</template>

<script setup>
import _ from 'lodash'
import { computed } from 'vue'
import ArrowsLogo from '../../images/icons/left-right-arrows.svg'
import Svg from '@components/Svg.vue'
import { RouterLink } from 'vue-router'
import { getStudy, getProduct, getCountry, getProductStudies, getCountryStudies } from '@utils/data'
import { getStudyListQueryString } from '@utils/router'

const props = defineProps({
  type: {
    type: String,
    validator: (typeProp) => ['product', 'country'].includes(typeProp)
  },
  studyId: String
})

const allStudies = computed(() => {
  switch (props.type) {
    case 'product':
      return getProductStudies(getStudy(props.studyId).product)
    case 'country':
      return getCountryStudies(getStudy(props.studyId).country)
    default:
      return []
  }
})

const route = computed(() => {
  return {
    name: 'comparison',
    query: { studies: getStudyListQueryString(allStudies.value) }
  }
})

const title = computed(() => {
  if (!hasOtherStudies.value) {
    return 'Go to comparison page'
  }

  switch (props.type) {
    case 'product':
      return `Compare the ${allStudies.value.length} ${_.lowerCase(
        getProduct(getStudy(props.studyId).product).prettyName
      )} studies`
    case 'country':
      return `Compare the ${allStudies.value.length} ${
        getCountry(getStudy(props.studyId).country).prettyName
      } studies`
    default:
      return ''
  }
})

const hasOtherStudies = computed(() => {
  return allStudies.value.length > 1
})
</script>

<style scoped lang="scss">
.comparison-link {
  display: flex;
  gap: 0rem;
  font-size: 18px;
  line-height: 25px;
  height: 20px;
  align-items: center;
  color: #656565;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: #1c64f2;
  }
}
</style>
