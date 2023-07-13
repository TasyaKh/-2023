<script setup lang="ts">
import NavbarStatistic from '@/components/NavbarStatistic.vue';
import TTable from '@/components/TTable.vue';
import Loading from '@/components/Loading.vue';
import { useRoute } from 'vue-router';

import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { ref, onBeforeMount } from 'vue';

const route = useRoute()
const topvisorStore = useTopvisorStore()
const loading = ref(false)
// selectd options
// const selectedBrowser = ref(0)

// static values options
// const browsers = [{ id: 0, name: "Яндекс", regions_indexes: [88] },
// { id: 1, name: "Google", regions_indexes: [152] },]
// { id: 2, name: "Сравнить", regions_indexes: [88, 152] }

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
// const regions_indexes = ref([88])

// const props = defineProps<{
//     yandexId: number,
//     topvisorId: number,
//     // date1: Date,
//     // date2: Date
// }>()

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
    // const region_indexes = browsers[selectedBrowser.value].regions_indexes
    sitePositionsData.value = await topvisorStore.getSitePositions(topvisorId, date1.value, date2.value, region_indexes.value).catch((err) => {
        if (err.response) {
            errResponseMsg.value = err.response.data.message[0]
        }
    })
}

async function getRegionIndexes() {
    const projectTopvisor = await topvisorStore.getProjects(topvisorId, 1)
    const regionIndexes = []
    for (let i in projectTopvisor.result[0].searchers) {
        regionIndexes.push(projectTopvisor.result[0].searchers[i].regions[0].index)
    }
    region_indexes.value = regionIndexes
}

</script>

<template>
    <NavbarStatistic :yandex-id="yandexId" :topvisor-id="topvisorId" />

    <div class="container">


        <div v-if="errResponseMsg != ''" class="alert alert-danger" role="alert">
            {{ errResponseMsg }}
        </div>

        {{ date1.toLocaleDateString() }} - {{ date2.toLocaleDateString() }}

        <div class="row-cols-auto">
            <TTable v-if="sitePositionsData" :data="sitePositionsData" />
            <Loading v-else-if="loading" />
        </div>


    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: 5rem;
}
</style>





