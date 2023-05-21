<script setup>
import { RouterLink } from 'vue-router'
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

        <section class="study-list">
            <section class="introduction">
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

            <section class="by-product">
                <h3>Studies by <strong>product</strong></h3>
                
                <h4>Animal Products</h4>
                <strong class="TODO" >NOTHING</strong>
                
                <h4>Orchards</h4>
                <ul>
                    <li>
                        <RouterLink to="/study?id=anacarde-mali-2014">
                            <img class="TODO" src="../images/product-pictograms/cashew.jpeg" alt="cashew pictogram - link to Mali 2014 anacarde study">
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/study?id=cashew-mali-2021">
                            <img class="TODO" src="../images/product-pictograms/cashew.jpeg" alt="cashew pictogram - link to Mali 2021 cashew study">
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/study?id=mangue-burkina-faso-2016">
                            <img class="TODO" src="../images/product-pictograms/mango.png" alt="mango pictogram - link to Burkina-Faso 2016 mango study">
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/study?id=milk-burundi-2020">
                            <img class="TODO" src="../images/product-pictograms/milk.png" alt="milk pictogram - link to Burundi 2020 milk study">
                        </RouterLink>
                    </li>
                </ul>
                
                <h4>Field crops</h4>
                <strong class="TODO" >NOTHING</strong>


            </section>

            <section class="by-country">
                <h3>Studies by <strong>country</strong></h3>

                <h4>Burundi</h4>
                <ul>
                    <li>
                        <RouterLink to="/study?id=milk-burundi-2020">Milk 2020</RouterLink>
                    </li>
                </ul>

                <h4>Burkina-Faso</h4>
                <ul>
                    <li>
                        <RouterLink to="/study?id=mangue-burkina-faso-2016">Mangue 2016</RouterLink>
                    </li>
                </ul>

                <h4>Mali</h4>
                <ul>
                    <li>
                        <RouterLink to="/study?id=anacarde-mali-2014">Anacarde 2014</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/study?id=cashew-mali-2021">Anacarde 2021</RouterLink>
                    </li>
                </ul>

            </section>


        </section>
    </Skeleton>
</template>

<style scoped lang="scss">
:global(main) {
    padding: 0 !important;
}

section {
    padding: 1.5rem;
}

section.banner {
    height: 25rem;
    width: 100%;

    background-image: url('../images/home-banner.png');
    background-position: center center;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    div {
        height: 60%;
        max-width: 50%;
        padding: 1rem;
        border-radius: 2rem;
        background-color: hsla(0, 0%, 0%, 0.7);

        position: relative;
        left: 4rem;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        h1,
        h2 {
            color: white;
            margin: 0;
        }

        h1 {
            font-size: 3rem;
            line-height: 1.2;
        }

        h2 {
            font-size: 1.2rem;
        }
    }
}


section.study-list {
    max-width: 100ch;
    margin: 0 auto;

    section.introduction {

        ul {
            list-style-type: "- ";
        }

    }

    section.by-product{
        ul{
            height: 6rem;
            
            display: flex;
            flex-direction: row;

            li{
                height: 100%;
                margin: 0 0.5rem;

                &:first-child{
                    margin-left: 0;
                }

                img{
                    height: 100%;
                    width: 6rem;
                }
            }
            
        }


    }

}
</style>