<template>
  <template v-if="studies.length > 0">
    <Section :title="category.prettyName" :textColor="category.textColor" :borderColor="category.color">
      <CardList>
        <li v-for="item in getStudiesByProduct()" :key="item.product">
          <template v-if="item.studies.length === 1">
            <Card
              :link="getLink(item.studies[0])"
              :isLocal="item.studies[0].local"
              :title="getProduct(item.product).prettyName"
            >
              <template #logo>
                <LogoProductLarge :productName="item.product" />
              </template>
              <template #footer>
                <CardFooter :text="getCountry(item.studies[0].country).prettyName">
                  <template #logo>
                    <LogoCountrySmall :isoCode="getCountry(item.studies[0].country)?.iso || 'gr'" />
                  </template>
                </CardFooter>
              </template>
            </Card>
          </template>
          <template v-else>
            <Dropdown
              :shown="openedProduct === item.product"
              :triggers="[]"
              :overflowPadding="20"
              placement="bottom"
            >
              <Card
                :isLocal="false"
                :isOpen="openedProduct === item.product"
                :title="getProduct(item.product).prettyName"
                @click.stop="openedProduct === item.product ? openedProduct = null : openedProduct = item.product"
              >
                <template #logo>
                  <LogoProductLarge :productName="item.product" />
                </template>
                <template #footer>
                  <CardFooter text="countries">
                    <template #logo>
                      <NumberBadge :value="item.studies.length" />
                    </template>
                  </CardFooter>
                </template>
              </Card>
              <template #popper>
                <SubCardsList
                  v-if="openedProduct === item.product" 
                  :link="{ name: 'comparison', query: { studies: getStudyListQueryString(item.studies.map(study => study.id)) } }"
                  :linkTitle="`Compare all ${getProduct(item.product).prettyName.toLowerCase()} studies`"
                >
                  <Card
                    v-for="study in item.studies"
                    :key="study.id"
                    :link="getLink(study)"
                    :isLocal="study.local"
                    :title="getCountry(study.country)?.prettyName"
                  >
                    <template #logo>
                      <LogoCountryLarge :isoCode="getCountry(study.country)?.iso || 'gr'" />
                    </template>
                  </Card>
                </SubCardsList>
              </template>
            </Dropdown>
          </template>
        </li>
      </CardList>
    </Section>
  </template>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getLink } from '@utils/router'
import { getCountry, getProduct } from '@utils/data'
import { getStudyListQueryString } from '@utils/router.js'
import LogoCountrySmall from './LogoCountrySmall.vue';
import LogoCountryLarge from './LogoCountryLarge.vue';
import LogoProductLarge from './LogoProductLarge.vue';
import CardList from './CardList.vue'
import Section from './Section.vue';
import CardFooter from './CardFooter.vue';
import NumberBadge from './NumberBadge.vue';
import Card from './Card.vue';
import SubCardsList from './SubCardsList.vue'
import { Dropdown } from 'floating-vue';

const props = defineProps({
    studies: Array,
    countries: Array,
    category: Object
})

const openedProduct = ref(null)

const closeProduct = () => {
    openedProduct.value = null
}
onMounted(() => {
    document.addEventListener('click', closeProduct);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeProduct);
})

const getStudiesByProduct = () => {
    const products = [... new Set(props.studies.map(study => study.product))]
    return products.map(product => ({
        product,
        studies: props.studies.filter(study => study.product === product)
    }))
}



</script>

<style scoped lang="scss"></style>
