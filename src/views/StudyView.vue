<template>
    <Skeleton>
        <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-40 xl:mx-48">
            <header>
                <div v-if="!studyData && !error" class="loading">Loading...</div>

                <div v-if="error" class="error">{{ error }}</div>

                <div v-if="studyData">
                    <StudyHeader :studyData="studyData"/>
                </div>
            </header>
            <nav>
                <ol v-if="studyData">
                    <li>
                        <RouterLink :to="'/study?id=' + studyData.id">Overview</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="'/study?id=' + studyData.id + '&view=economic-growth'">Contribution to economic growth</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="'/study?id=' + studyData.id + '&view=inclusiveness'">Inclusiveness</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="'/study?id=' + studyData.id + '&view=social-sustainability'">Social sustainability</RouterLink>
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
            <StudyEconomicGrowth v-if="view === 'economic-growth'" :studyData="studyData"></StudyEconomicGrowth>
            <StudyInclusiveness v-if="view === 'inclusiveness'" :studyData="studyData"></StudyInclusiveness>
            <StudySocialSustainability v-if="view === 'social-sustainability'" :studyData="studyData"></StudySocialSustainability>
        </div>
    </Skeleton>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Skeleton from '../components/Skeleton.vue'
import StudyOverview from '../components/StudyOverview.vue'
import StudyEnvironment from '../components/StudyEnvironment.vue'
import StudyEconomicGrowth from '../components/StudyEconomicGrowth.vue'
import StudyInclusiveness from '../components/StudyInclusiveness.vue'
import StudySocialSustainability from '../components/StudySocialSustainability.vue'
import StudyHeader from '../components/study/StudyHeader.vue'

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