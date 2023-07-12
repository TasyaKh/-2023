
import axios from 'axios'
import { defineStore } from 'pinia'

export const useYandexStore = defineStore('yandex', () => {

    // 7) Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)
    function visitsBrowsers(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'browsers')
    }

    // 6) получить данные по устройствам
    function getDeviceCategory(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'device')
    }

    // 5) доля брендового и небрендового трафика
    function segmentTraffic(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'search-phrase')
    }


    // 4) посещаемость из поисковых систем
    function visitsFromSearchSystems(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'search-engine')
    }

    // 3) источники трафика
    function sourceTraffic(ids: number, date1: Date, date2: Date) {
        return getDahshboards(ids, date1, date2, 'source-traffic')
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
        visitsBrowsers,
        getDeviceCategory,
        visitsFromSearchSystems,
        segmentTraffic,
        sourceTraffic
    }
})
