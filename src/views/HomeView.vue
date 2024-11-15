<template>
  <Skeleton>
    <section class="banner">
      <div>
        <h1><b>V</b>alue <b>C</b>hain <b>A</b>nalysis <b>F</b>or <b>D</b>evelopment</h1>
        <p>Providing value chain analysis for improving operations</p>
      </div>
    </section>
    <section class="mx-4 sm:mx-8 md:mx-12 lg:mx-48 xl:mx-60">
      <section class="welcome-message">
        <h1>Get insights into agri-food value chains in EU partner countries</h1>
        <p>
          Welcome to the value chain Analysis for Development (VCA4D) Information and Knowledge
          Management System. You will find access to all available agricultural value chain analyses
          performed by VCA4D project in different partner countries.
        </p>
        <p>
          Value chain analyses assist in informing policy dialogue and investment operations. They
          help the understanding of how agricultural, aquaculture and fisheries development fits
          within market dynamics. They permit an assessment of the value chains’ impact on
          smallholders, businesses, society, and environment.
        </p>
        <p>
          The European Commission has developed the VCA4D standardised methodological framework for
          analysis (<a
            target="_blank"
            class="link"
            href="https://capacity4dev.europa.eu/info/1-vca4d-methodology_en"
            >The VCA4D Methodology | Capacity4dev</a
          >). It aims at understanding to what extent the value chain allows for inclusive economic
          growth and whether it is both socially and environmentally sustainable.
        </p>
        <p>
          Each VCA4D study provides a functional analysis describing the
          <strong>main functions, flows and actors</strong> of a value chain and elements of reply
          to four framing questions:
        </p>
        <ul class="list-disc ml-8">
          <li>What is the contribution of the value chain to <strong>economic growth?</strong></li>
          <li>Is this economic growth <strong>inclusive?</strong></li>
          <li>Is the value chain <strong>socially</strong> sustainable?</li>
          <li>Is the value chain <strong>environmentally</strong> sustainable?</li>
        </ul>
        <p>
          The VCA4D Information and Knowledge Management System presents the main economic, social
          and environmental indicators for each study, to get an insightful overview of the value
          chain.
        </p>
        <p>
          It also allows users to compare the same products in different countries as well as
          various VCs within a country.
        </p>
        <p>
          The indicators presented in the economic analysis are gathered from the studies’ Agrifood
          Chain Analysis (AFA) software files. For the social indicators, the VCA4D studies’ social
          profiles are employed to inform on the sustainability score levels. Finally, Life Cycle
          Analysis (LCA) software files are the source of the data for the extraction of the
          environmental indicators.
        </p>
      </section>
      <section class="links">
        <div>
          <div>
            <h2><strong>Browse studies</strong></h2>
            <p class="mb-4">
              Browse VCA4D's studies by product and by contries. Then, deep dive on the results
            </p>
          </div>
          <RouterLink class="button" :to="{ name: 'browse' }">Browse studies →</RouterLink>
        </div>
        <div>
          <div>
            <h2><strong>Compare study results</strong></h2>
            <p class="mb-4">
              Draw comparisons between key indicators presented in VCA4D studies : economic growth,
              inclusiveness, social impacts and environmental indicators.
            </p>
          </div>
          <RouterLink class="button" :to="{ name: 'comparison' }">Compare studies →</RouterLink>
        </div>
      </section>
    </section></Skeleton
  >
</template>

<script setup>
import Skeleton from '@components/Skeleton.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
section {
  padding: 1.5rem;
}

section.banner {
  height: 25rem;
  width: 100%;

  background-image: url('../images/home-banner.jpg');
  background-position: center center;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  div {
    height: 60%;
    max-width: 50%;
    padding: 2rem;
    border-radius: 1.5rem;
    background-color: hsla(0, 0%, 0%, 0.7);

    position: relative;
    left: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    h1,
    p {
      color: white;
      margin: 0;
      font-weight: 300;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 500;
      line-height: 1.2;
      margin-top: 0;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
}

.welcome-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    margin-bottom: 1rem;
  }
}

.button {
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background-color: #3f83f8;
  border-radius: 0.25rem;
  right: 0px;

  &:hover {
    background-color: #1a56db;
  }
}

.link {
  color: #1c64f2;

  &:hover {
    text-decoration: underline;
  }
}

.links {
  display: flex;
  gap: 30px;
  position: relative;
  align-items: stretch;
  justify-content: space-around;

  h2 {
    margin-top: 0;
  }
  > * {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 50%;
    justify-content: space-between;
    background-color: #faf7e6;
    padding: 27px 32px;
    border-radius: 15px;
    max-width: 500px;
  }
}
</style>
