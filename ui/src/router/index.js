import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import CreateClient from '../views/CreateClientView.vue';
import FindClient from '../views/FindClientView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateClient
    },
    {
      path: '/find',
      name: 'find',
      component: FindClient
    }
  ]
});

export default router;
