import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// import store from '../store/index'
import axios from 'axios'
Vue.use(axios)
Vue.use(VueRouter, axios)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  /*
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.anonymous)) {
      next()
    } else {
      if (!store.getters.customerPortal.isAuthenticated) {
        next({
          path: '/home',
          params: { nextUrl: to.fullPath }
        })
      }
    }
    next()
  })
  */

  return Router
}
