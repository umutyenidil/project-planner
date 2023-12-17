import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/projects',
    redirect: { name: 'home' },
  },
  {
    path: '/projects/add',
    name: 'add-project',
    component: () => import('@/views/AddProjectView.vue'),
  },
  {
    path: '/projects/:id/edit',
    name: 'edit-project',
    component: () => import('@/views/EditProjectView.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
