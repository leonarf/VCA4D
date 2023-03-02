<template>
    <Skeleton>
        <header>
            <div v-if="!studyData && !error" class="loading">Loading...</div>

            <div v-if="error" class="error">{{ error }}</div>

            <ul v-if="studyData">
                <li>
                    <span>{{ studyData.product }}</span>
                </li>
                <li>
                    <span>{{ studyData.country }}</span>
                </li>
                <li>
                    <span>{{ studyData.year }}</span>
                </li>
            </ul>
        </header>
        <nav>
            <ol v-if="studyData">
                <li>
                    <RouterLink :to="'/study?id=' + studyData.id">Overview</RouterLink>
                </li>
                <li>
                    <a class="TODO">Contribution to economic growth</a>
                </li>
                <li>
                    <a class="TODO">Inclusiveness</a>
                </li>
                <li>
                    <a class="TODO">Social sustainability</a>
                </li>
                <li>
                    <RouterLink :to="'/study?id=' + studyData.id + '&view=environment'">Environmental sustainability</RouterLink>
                </li>
                <li>
                    <a class="TODO">Study brief and full report</a>
                </li>
            </ol>
        </nav>

        <StudyOverview v-if="view === undefined" :studyData="studyData"></StudyOverview>
        <StudyEnvironment v-if="view === 'environment'" :studyData="studyData"></StudyEnvironment>

        
    </Skeleton>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Skeleton from '../components/Skeleton.vue'
import StudyOverview from '../components/StudyOverview.vue'
import StudyEnvironment from '../components/StudyEnvironment.vue'

</script>

<script>
//@ts-check
import getStudyData from '../studyData.js'

export default {
    name: 'StudyView',
    props: [],
    data() {
        return {
            view: undefined,
            studyData: undefined,
            error: undefined
        }
    },
    created: function() {
        const studyId = this.$route.query.id
        const studyView = this.$route.query.view
        
        console.log('studyId view', studyId, studyView)
        this.view = studyView

        getStudyData(studyId).then(studyData => {
            this.studyData = studyData
        })
        .catch(err => {
            this.error = err;
        })
    },
    beforeRouteUpdate: function(to, from){
        console.log('lifecycle beforeRouteLeave', to, from)

        const view = to.query.view

        this.view = view;
        
    }
}
</script>

<style scoped lang="scss">

header, nav, article{
    width: 64rem;
}

header{
    font-size: 2rem;

    ul{
        background-color: lightgreen;

        border-radius: 2rem;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
}

nav {
    ol{
        list-style: none;
        margin: 0;
        margin-left: 5rem;

        li{

        }
    }
}


</style>