import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './index.css'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// import { VueSpinnersPlugin } from 'vue3-spinners'

const app = createApp(App)

app.use(MotionPlugin)
app.use(LoadingPlugin);
// app.use(VueSpinnersPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
