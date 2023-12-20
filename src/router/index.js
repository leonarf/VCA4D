import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudyView from '../views/StudyView.vue'
import Import from '../views/Import.vue'
import Comparison from '../views/Comparison.vue'

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
            path: '/comparison/:params?',
            name: 'comparison',
            component: Comparison
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

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
  })

export default router
