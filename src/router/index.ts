import AboutView from '@/views/about-view.vue'
import LandingPageView from '@/views/landing-page-view.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: LandingPageView
  },
  {
    path: '/about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
