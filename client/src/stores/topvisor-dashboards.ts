import { defineStore } from 'pinia'
import axios from 'axios'

export const useTopvisorStore = defineStore('topvisor', () => {

  async function getSitePositions(project_id: number, date1: Date, date2: Date, regions_indexes = [88]) {
    
    const res = await axios.get('/api/topvisor/positions/', {
        params: {
            project_id: project_id,
            date1: date1.toISOString().substring(0, 10),
            date2: date2.toISOString().substring(0, 10),
            regions_indexes:regions_indexes
        }
    })

    const data = res.data

    return data
  }

  async function getProjects() {
    
    const res = await axios.get('/api/topvisor/projects/')

    const data = res.data

    return data
  }

  return {
    getSitePositions,
    getProjects
  }
})
