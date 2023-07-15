import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router/index'
import pinia from './store'
import registerIcons from './global/register-icons'

// 0 针对ELMessage和ElLoading 等组件引入样式
// 1 全局引入样式()所有样式全部引入
// import 'elment-plus/dist/index.css'
// 2 组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
// 3.使用vite-plugin-style-import
/**
 * npm install vite-plugin-style-import -D
 * npm install consola -D
 * 找到vite.config.ts
 * plugins:[
 *    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    }),
 * ]
 *
 */

// 1.全局注册element-Plus：方便和简洁
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

// 2.按需引入：用到哪个组件引入哪个
// import { ElButton } from 'element-plus'
// app.component(ElButton.name, ElButton)

const app = createApp(App)

app.use(registerIcons)
app.use(router)
app.use(pinia)

app.mount('#app')
