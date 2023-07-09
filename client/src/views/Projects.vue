<script setup lang="ts">
import Search from '@/components/Search.vue';
import { onBeforeMount, ref } from 'vue';
import { useGeneralStore } from '@/stores/general';
import FilterButton from '@/components/FilterButton.vue';

const generalStore = useGeneralStore();

const projects = ref()

const loading = ref(false) //проекты грузятся

// сортирока проектов топвизор
const ordersTopvisor = ref()
const search_string = ref("")

onBeforeMount(async () => {
    await getProjects()
})

// сортировать по имени
async function handleEventChangeStateFilterName(state: number) {
    let sortBy = []

    switch (state) {
        case -1:
            sortBy.push({ name: "name", direction: "DESC" })
            break
        case 0:
            sortBy = []
            break
        case 1:
            sortBy.push({ name: "name", direction: "ASC" })
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
    return project.topvisorProject.positions_summary && project.topvisorProject.positions_summary.length > 0
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
                <table class="table" cellspacing="0">
                    <thead>
                        <tr class="">
                            <th>
                                <div class="row">
                                    <div class="col-auto">Проект</div>
                                    <!-- filter -->
                                    <div class="col">
                                        <FilterButton :handleEventChangeState="handleEventChangeStateFilterName" />

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
                    <tbody v-if="!loading">
                        <tr v-for="project in projects">
                            <td class="project">
                                <div class="row">
                                    <!-- получить логотип -->
                                    <div class="col-auto d-flex align-items-center"><img
                                            :src="getLogo(project.topvisorProject.site)" alt="site logo">
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
                            <td v-if="isPositionsSummary(project)">{{ project.topvisorProject.positions_summary.dynamics.all
                            }}</td>
                            <td v-else> - </td>

                            <td v-if="isPositionsSummary(project)">{{ project.topvisorProject.positions_summary.avgs[0] }}
                            </td>
                            <td v-else> - </td>

                            <td v-if="isPositionsSummary(project)">{{ project.topvisorProject.positions_summary.dynamics.up
                            }}
                                {{ project.topvisorProject.positions_summary.dynamics.stay }}
                                {{ project.topvisorProject.positions_summary.dynamics.down }}
                            </td>
                            <td v-else> - </td>


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
                    <div v-else>Загрузка ...</div>

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

    table {
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
                border-bottom: 2px solid #E4DFF0;
            }

            tr:hover {
                background-color: #F0F1FF;
                transition: 0.3s;
            }
        }

        thead {
            background-color: #F0F1FF;

            th {

                padding: 20px;
                border-bottom: 2px solid #E4DFF0;

            }

        }


    }
}
</style>
