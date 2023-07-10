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
      path: '/statistic/:yandex_id/:topvisor_id',
      name: 'Statistic',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Statistic/Statistic.vue')
    }
  ]
})

export default router
