import onlyNumber from './onlyNumber'
const install = Vue => {
  Vue.directive('only-number', onlyNumber)
}
/*
  Vue.use( plugin )
  安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
  如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
  该方法需要在调用 new Vue() 之前被调用。
  当 install 方法被同一个插件多次调用，插件将只会被安装一次。
  --------------------------------------------------------
  调用示例
  最大两位小数
  <el-input
    v-only-number="{ min: 0, max: 100, precision: 2 }"
    v-model.number="price"
  />
  只允许输入整数
  <input
    v-only-number="{ min: -10, max: 100, precision: 0 }"
    v-model.number="price"
  />
*/

if (window.Vue) {
  window['onlyNumber'] = onlyNumber
  Vue.use(install); // eslint-disable-line
}

onlyNumber.install = install
export default onlyNumber