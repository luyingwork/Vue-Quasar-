import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import quoteJourney from './quote-journey'
import customerPortal from './customer-portal'
import policyChange from './policy-change'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      quoteJourney,
      customerPortal,
      policyChange
    }
  })

  return Store
}
