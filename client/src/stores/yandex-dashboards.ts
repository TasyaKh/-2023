
import axios from 'axios'
import { defineStore } from 'pinia'

export const useYandexStore = defineStore('yandex', () => {
   
    // получить данные по устройствам
    async function getDeviceCategory(ids:number, date1:Date, date2:Date) {

        const res = await axios.get('/api/yandex/dashboards/device', {
            params: {
                ids:ids,
                date1: date1.toISOString().substring(0, 10),
                date2: date2.toISOString().substring(0, 10)
            }
        })

        const data = res.data

        return data

    }

    return {
        getDeviceCategory
    }
})
