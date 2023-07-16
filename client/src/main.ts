import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ECharts from 'vue-echarts';

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('v-chart', ECharts);

app.mount('#app')

/* eslint-disable */
// @ts-ignore - это нужно чтобы подавить ошибку в строке ниже (ругается на тип any у v-calendar)
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
/* eslint-enable */
import 'v-calendar/style.css';

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)