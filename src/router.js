import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store.js'

import WelcomePage from './components/welcome/welcome.vue'
import HistoryPage from './components/history/history.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import StorePage from './components/store/store.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/store', component: StorePage,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next()
      }
      else {
        next('/signin')
      }
    }
  },
  {
    path: '/history', component: HistoryPage,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next()
      }
      else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({ mode: 'history', routes })