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
import TimeButton from '@/components/TimeButton.vue';
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
        <div class="button-group">
            <TimeButton name="Сегодня" />
            <TimeButton name="Вчера" />
            <TimeButton name="Неделя" />
            <TimeButton name="Месяц" />
            <TimeButton name="Квартал" />
            <TimeButton name="Год" />
        </div>

        <!-- узнать выбранное значение из v-calendar 
            https://stackoverflow.com/questions/53896155/how-to-know-selected-value-of-v-calendar-vue-js -->
        <CalendarButton name="16.07.2023"></CalendarButton>

        <Calendar color="purple" :attributes="attrs" />

        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </button>
            <ul class="dropdown-menu" aria-labelledby="book-dropdown">
                <li><a href="#" class="dropdown-item">
                        <Calendar></Calendar>
                    </a></li>
            </ul>
        </div>
        <p></p>





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
    border: 0.50px rgba(61, 61, 61, 0.10) solid;
    border-radius: 13px;
    overflow: hidden;
}
</style>
