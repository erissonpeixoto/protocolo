// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import Vue from 'vue'
import App from './app.vue'
import router from './routes.js';
import axios from 'axios'
import VueAxios from 'vue-axios'
import DateMoment from '../packs/tools/date.js';

import 'initializers/adminlte'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use (VueAxios, axios)
Vue.use(DateMoment)
Vue.config.productionTip = false

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {
  const authHeaders = JSON.parse(window.localStorage.getItem('authHeaders'))
  if(authHeaders) {
    config.headers[config.method] = {
      'access-token': authHeaders['access-token'],
      'client': authHeaders['client'],
      'uid': authHeaders['uid']
    }
  } else {
    window.localStorage.removeItem('authHeaders');
  }

  return config;
}, function (error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {
  if(response.headers['access-token']) {
    const authHeaders = {
      'access-token': response.headers['access-token'],
      'client': response.headers['client'],
      'uid': response.headers['uid'],
      'expiry': response.headers['expiry'],
      'token-type': response.headers['token-type']
    }
    window.localStorage.setItem('authHeaders', JSON.stringify(authHeaders));
  } else {
    window.localStorage.removeItem('authHeaders');
  }
  return response;
}, function (error) {
  return Promise.reject(error)
});


document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
})