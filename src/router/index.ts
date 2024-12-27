import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MemoView',
    component: () => import('@/views/memoView.vue'),
  },
  {
    path: '/members',
    name: 'MembersView',
    component: () => import('@/views/memoView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
