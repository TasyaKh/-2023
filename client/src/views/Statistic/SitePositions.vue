<script setup lang="ts">
import NavbarStatistic from '@/components/NavbarStatistic.vue';
import TTable from '@/components/TTable.vue';
import { useRoute } from 'vue-router';

import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { ref, onBeforeMount } from 'vue';

const route = useRoute()
const topvisorStore = useTopvisorStore()

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

// const regions_indexes = ref([88])

// const props = defineProps<{
//     yandexId: number,
//     topvisorId: number,
//     // date1: Date,
//     // date2: Date
// }>()

const sitePositionsData = ref()

onBeforeMount(async () => {
    await getRegionIndexes()
    await fetchSitePositions()
})

// получить позиции
async function fetchSitePositions() {
    // const region_indexes = browsers[selectedBrowser.value].regions_indexes
    sitePositionsData.value = await topvisorStore.getSitePositions(topvisorId, date1.value, date2.value, region_indexes.value)

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
        {{ date1.toLocaleDateString() }} - {{ date2.toLocaleDateString() }}
        <!-- <div class="row my-3">
            <div class="col-auto">
                <select class="form-select" aria-label="project" v-model="selectedBrowser" @change="fetchSitePositions()">
                    <option v-for="item in browsers" :value="item.id" :selected="selectedBrowser == item.id">
                        {{ item.name }}
                    </option>
                </select>
            </div>
        </div> -->

        <TTable v-if="sitePositionsData" :data="sitePositionsData" />

    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: 5rem;
}
</style>





