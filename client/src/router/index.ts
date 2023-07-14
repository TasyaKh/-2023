import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: () => import('@/views/Projects.vue'),
    },
    
    // {
    //   path: '/statistic/:yandex_id/:topvisor_id',
    //   name: 'Statistic',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/Statistic/Statistic.vue')
    // },
    {
      path: '/site-positions/:yandex_id/:topvisor_id',
      name: 'SitePositions',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Statistic/SitePositions.vue')
    },
    {
      path: '/dashboards/:yandex_id/:topvisor_id',
      name: 'Dashboards',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Statistic/Dashboards.vue')
    }
    
  ]
})

export default router
