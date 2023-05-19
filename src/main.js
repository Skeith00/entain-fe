import { store } from './store/store.js'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Install the store instance as a plugin
app.use(store)

app.mount('#app')
