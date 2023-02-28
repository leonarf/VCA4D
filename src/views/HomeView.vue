<script setup>
import Skeleton from '../components/Skeleton.vue'
</script>

<template>
  <Skeleton>
    <section class="banner">
      <div>
        <h1>Value Chain Analysis For Development</h1>
        <h2>Providing value chain analysis for improving operations</h2>
      </div>
    </section>

    <section>
      <h2>Get insight into food value chains in developing countries</h2>
      <p>
        Welcome to the VCA4D website. You will find a tailored access to 35 value chain analyses
        across 16 different agricultural commodities around the world. Based on a standardised
        methodology (*link), each analysis allows an assessment of the value chain's impact on
        smallholders, businesses, society and environment. Any of the VCA4D academic study provides
        information across 4 related domains:
      </p>
      <ul>
        <li>the various actors and <strong>structuration of the chain</strong></li>
        <li>its contribution to <strong>economic growth</strong> and the state's public finance</li>
        <li>the chain's <strong>inclusiveness</strong> and contribution to <strong>employment</strong></li>
        <li>the impact of the value chain on <strong>environment</strong>.</li>
      </ul>
    </section>
  </Skeleton>
</template>

<style scoped lang="scss">

:global(main){
  padding: 0 !important;
}

section{
  padding: 1.5rem;
}

section.banner{
  height: 25rem;

  background-image: url('../images/home-banner.png');
  background-position: center center;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  div{  
    height: 60%;
    max-width: 50%;
    padding: 1rem;
    border-radius: 2rem;
    background-color: hsla(0,0,0, 0.7);

    position: relative;
    left: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    h1, h2{
      color: white;
      margin: 0;
    }

    h1{
      font-size: 3rem;
      line-height: 1.2;
    }

    h2{
      font-size: 1.2rem;
    }
  }
  

}


ul{
  list-style-type: "- ";
}

</style>