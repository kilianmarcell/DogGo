import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.css'
import './axios'
import store from './vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

import 'bootstrap/dist/js/bootstrap.js'

createApp(App)
     .use(router)
     .use(store)
     .component('fa', FontAwesomeIcon)
     .mount('#app')
