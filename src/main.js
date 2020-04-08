import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  error: './img/error@2x.png',
  loading: './img/default@2x.png',// 懒加载使用的图片
})

new Vue({
  render: h => h(App),
}).$mount('#app')
