import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// main.js
import uView from "uview-ui";
Vue.use(uView);

import API_URL from './api/api.js'
uni.$url = API_URL

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

// 请求拦截器
$http.beforeRequest = function(options) {
	
	// content-type 改为json格式
	if (options.url.indexOf('/api/info/save') !== -1) {
		options.header = {
			'content-type' : 'application/json; charset=utf-8'
		}
		return
	}

	// content-type 'application/x-www-form-urlencoded;charset=utf-8'
	// if (options.url.indexOf('/') !== -1) {

	// 	options.header = {
	// 		'Authorization': store.state.m_user.token,
	// 		'content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
	// 	}
	// 	return
	// }
	
}


// 响应拦截器
$http.afterRequest = function(res) {
  uni.hideLoading()


}

// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif