// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.min.css'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import router from './router'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: 'black',
    secondary: '#ffd304',
    accent: colors.orange,
    error: colors.red.darken2,
    warning: colors.yellow.darken2,
    info: colors.blue.darken2,
    success: colors.green.darken2
  },
  iconfont: 'mdi'
})

Vue.config.productionTip = false

window.blockstack = require('blockstack')

Vue.prototype.$eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
