import AboutView from '@/views/about-view.vue'
import DeveloperView from '@/views/developer-view.vue'
import LandingPageView from '@/views/landing-page-view.vue'
import LoginView from '@/views/login-view.vue'
import RegisterView from '@/views/register-view.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: LandingPageView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/developer',
    component: DeveloperView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
