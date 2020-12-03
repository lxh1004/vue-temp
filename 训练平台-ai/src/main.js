import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
// element-ui
import './element.js'
import './utils/directives.js';
import onlyNumber from './utils/only_num/index'
Vue.use(onlyNumber)
Vue.config.productionTip = false
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
