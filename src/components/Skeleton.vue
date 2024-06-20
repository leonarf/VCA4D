<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
    skipFooter: {
        type: Boolean,
        default: false,
    },
});

</script>

<template>
    <header>
        <RouterLink to="/">VCA4D Information System</RouterLink>

        <div class="flex flex-row gap-6 items-center">
            <img src="../images/logo/agrinatura.svg" height="60" width="116" alt="agrinatura network logo">
            <img src="../images/logo/vca4d.jpg" height="62" width="153" alt="VCA4D logo">
            <img src="../images/logo/european_commission.svg" height="81" width="117" alt="european commission logo">
        </div>
    </header>

    <main class="corps">
        <slot></slot>
    </main>

    <footer v-if="!skipFooter">
        <ul>
            <li><a href="https://github.com/leonarf/VCA4D">Code source sur Github</a></li>
            <li>
                <RouterLink to="/admin-import">Import a study</RouterLink>
            </li>
            <li>
                <a href="https://capacity4dev.europa.eu/projects/value-chain-analysis-for-development-vca4d_en">VCA4D's website project</a>
            </li>
            <li>
                <a href="https://lebasic.com/">Website developped by Basic</a>
            </li>
        </ul>
    </footer>
</template>

<style scoped lang="scss">
header {
    height: 10rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-left: 50rem;

    &>a {
        font-size: 1.5rem;
        font-weight: bold;
        color: #929292;
        text-transform: uppercase;
        text-decoration: none;
    }
}

// main {
//     @apply flex flex-col justify-start items-center
// }

.corps{
    // max-width: 800px;
    margin: auto;
    align-items: left;
}


footer {
    min-height: 10rem;
    background-color: grey;
}
</style>