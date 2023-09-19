import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudyView from '../views/StudyView.vue'
import Import from '../views/Import.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/study',
            name: 'study',
            component: StudyView
        },
        {
            path: '/admin-import',
            name: 'import',
            component: Import
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: HomeView,
            beforeEnter: (to, from, next) => {
                next({ name: 'home', replace: true });
            }
        }
    ]
})

export default router
