import App from './App'
import store from "./store"

// 全局样式引入
import "@/styles/index.scss";

import { request } from "@/utils/http.js"

import config from "@/config"

// import '@/mock' // TODO:使用mock，后续处理成动态引入


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.prototype.$request = request

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif