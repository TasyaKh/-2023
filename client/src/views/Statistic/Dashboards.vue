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

</script>

<template>
    <NavbarStatistic :yandex-id="yandexId" :topvisor-id="topvisorId" />

    <div class="container">
        <!-- <div class="time-container">
            <div class="btn-group" type="checkbox" id="time-buttonControl">
                <label class="btn" for="time-buttonControl">Click</label>
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
                <TimeButton name="Сегодня" />
            </div>
        </div>
        <p></p>

        <span
            class="radio-button radio-button_size_s radio-button_theme_normal radio-button_view_classic i-bem radio-button_js_inited"
            data-bem="{&quot;radio-button&quot;:{&quot;live&quot;:false}}"><label
                class="radio-button__radio radio-button__radio_side_left" for="uniq16893775684661"><input
                    class="radio-button__control" value="today" autocomplete="off" id="uniq16893775684661" type="radio"
                    name="period"><span class="radio-button__text">Сегодня</span></label><label
                class="radio-button__radio radio-button__radio_checked_yes" for="uniq16893775684662"><input
                    class="radio-button__control" value="yesterday" autocomplete="off" id="uniq16893775684662" type="radio"
                    name="period"><span class="radio-button__text">Вчера</span></label><label class="radio-button__radio"
                for="uniq16893775684663"><input class="radio-button__control" value="week" autocomplete="off"
                    id="uniq16893775684663" type="radio" name="period"><span
                    class="radio-button__text">Неделя</span></label><label class="radio-button__radio"
                for="uniq16893775684664"><input class="radio-button__control" value="month" autocomplete="off"
                    id="uniq16893775684664" type="radio" name="period"><span
                    class="radio-button__text">Месяц</span></label><label class="radio-button__radio"
                for="uniq16893775684665"><input class="radio-button__control" value="quarter" autocomplete="off"
                    id="uniq16893775684665" type="radio" name="period"><span
                    class="radio-button__text">Квартал</span></label><label
                class="radio-button__radio radio-button__radio_side_right" for="uniq16893775684666"><input
                    class="radio-button__control" value="year" autocomplete="off" id="uniq16893775684666" type="radio"
                    name="period"><span class="radio-button__text">Год</span></label></span> -->

        <!--это убрать нужно будет, но просто для сравнения (код ниже взят из плагина фигмы)-->
        <!-- <div
            style="width: 480px; height: 37px; background: white; border-radius: 13px; overflow: hidden; border: 0.50px rgba(61, 61, 61, 0.10) solid; justify-content: flex-start; align-items: flex-start; display: inline-flex">
            <div
                style="width: 80px; height: 37px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: white; border: 0.25px rgba(61, 61, 61, 0.10) solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div style="color: #352958; font-size: 14px; font-family: Panton; font-weight: 400; word-wrap: break-word">
                    Сегодня</div>
            </div>
            <div
                style="width: 80px; height: 37px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: white; border: 0.25px rgba(61, 61, 61, 0.10) solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div style="color: #352958; font-size: 14px; font-family: Panton; font-weight: 400; word-wrap: break-word">
                    Вчера</div>
            </div>
            <div
                style="width: 80px; height: 37px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: white; border: 0.25px rgba(61, 61, 61, 0.10) solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div style="color: #352958; font-size: 14px; font-family: Panton; font-weight: 400; word-wrap: break-word">
                    Неделя</div>
            </div>
            <div
                style="width: 80px; height: 37px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: white; border: 0.25px rgba(61, 61, 61, 0.10) solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div style="color: #352958; font-size: 14px; font-family: Panton; font-weight: 400; word-wrap: break-word">
                    Месяц</div>
            </div>
            <div
                style="width: 80px; height: 37px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: white; border: 0.25px rgba(61, 61, 61, 0.10) solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div style="color: #352958; font-size: 14px; font-family: Panton; font-weight: 400; word-wrap: break-word">
                    Квартал</div>
            </div>
            <div
                style="width: 80px; height: 37px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: white; border: 0.25px rgba(61, 61, 61, 0.10) solid; justify-content: center; align-items: center; gap: 10px; display: flex">
                <div style="color: #352958; font-size: 14px; font-family: Panton; font-weight: 400; word-wrap: break-word">
                    Год</div>
            </div>
        </div> -->
        <!--убрать до сюда-->

        <div class="button-group">
            <TimeButton name="Сегодня"/>
            <TimeButton name="Вчера"/>
            <TimeButton name="Неделя"/>
            <TimeButton name="Месяц"/>
            <TimeButton name="Квартал"/>
            <TimeButton name="Год"/>
        </div>

        
            <Calendar></Calendar>
       
        
        

        

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

.button-group
{
    display: inline-flex;
    border: 0.50px rgba(61, 61, 61, 0.10) solid;
    border-radius: 13px;
    overflow: hidden;
}
</style>
