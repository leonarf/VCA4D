<template>
  <header>
    <div class="header-title">
      <div class="title">VCA4D Information System</div>
      <nav>
        <RouterLink class="link" :class="{ active: routeName === 'home' }" to="home">
          <Svg class="icon" :svg="HouseLogo" />Home</RouterLink
        >
        <RouterLink class="link" :class="{ active: routeName === 'browse' }" to="browse">
          <Svg class="icon" :svg="WorldLogo" />Browse studies</RouterLink
        >
        <RouterLink class="link" :class="{ active: routeName === 'comparison' }" to="comparison">
          <Svg class="icon" :svg="ArrowsLogo" />Compare studies</RouterLink
        >
      </nav>
    </div>

    <div class="flex flex-row gap-6 items-center">
      <img
        src="../images/logo/agrinatura.png"
        height="60"
        width="116"
        alt="agrinatura network logo"
      />
      <img src="../images/logo/vca4d.jpg" height="62" width="153" alt="VCA4D logo" />
      <img
        src="../images/logo/european_commission.jpg"
        height="81"
        width="117"
        alt="european commission logo"
      />
    </div>
  </header>

  <main class="corps">
    <slot />
  </main>

  <footer v-if="!skipFooter">
    <ul>
      <li>
        <a target="_blank" class="hover:underline" href="https://github.com/leonarf/VCA4D"
          >Source code on Github</a
        >
      </li>
      <li>
        <RouterLink class="hover:underline" to="/admin-import">Import a study</RouterLink>
      </li>
      <li>
        <a
          target="_blank"
          class="hover:underline"
          href="https://capacity4dev.europa.eu/projects/value-chain-analysis-for-development-vca4d_en"
          >VCA4D's website project</a
        >
      </li>
      <li>
        <a target="_blank" class="hover:underline" href="https://lebasic.com/"
          >Website developped by Basic</a
        >
      </li>
    </ul>
  </footer>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
import Svg from '@components/Svg.vue'
import ArrowsLogo from '../images/icons/left-right-arrows.svg'
import HouseLogo from '../images/icons/house.svg'
import WorldLogo from '../images/icons/world.svg'
import { computed } from 'vue'

defineProps({
  skipFooter: {
    type: Boolean,
    default: false
  }
})
const routeName = computed(() => route.name)
</script>

<style scoped lang="scss">
header {
  height: 10rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .header-title {
    display: flex;
    flex-direction: column;
    gap: 14px;

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #929292;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
}

nav {
  width: 100%;
  display: flex;
  gap: 40px;
  height: 25px;
  align-items: center;

  .link {
    font-size: 20px;

    color: #3f83f8;

    .icon {
      height: 20px;
      margin: 0 5px 6px 0;
      display: inline-block;
    }

    &:hover {
      color: #1a56db;
    }

    &.active {
      color: black;
      cursor: default;
      pointer-events: none;
    }
  }
}

// main {
//     @apply flex flex-col justify-start items-center
// }

.corps {
  // max-width: 800px;
  margin: auto;
  align-items: left;
}

footer {
  min-height: 10rem;
  background-color: #d1d5db;
}
</style>
