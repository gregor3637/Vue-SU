import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router.js'

import items from './modules/items.js'
import order from './modules/order.js'

import axios from '../axios-auth.js';
import globalAxios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,

    
  },
  modules: {
    items,
    order
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken
      state.userId = userData.userId
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      axios.post('/accounts:signUp?key=AIzaSyBV0mabrrdu62jB2Ow06gCA1NrxzYoxQ5k', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log('store> signup', res);
          commit('authUser', {
            idToken: res.data.idToken,
            userId: res.data.localId,//----
            dbUserId: 'zzzzz'
          })
          console.log('xxx) store> signup> postPromise', authData);
          dispatch('storeUser', authData)
        })
        .catch(err => console.log(err));
    },

    login({ commit }, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyBV0mabrrdu62jB2Ow06gCA1NrxzYoxQ5k', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res);
          commit('authUser', {
            idToken: res.data.idToken,
            userId: res.data.localId
          })
          router.replace('/shop');
        })
        .catch(err => console.log(err));
    },

    logout({ commit }) {
      commit('clearAuthData');
      router.replace('/signin');
    },

    storeUser({ commit, state }, userData) {
      console.log('xxxx) store> storeUser>', userData);
      
      if (!state.idToken) {
        console.log('xxxxx) store> storeUser> return');
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => {
          console.log('xxxxx) store> storeUser> save user in relative DB');
          router.replace('/shop');
        })
        .catch(err => console.log(err));

    },


    fetchUser({ commit, state }) {
      if (!state.idToken) {
        console.log('login) store> fetchUser return', state);
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log('login) store> fetchUser ', res);

          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }

          console.log('login) store> fetch', users);
          this.email = users[0].email;
          commit('storeUser', users[0])
        })
        .catch(err => console.log(err));
    },


    buyItems({commit, state, dispatch}, orderData) {
      console.log('store.js) buyItems> orderData', orderData);

      globalAxios.post(`/users/${state.userId}.json` + '?auth=' + state.idToken, orderData)
        .then(res => {
          console.log('store.js) buyItems> orderData> promiseReturn', res)
          console.log('store.js) buyItems> orderData> promiseReturn> removing all order items')
          // state.orderItems = [];
          dispatch('removeAll')
          // commit('removeAll');
          state.orderCost = 0;
          dispatchEvent
          router.replace('/shop');
        })
        .catch(err => console.log(err));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null
    }
  }
})