<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useYandexStore } from '@/stores/yandex-dashboards';
import { useTopvisorStore } from '@/stores/topvisor-dashboards';

import { useChartConverterStore } from '@/stores/chart_converter';

// graphics
import EPie from '@/components/Charts/EPie.vue';
import EStackedArea from '@/components/Charts/EStackedArea.vue';

const props = defineProps<{
    yandexId: number,
    topvisorId: number,
    date1: Date,
    date2: Date
}>()

const yandexlStore = useYandexStore();
const topvisorStore = useTopvisorStore();

const chartConverterStore = useChartConverterStore();

// const dataDeviceCategory = ref()
// const graphics = ref(
//     [deviceCategory = null]
// )

// data ---------------------------------------------------------------

const searchEngineData = ref()
const preparedData = ref(
    chartConverterStore.charts()
)

onBeforeMount(async () => {
    await fetchGraphics()
})

async function fetchGraphics() {

    // 6) device category
    let dataDeviceCategory = await yandexlStore
        .getDeviceCategory(props.yandexId, props.date1, props.date2)

    // convert to pie chart
    if (dataDeviceCategory) {
        preparedData.value.deviceCategory.data = chartConverterStore
            .yandexDataToPie(dataDeviceCategory.data)
    }

    // 4) посещаемость из поисковых систем

    searchEngineData.value = await yandexlStore
        .visitsFromSearchSystems(props.yandexId, props.date1, props.date2)

}

</script>

<template>
    <!-- {{ preparedData.deviceCategory }} -->
    <div class="chart-container">
        <!-- statistic -->

        <div class="row">
            <!-- 6 устройства -->
            <div class="col">

                <div class="block-content">

                    <div class="row d-flex justify-content-center text-center">

                        <EPie :subtext="preparedData.deviceCategory.subname" :name="preparedData.deviceCategory.name"
                            :data="preparedData.deviceCategory.data" />

                    </div>
                </div>
            </div>

            <!-- 4 визиты -->
            <div class="col-12">

                <div class="block-content-full">

                    <div class="row d-flex justify-content-center text-center">

                        <EStackedArea v-if="searchEngineData && searchEngineData.data" :title="'Поисковые системы'" :data="searchEngineData.data"
                            :time_intervals="searchEngineData.time_intervals" />

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
.block-content, .block-content-full {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 20px;
    padding: 20px;
    margin: 30px auto 30px auto;
    width: fit-content;
    background: white;

}

.block-content-full{
    width: auto;

}
</style>


