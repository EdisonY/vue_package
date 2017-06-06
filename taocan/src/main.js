// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
     zh: {
       pay_switch: '支付开关'
     },
     en: {
       
     }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  ElementUI,
  template: '<App/>',
  components: { App }
})
