import { defineStore } from 'pinia'
import axios from 'axios'

export const useGeneralStore = defineStore('general', () => {

    async function getProjects(search_string: string = "", ordersTopvisor = []) {

        const ss = search_string.length > 0 ? search_string : null
        const res = await axios.get('/api/general/projects', {
            params: {
                search_string: ss,
                orders: ordersTopvisor
            }
        })
        const data = res.data

        return data

    }

    return {
        getProjects
    }
})
