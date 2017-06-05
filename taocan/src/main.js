// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
     zh: {
       hello: '你好',
       baibai: '再见'
     },
     en: {
       hello: 'hello',
       baibai: 'beybey'
     }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
