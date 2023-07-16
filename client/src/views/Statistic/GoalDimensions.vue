<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import { useYandexStore } from '@/stores/yandex-dashboards';

// graphics
import EStackedAreaGoals from '@/components/Charts/EStackedAreaGoals.vue';

import { useRoute } from 'vue-router';
import NavbarStatistic from '@/components/NavbarStatistic.vue';

const route = useRoute()

// fetch ids from route
const yandexId = Number(route.params.yandex_id);
const topvisorId = Number(route.params.topvisor_id);

//8_6400_000 - one day, 
const date1 = ref(new Date(new Date().getTime() - 8_6400_000 * 30))
// today
const date2 = ref(new Date())


const yandexlStore = useYandexStore();

// data for graphics ---------------------------------------------------------------

const goalDimensions = ref()
const visits = ref()

onBeforeMount(async () => {
    await fetchGraphics()
})

async function fetchGraphics() {
    // конверсии
    goalDimensions.value = await yandexlStore
        .goalDmension(yandexId, date1.value, date2.value)

    // визиты
    visits.value = await yandexlStore
        .visits(yandexId, date1.value, date2.value)
}

</script>

<template>
    <NavbarStatistic :yandex-id="yandexId" :topvisor-id="topvisorId" />


    <div class="container">
        {{ date1.toLocaleString() }} - {{ date2.toLocaleString() }}
        <!-- {{ preparedData.deviceCategory }} -->
        <div class="chart-container">
            <!-- statistic -->


            <div class="row">
                <!-- 6 устройства -->
                <div class="col-12" v-if="visits && visits.data" v-for="dashboard in goalDimensions.data">

                    <div class="block-content-full">

                        <!-- {{ dashboard }} -->
                        <div class="row d-flex justify-content-center text-center">
                            <EStackedAreaGoals :title="dashboard.name" :data="dashboard"
                                :headers="['Достижения цели', 'Конверсии']" :date1="date1" :date2="date2"
                                :visits="visits.data" />
                            <!-- <Loading v-else /> -->

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
    width: fit-content;
    background: white;
}


.block-content-full {
    width: auto;

}

.container {
    margin-top: 5rem;
}
</style>


