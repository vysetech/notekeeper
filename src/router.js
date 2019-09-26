import Vue from 'vue'
import Router from 'vue-router'
import Notes from '@/pages/Notes'
import Landing from '@/pages/Landing'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Landing,
      name: 'landing'
    },
    {
      path: '/notes',
      component: Notes,
      name: 'notes',
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.requiresAuth)) {
    if (!store.state.signedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
