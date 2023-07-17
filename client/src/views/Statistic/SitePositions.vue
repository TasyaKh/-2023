<script setup lang="ts">

import NavbarStatistic from '@/components/NavbarStatistic.vue';
import TTable from '@/components/TTable.vue';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';

import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { ref, onBeforeMount } from 'vue';
import TimeRanges from '@/components/TimeRanges.vue';

const route = useRoute()
const topvisorStore = useTopvisorStore()
const loading = ref(false)

// fetch ids from route
const yandexId = Number(route.params.yandex_id);
const topvisorId = Number(route.params.topvisor_id);

const region_indexes = ref()
// filters-----------------------------------------------------------------  
//8_6400_000 - one day, 
const date1 = ref(new Date(new Date().getTime() - 8_6400_000 * 30))
// today
const date2 = ref(new Date())


const errResponseMsg = ref("")

const sitePositionsData = ref()

onBeforeMount(async () => {

    await getData()
})


async function getData() {
    loading.value = true

    await getRegionIndexes()
    await fetchSitePositions()

    loading.value = false

}

// получить позиции
async function fetchSitePositions() {

    let res = await topvisorStore.getSitePositions(topvisorId, date1.value, date2.value, region_indexes.value).catch((err) => {
        if (err.response) {
            errResponseMsg.value = err.response.data.message[0]
        }

    })
    // const region_indexes = browsers[selectedBrowser.value].regions_indexes
    sitePositionsData.value = res[0]
}

// получить индексы регионов
async function getRegionIndexes() {
    const projectTopvisor = await topvisorStore.getProjects(topvisorId, 1)
    let regionIndexes = []
    regionIndexes = projectTopvisor.regions

    region_indexes.value = regionIndexes
}

async function handleTimeChanged(startDate: Date, endDate: Date) {
    date1.value = startDate
    date2.value = endDate

    await fetchSitePositions()
}

</script>

<template>
    <NavbarStatistic :yandex-id="yandexId" :topvisor-id="topvisorId" />
   
    <div class="container">

        <!-- {{ date1.toLocaleDateString() }} - {{ date2.toLocaleDateString() }} -->
        <!-- <TimeRanges :handleTimeChanged="handleTimeChanged"  :date1="date1" :date2="date2"/> -->

        <!-- в случае ошибки -->
        <div v-if="errResponseMsg != ''" class="alert alert-danger" role="alert">
            {{ errResponseMsg }}
        </div>

        <!-- {{ sitePositionsData }} -->
        <div class="row-cols-auto ">
            <TTable v-if="sitePositionsData" :sitePositionsData="sitePositionsData" />
            <Loading v-else-if="loading" />
        </div>


    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: 5rem;
}
</style>





