import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import { routes } from './routes.js'
import store from './store/store.js'

Vue.use(VueRouter);
Vue.use(VueResource); 

Vue.http.options.root = 'https://examprep-c35f8.firebaseio.com/';

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
})

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});


new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
