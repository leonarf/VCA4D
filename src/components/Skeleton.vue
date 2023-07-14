<script>
import { RouterLink } from 'vue-router'

</script>

<template>
    <header>
        <RouterLink to="/">VCA4D Information System</RouterLink>

        <div class="flex flex-row gap-6 items-center">
            <img src="../images/logo/agrinatura.jpg" height="60" width="116" alt="agrinatura network logo">
            <img src="../images/logo/vca4d.jpg" height="62" width="153" alt="VCA4D logo">
            <img src="../images/logo/european_commission.jpg" height="81" width="117" alt="european commission logo">
        </div>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer class="TODO">
        <ul>
            <li><a href="https://github.com/leonarf/VCA4D">Code source sur Github</a></li>
            <li><a href="./import-study.html">(admin) Import a study</a></li>
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
        font-size: 1.5rem;
        font-weight: bold;
        color: #929292;
        text-transform: uppercase;
        text-decoration: none;
    }
}

main{
    @apply flex flex-col justify-start items-center
}


footer{
    min-height: 10rem;
    background-color: grey;
}

</style>