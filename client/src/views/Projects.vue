<script setup lang="ts">
import Search from '@/components/Search.vue';
import { onBeforeMount, ref } from 'vue';
import { useGeneralStore } from '@/stores/general';
import FilterButton from '@/components/FilterButton.vue';
import Loading from '@/components/Loading.vue';

import { useRouter } from 'vue-router';

const router = useRouter();


const generalStore = useGeneralStore();

const projects = ref()

const loading = ref(false) //проекты грузятся

// сортирока проектов топвизор
const ordersTopvisor = ref()
const search_string = ref("")

// состояние фильтров
const stateDate = ref(0)
const stateProject = ref(0)

onBeforeMount(async () => {
    await getProjects()
})

// сортировать по имени
async function handleEventChangeStateFilterName(state: number) {
    stateProject.value = state
    stateDate.value = 0
    setOrder(state, "name")
}

// сортировать по дате
async function handleEventChangeStateFilterDate(state: number) {
    stateDate.value = state
    stateProject.value = 0
    setOrder(state, "date")
}

async function setOrder(state: number, name: string) {

    let sortBy = []
    switch (state) {
        case -1:
            sortBy.push({ name: name, direction: "DESC" })
            break
        case 0:
            sortBy = []
            break
        case 1:
            sortBy.push({ name: name, direction: "ASC" })
            break

    }

    ordersTopvisor.value = sortBy
    await getProjects()
}

async function getProjects() {
    setLoading(true)
    const data = await generalStore.getProjects(search_string.value, ordersTopvisor.value)
    projects.value = data
    setLoading(false)
}


// в процессе загрузки
function setLoading(load: boolean) {
    loading.value = load
}


async function handleEventStartSearch(text: string) {

    search_string.value = text
    await getProjects()
}

function getLogo(siteURL: string) {

    const url = `https://favicon.yandex.net/favicon/${siteURL}?size=16`
    return url
}

function isPositionsSummary(project: any) {
    //  && project.topvisorProject.positions_summary.length > 0
    return project.topvisorProject.positions_summary && project.topvisorProject.positions_summary.dynamics
        && project.topvisorProject.positions_summary.avgs
}

function navigateToPageStatistic(yandexProjectId: number, topvisorProjectId: number) {
    router.push({
        name: 'Dashboards', params: {
            yandex_id: yandexProjectId,
            topvisor_id: topvisorProjectId
        }
    });
}

</script>

