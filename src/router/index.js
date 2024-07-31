import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from "vue";
const HomeView = defineAsyncComponent(() => import('../views/HomeView.vue'))
const StudyView = defineAsyncComponent(() => import('../views/StudyView.vue'))
const Import = defineAsyncComponent(() => import('../views/Import.vue'))
const Comparison = defineAsyncComponent(() => import('../views/Comparison.vue'))

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
            path: '/comparison',
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
