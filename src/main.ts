import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router/index'
import pinia from './store'

// 1.全局注册element-Plus：方便和简洁
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

// 2.按需引入：用到哪个组件引入哪个
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
