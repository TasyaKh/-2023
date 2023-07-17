<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import { useYandexStore } from '@/stores/yandex-dashboards';
import TimeRanges from '@/components/TimeRanges.vue';

// graphics
import EPie from '@/components/Charts/EPie.vue';
import EStackedArea from '@/components/Charts/EStackedArea.vue';


import { useRoute } from 'vue-router';
import NavbarStatistic from '@/components/NavbarStatistic.vue';
import Loading from '@/components/Loading.vue';
import Totals from '@/components/Charts/Totals.vue';

const route = useRoute()

// fetch ids from route
const yandexId = Number(route.params.yandex_id);
const topvisorId = Number(route.params.topvisor_id);

// filters-----------------------------------------------------------------  
//8_6400_000 - one day, 
const date1 = ref(new Date(new Date().getTime() - 8_6400_000 * 30))
// today
const date2 = ref(new Date())


const yandexlStore = useYandexStore();

// data for graphics ---------------------------------------------------------------

const sourceTraffic = ref()
const searchEngineData = ref()
const segmentTrafficData = ref()
const dataDeviceCategory = ref()
const visitsBrowsers = ref()

onBeforeMount(async () => {

    await fetchGraphics()
})

async function fetchGraphics() {

    // 3)источники трафика
    sourceTraffic.value = await yandexlStore
        .sourceTraffic(yandexId, date1.value, date2.value)

    // 4) посещаемость из поисковых систем
    searchEngineData.value = await yandexlStore
        .visitsFromSearchSystems(yandexId, date1.value, date2.value)

    // 5) доля брендового и небрендового трафика
    segmentTrafficData.value = await yandexlStore
        .segmentTraffic(yandexId, date1.value, date2.value)

    // 6) device category
    dataDeviceCategory.value = await yandexlStore
        .getDeviceCategory(yandexId, date1.value, date2.value)

    // 7) Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)
    visitsBrowsers.value = await yandexlStore
        .visitsBrowsers(yandexId, date1.value, date2.value)


}

// при изменени времени
function handleTimeChanged(startDate: Date, endDate: Date) {
    date1.value = startDate
    date2.value = endDate

    fetchGraphics()
}

// для v-calendar
const attrs = ref([
    {
        highlight: true,
        dates: new Date(),
    },
]);
</script>

<template>
    <NavbarStatistic :yandex-id="yandexId" :topvisor-id="topvisorId" />


    <div class="container">

        <TimeRanges :handleTimeChanged="handleTimeChanged"  :date1="date1" :date2="date2"/>
        <!-- {{ preparedData.deviceCategory }} -->
        <div class="chart-container">
            <!-- statistic -->

            <div class="row">
                <!-- 6 устройства -->
                <div class="col">

                    <div class="block-content">

                        <div class="row d-flex justify-content-center text-center">

                            <EPie v-if="dataDeviceCategory" :subtext="'визиты'" :name="'Устройства'"
                                :data="dataDeviceCategory" />
                            <Loading v-else />

                        </div>
                    </div>
                </div>

                <!-- 7  Поисковые системы информация о поисковых системах, которые привели посетителей на сайт)-->
                <div class="col">

                    <div class="block-content">

                        <div class="row d-flex justify-content-center text-center">

                            <Totals v-if="visitsBrowsers" title="Поисковые системы" :data="visitsBrowsers" />
                            <Loading v-else />

                        </div>
                    </div>
                </div>

                <!--  3)  источники трафика -->
                <div class="col-12">

                    <div class="block-content-full">

                        <div class="row d-flex justify-content-center text-center">

                            <EPie v-if="sourceTraffic" :subtext="'визиты'" :name="'Источники трафика'"
                                :data="sourceTraffic" />
                            <Loading v-else />
                        </div>
                    </div>
                </div>



                <!--  5) доля брендового и небрендового трафика -->
                <div class="col-12">

                    <div class="block-content-full">

                        <div class="row d-flex justify-content-center text-center">

                            <EPie v-if="segmentTrafficData" :subtext="'визиты'" :name="'Сегментация трафика'"
                                :data="segmentTrafficData" />
                            <Loading v-else />
                        </div>
                    </div>
                </div>

                <!-- 4 визиты -->
                <div class="col-12">

                    <div class="block-content-full">

                        <div class="row d-flex justify-content-center text-center">

                            <EStackedArea v-if="searchEngineData && searchEngineData.data" :title="'Поисковые системы'"
                                :data="searchEngineData.data" />
                            <Loading v-else />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
// statistic-----------------------------------------------------------------------------
.chart-container {
    width: 100%;
    margin: auto;

}

// copied from Statistic
.block-content,
.block-content-full {
    border: 2px solid #3D3D3D1A;
    border-radius: 20px;
    padding: 20px;
    margin: 30px auto 30px auto;
    // width: 50%;
    flex-wrap: wrap;
    background: white;

}


.block-content-full {
    width: auto;

}

.container {
    margin-top: 5rem;
}

.button-group {
    display: inline-flex;
    border: 0.1px rgba(61, 61, 61, 0.10) solid;
    border-radius: 13px;
    overflow: hidden;
}

// контейнер для кнопок, связанных с указанием дат
.container-for-date-element {
    display: inline-flex;
    flex-wrap: wrap;
    padding: auto;
}
</style>