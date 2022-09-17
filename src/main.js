import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import TypeBar from '@/components/TypeBar/index.vue' //引入全局组件TypeBar
import '@/icons' // icon
import '@/permission' // permission control
//引入product模块的所有api
import api from '@/api/products'
// 使用mock的数据
import '../mock/mock-server.js'
//
import HintButton from '@/components/HintButton/index.vue'
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
// 将product的所有api挂载到Vue的原型对象上
Vue.prototype.$api = api
// 使用全局组件
Vue.component('TypeBar', TypeBar)
Vue.component('HintButton', HintButton)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
