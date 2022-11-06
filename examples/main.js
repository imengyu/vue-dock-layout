import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/iconfont.css'

createApp(App)
  .use(router)
  .mount('#app')
