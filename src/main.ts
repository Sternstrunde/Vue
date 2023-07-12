import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(router)
app.mount('#app')
