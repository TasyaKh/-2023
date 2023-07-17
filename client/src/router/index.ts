import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: () => import('@/views/Projects.vue'),
    },

    {
      path: '/site-positions/:yandex_id/:topvisor_id',
      name: 'SitePositions',

      component: () => import('../views/Statistic/SitePositions.vue')
    },
    {
      path: '/dashboards/:yandex_id/:topvisor_id',
      name: 'Dashboards',

      component: () => import('../views/Statistic/Dashboards.vue')
    },
    {
      path: '/goal-dimensions/:yandex_id/:topvisor_id',
      name: 'GoalDimensions',

      component: () => import('../views/Statistic/GoalDimensions.vue')
    }


  ]
})

export default router
