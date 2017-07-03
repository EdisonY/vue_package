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
import VueForm from 'vue-form'

Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(iView)
Vue.use(draggable)
Vue.use(VueForm);
Vue.config.productionTip = true

const i18n = new VueI18n({
    locale: navigator.language,
    messages: {
        'zh-CN': require('./common/lang/zh'),
        'en-US': require('./common/lang/en')
    }
})

new Vue({
  el: '#app',
  router,
  i18n,
  iView,
  ElementUI,
  draggable,
  VueForm,
  template: '<App/>',
  components: { App }
})
