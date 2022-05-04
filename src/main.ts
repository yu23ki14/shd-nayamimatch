import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

createApp(App).use(router).use(VueAxios, axios).mount('#app')
