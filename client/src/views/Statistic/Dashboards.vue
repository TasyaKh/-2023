<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useYandexStore } from '@/stores/yandex-dashboards';
import { useTopvisorStore } from '@/stores/topvisor-dashboards';

import { useChartConverterStore } from '@/stores/chart_converter';

// graphics
import EPie from '@/components/Charts/EPie.vue';
import EStackedArea from '@/components/Charts/EStackedArea.vue';
import { useRoute } from 'vue-router';
import NavbarStatistic from '@/components/NavbarStatistic.vue';
import TodayYesterdayWeekButton from '@/components/TodayYesterdayWeekButton.vue';
import CalendarButton from '@/components/CalendarButton.vue';
/* eslint-disable */
// @ts-ignore - это нужно чтобы подавить ошибку в строке ниже (ругается на тип any у v-calendar)
import Calendar from '@/components/Calendar.vue';
/* eslint-enable */

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
const topvisorStore = useTopvisorStore();

const chartConverterStore = useChartConverterStore();

// const dataDeviceCategory = ref()
// const graphics = ref(
//     [deviceCategory = null]
// )

// data ---------------------------------------------------------------

const searchEngineData = ref()
const segmentTrafficData = ref()
const dataDeviceCategory = ref()

onBeforeMount(async () => {
    await fetchGraphics()
})

async function fetchGraphics() {

    // 4) посещаемость из поисковых систем
    searchEngineData.value = await yandexlStore
        .visitsFromSearchSystems(yandexId, date1.value, date2.value)

    // 5) доля брендового и небрендового трафика
    segmentTrafficData.value = await yandexlStore
        .segmentTraffic(yandexId, date1.value, date2.value)

    // 6) device category
    dataDeviceCategory.value = await yandexlStore
        .getDeviceCategory(yandexId, date1.value, date2.value)

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

        <!-- контейнер для кнопок, связанных с указанием дат -->
        <div class="container-for-date-element">
            <ul>
                <!-- группа кнопок -->
                <div class="button-group">
                    <TodayYesterdayWeekButton name="Сегодня" />
                    <TodayYesterdayWeekButton name="Вчера" />
                    <TodayYesterdayWeekButton name="Неделя" />
                    <TodayYesterdayWeekButton name="Месяц" />
                    <TodayYesterdayWeekButton name="Квартал" />
                    <TodayYesterdayWeekButton name="Год" />
                </div>
            </ul>
            <!-- (для Таси) статья как узнать выбранное значение из v-calendar (чтобы оно синхронизировалось с датой в кнопке, которая выше календаря)
            https://stackoverflow.com/questions/53896155/how-to-know-selected-value-of-v-calendar-vue-js -->
            <ul>
                <!-- кнопка для указания дат с помощью календаря -->
                <CalendarButton></CalendarButton>
            </ul>
        </div>

        <!-- {{ preparedData.deviceCategory }} -->
        <div class="chart-container">
            <!-- statistic -->

            <div class="row">
                <!-- 6 устройства -->
                <div class="col">

                    <div class="block-content">

                        <div class="row d-flex justify-content-center text-center">

                            <EPie v-if="dataDeviceCategory && dataDeviceCategory.data" :subtext="'визиты'"
                                :name="'Устройства'" :data="dataDeviceCategory.data" />

                        </div>
                    </div>
                </div>

                <!--  5) доля брендового и небрендового трафика -->
                <div class="col-12">

                    <div class="block-content-full">

                        <div class="row d-flex justify-content-center text-center">

                            <EPie v-if="segmentTrafficData && segmentTrafficData.data" :subtext="'визиты'"
                                :name="'Сегментация трафика'" :data="segmentTrafficData.data" />

                        </div>
                    </div>
                </div>

                <!-- 4 визиты -->
                <div class="col-12">

                    <div class="block-content-full">

                        <div class="row d-flex justify-content-center text-center">

                            <EStackedArea v-if="searchEngineData && searchEngineData.data" :title="'Поисковые системы'"
                                :data="searchEngineData.data" :time_intervals="searchEngineData.time_intervals" />

                            <!-- <EStackedArea /> -->
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