<template >
    <!-- {{ projects }} -->
    <div class="container">

        <div class="row my-3">
            <div class="col">
                <!-- Поисковые строки -->

                <Search :handleEventStartSearch="handleEventStartSearch" />
            </div>

        </div>

        <!-- projects -->
        <div class="row">
            <div class="projects">
                <table class="table-projects" cellspacing="0">
                    <thead>
                        <tr class="">
                            <th>
                                <div class="row">
                                    <div class="col-auto">Проект</div>
                                    <!-- filter -->
                                    <div class="col">
                                        <FilterButton :handleEventChangeState="handleEventChangeStateFilterName"
                                            :state="stateProject" />

                                    </div>
                                </div>


                            </th>
                            <th>
                                <div class="row">
                                    <div class="col-auto">Дата создания</div>
                                    <!-- filter -->
                                    <div class="col">
                                        <FilterButton :handleEventChangeState="handleEventChangeStateFilterDate"
                                            :state="stateDate" />

                                    </div>
                                </div>
                            </th>
                            <th>Запросы</th>
                            <th>Ср. позиция</th>
                            <th>Динамика</th>


                            <th rowspan="2" colspan="2">
                                Топ 10 (Google/Yandex)

                            </th>

                        </tr>
                    </thead>


                    <tbody v-if="projects">

                        <tr v-for="project in projects" :key="project.topvisorProject.id"
                            @click="navigateToPageStatistic(project.yandexProject.id, project.topvisorProject.id)">

                            <!-- <router-link class=" "
                                :to="`/statistic/${project.yandexProject.id}/${project.topvisorProject.id}`">
 -->

                            <td class="project">

                                <!-- {{ project }} -->
                                <div class="row">
                                    <!-- получить логотип -->
                                    <div class="col-auto d-flex align-items-center">
                                        <img :src="getLogo(project.topvisorProject.site)" alt="site logo">
                                    </div>
                                    <div class="col">
                                        <!-- имя проекта -->
                                        <div class="row">
                                            {{ project.topvisorProject.name }}

                                        </div>
                                        <!-- сайт -->
                                        <div class="row project__site">
                                            <a href="https://{{project.topvisorProject.site}}">
                                                {{ project.topvisorProject.site }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <!-- дата создания -->
                            <td class="date-create">{{ project.topvisorProject.date }}</td>


                            <td v-if="isPositionsSummary(project)">{{
                                project.topvisorProject.positions_summary.dynamics.all
                            }}</td>
                            <td v-else> - </td>

                            <td v-if="isPositionsSummary(project)">{{ project.topvisorProject.positions_summary.avgs[0]
                            }}
                            </td>
                            <td v-else> - </td>

                            <!-- динамика -->
                            <td>
                                <!-- рост -->
                                <div class="row">

                                    <div class="col d-flex justify-content-center">
                                        <div class="row ">

                                            <div class="col-6 d-flex align-items-center">
                                                <p class="m-auto" v-if="isPositionsSummary(project)"> {{
                                                    project.topvisorProject.positions_summary.dynamics.up }}</p>
                                                <p class="m-auto" v-else>-</p>
                                            </div>

                                            <div class="col-6 d-flex justify-content-center">
                                                <img src="@/assets/images/стрелка вверх длинная.svg" alt="">
                                            </div>

                                        </div>
                                    </div>

                                    <!-- всего -->
                                    <div class="col d-flex justify-content-center">
                                        <div class="row ">

                                            <div class="col-6 d-flex align-items-center">
                                                <p class="m-auto" v-if="isPositionsSummary(project)"> {{
                                                    project.topvisorProject.positions_summary.dynamics.stay }}</p>
                                                <p class="m-auto" v-else>-</p>
                                            </div>

                                            <div class="col-6 d-flex justify-content-center">
                                                <img src="@/assets/images/иконка равно.svg" alt="">
                                            </div>
                                        </div>
                                    </div>


                                    <!-- падение -->
                                    <div class="col d-flex justify-content-center">
                                        <div class="row ">
                                            <div class="col-6 d-flex align-items-center">
                                                <p class="m-auto" v-if="isPositionsSummary(project)"> {{
                                                    project.topvisorProject.positions_summary.dynamics.down }}</p>
                                                <p class="m-auto" v-else>-</p>
                                            </div>

                                            <div class="col-6 d-flex justify-content-center">
                                                <img src="@/assets/images/стрелка вниз длинная.svg" alt="">
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </td>



                            <!-- топ 10 гугл -->
                            <td v-if="isPositionsSummary(project)">{{
                                project.topvisorProject.positions_summary.tops[0]["1_10"] }}</td>
                            <td v-else> - </td>
                            <!-- топ 10 яндекс -->
                            <td v-if="isPositionsSummary(project)">{{
                                project.topvisorProject.positions_summary.tops[1]["1_10"] }}</td>
                            <td v-else> - </td>

                        </tr>

                    </tbody>
                    <div v-else>
                        <Loading />
                    </div>



                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    .project {
        text-align: start;

        &__site {
            font-weight: normal;
        }
    }

    .date-create {
        font-weight: normal;
        text-align: start;
    }

    .table-projects {
        font-family: "Panton";
        width: 100%;
        border-collapse: separate;
        border-radius: 10px 10px 0px 0px;
        overflow: hidden;

        tbody {
            text-align: center;
            background-color: var(--tc-c-white);
            cursor: pointer;

            td {
                font-weight: bold;
                padding: 10px;
                border-bottom: 2px solid #3D3D3D1A;
            }

            tr:hover {
                background-color: #EDEBFC;
                transition: 0.3s;
            }
        }

        thead {
            background-color: #E5E8FF;

            th {
                padding: 20px;
                // border-bottom: 2px solid #E4DFF0;
            }

        }


    }
}
</style>
