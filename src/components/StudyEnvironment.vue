<template>
    <article>
        <h1>Is the value chain environmentally sustainable? </h1>
        <pre>{{ JSON.stringify(studyData, null, 2) }}</pre>

    </article>

</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
//@ts-check

export default {
    name: 'StudyEnvironment',
    props: ['studyData'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">

article {

}

</style>