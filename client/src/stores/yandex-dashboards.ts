
import axios from 'axios'
import { defineStore } from 'pinia'

export const useYandexStore = defineStore('yandex', () => {

    // 6) получить данные по устройствам
    function getDeviceCategory(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'device')
    }


    // 4) посещаемость из поисковых систем
    function visitsFromSearchSystems(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'search-engine')
    }


    async function getDahshboards(ids: number, date1: Date, date2: Date, typeDashboard: string) {

        const res = await axios.get('/api/yandex/dashboards/' + typeDashboard, {
            params: {
                ids: ids,
                date1: date1.toISOString().substring(0, 10),
                date2: date2.toISOString().substring(0, 10)
            }
        })

        const data = res.data

        return data
    }

    return {
        getDeviceCategory,
        visitsFromSearchSystems
    }
})
