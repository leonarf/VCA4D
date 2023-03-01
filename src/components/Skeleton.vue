<script>
import { RouterLink } from 'vue-router'

</script>

<template>
    <header>
        <RouterLink to="/">VCA4D website</RouterLink>

        <div>
            <!--
            <img src="/images/logo/agrinatura.jpeg" alt="agrinatura network logo">
            <img src="/images/logo/VCA4D.jpeg" alt="VCA4D logo">
            <img src="/images/logo/european-commission.jpeg" alt="european commission logo">
            -->
            <img class="TODO" alt="agrinatura network logo">
            <img class="TODO" alt="VCA4D logo">
            <img class="TODO" alt="european commission logo">
        </div>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer class="TODO">
        <ul>
            <li><a href="https://github.com/DavidBruant/VCA4D">Code source sur Github</a></li>
        </ul>
    </footer>
</template>

<style scoped lang="scss">
header{
    height: 10rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > a{
        font-size: 2rem;
        font-weight: bold;
        color: #929292;
        text-transform: uppercase;
        text-decoration: none;
    }

    & > div{
        height: 100%;

        display: flex;
        flex-direction: row;

        img{
            height: 100%;
            width: 7rem;
            margin: 0 1rem;
            background-color: grey;

            text-align: center;
        }
    }
}

main{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}


footer{
    min-height: 10rem;
    background-color: grey;
}

</style>