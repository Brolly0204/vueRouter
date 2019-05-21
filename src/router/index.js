import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

// console.log('installed', VueRouter.install.installed)

Vue.use(VueRouter, {
  title: 'brolly'
})

// console.log('installed', VueRouter.install.installed)

const router = new VueRouter({
  mode: 'hash',
  routes
})

console.log(router.app, router.apps)

export default router
