import Vue from 'vue'
import VueRouter from './vue-router'
import routes from './routes.js'

Vue.use(VueRouter, {
  title: 'brolly'
})

export default new VueRouter({
  mode: 'hash',
  routes
})
