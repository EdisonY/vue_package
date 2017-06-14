// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import api from './config/api'
import draggable from 'vuedraggable'
Vue.prototype.$api = api


Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(iView)
Vue.use(draggable)
Vue.config.productionTip = false

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
     zh: {
       pay_switch: '支付开关'
     },
     en: {
       pay_switch: '支付开关'
     }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  iView,
  ElementUI,
  draggable,
  template: '<App/>',
  components: { App }
})
