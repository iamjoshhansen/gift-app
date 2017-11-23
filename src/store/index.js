import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  // strict disallows state changes outside of Mutation functions
  strict: process.env.NODE_ENV !== 'production',

  state: {
    user: null,
    followers: [],
  },

  getters,
  mutations,
  actions,
});

export default store;
