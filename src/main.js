import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from "./components/TypeNav"
import Pagination from "./components/Pagination"

import './plugins/swiper' // 加载swiper的配置
import './plugins/element' //加载element-ui相关的配置
import './mock/mockServer'


import * as API from '@/api'



// import '@/api'

// import {reqCartList} from '@/api'
// reqCartList()

// 浏览器控制台不显示非生产环境打包的提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// 1) 创建或指定事件总线对象, 保存到Vue的原型上
// Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate () {
    // 1) 创建或指定事件总线对象, 保存到Vue的原型上
    Vue.prototype.$bus = this
    Vue.prototype.$API = API //当不适用vuex的时候，可以把接口请求函数全部装在对象当中挂在Vue原型身上
  },

  render: h => h(App),
  router, // 注册路由器 ==> 所有组件都可以直接访问2个对象: $router与$route
  store, // 注册vuex  ==> 所有组件都可以直接访问1个对象: $store
}).$mount('#app')


/* -- eslint-disable no-unused-vars */
// const a = 123

/* 
store对象的功能:
读取数据:
  store.state.xxx
  store.getters.yyy
更新数据
  store.dispatch(action名称, data)
  store.commit(mutation名称, data)
*/