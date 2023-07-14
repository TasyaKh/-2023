<script setup lang="ts">
import NavbarStatistic from '@/components/NavbarStatistic.vue';
import TTable from '@/components/TTable.vue';
import { useRoute } from 'vue-router';

import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { ref, onBeforeMount } from 'vue';

const route = useRoute()
const topvisorStore = useTopvisorStore()

const selectedBrowser = ref(1)

// fetch ids from route
const yandexId = Number(route.params.yandex_id);
const topvisorId = Number(route.params.topvisor_id);

// filters-----------------------------------------------------------------  
//8_6400_000 - one day, 
const date1 = ref(new Date(new Date().getTime() - 8_6400_000 * 30))
// today
const date2 = ref(new Date())

const regions_indexes = ref([88])

// const props = defineProps<{
//     yandexId: number,
//     topvisorId: number,
//     // date1: Date,
//     // date2: Date
// }>()

const sitePositionsData = ref()

onBeforeMount(async () => {
    sitePositionsData.value = await topvisorStore.getSitePositions(topvisorId, date1.value, date2.value, regions_indexes.value)
})

</script>

<template>
    <NavbarStatistic :yandex-id="yandexId" :topvisor-id="topvisorId" />

    <div class="container">
        <div class="row my-3">
            <div class="col-auto"> <select class="form-select" aria-label="project" v-model="selectedBrowser">
                    <option value="1" :selected="selectedBrowser == 1">Яндекс</option>
                    <option value="2" :selected="selectedBrowser == 2">Google</option>
                    <option value="3" :selected="selectedBrowser == 3">Сравнить</option>
                </select>
            </div>
        </div>

        <TTable :data="sitePositionsData" />

    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: 5rem;
}
</style>





