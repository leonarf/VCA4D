<script>
import { RouterLink } from 'vue-router'

</script>

<template>
    <header>
        <RouterLink to="/">VCA4D website</RouterLink>

        <div>
            <img src="/images/logo/agrinatura.jpeg" alt="agrinatura network logo">
            <img src="/images/logo/VCA4D.jpeg" alt="VCA4D logo">
            <img src="/images/logo/european-commission.jpeg" alt="european commission logo">
        </div>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer>
        FOOTER
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

</style>