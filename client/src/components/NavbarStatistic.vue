<script setup lang="ts">
import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { useGeneralStore } from '@/stores/general';
import Loading from '@/components/Loading.vue';
import { useRouter } from 'vue-router';

import { onBeforeMount, ref } from 'vue';

const router = useRouter()

const selectedProject = ref(0)

const topvisorStore = useTopvisorStore()
const generalStore = useGeneralStore()


const loading = ref(false)

const props = defineProps<{
    yandexId: number,
    topvisorId: number,
    // date1: Date,
    // date2: Date,
    // handleEventSelectedItem: Function
}>()

const projectTopvisor = ref()
const projects = ref()

onBeforeMount(async () => {
    await getProject()
})



async function getProject() {
    const p = await topvisorStore.getProjects(props.topvisorId)

    projectTopvisor.value = p[0]

    projects.value = [{ yandexProject: null, topvisorProject: projectTopvisor.value }]
    selectedProject.value = projectTopvisor.value.id
}

async function fetchProjects() {
    loading.value = true
    const p = await generalStore.getProjects()
    projects.value = p
    loading.value = false


}

function changeProject() {
    const tId = projects.value[selectedProject.value].topvisorProject.id
    const yId = projects.value[selectedProject.value].yandexProject.id

    router.push({
        name: router.currentRoute.value.name ?? "Dashboards",
        params: {
            yandex_id: tId,
            topvisor_id: yId
        }
    });
}

</script>

<template>
    <nav class="navbar bg-white fixed-top">
        <div class="container-fluid">
            <div class="row">

                <!-- menu button -->
                <div class="col-auto">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>



                <!-- search projects -->
                <div class="col">
                    <select class="form-select" aria-label="project" v-model="selectedProject" @click="fetchProjects()"
                        @change="changeProject()">
                        <option v-for="project, i in projects" :value="i" :selected="selectedProject == i">
                            #{{ i + 1 }} {{ project.topvisorProject.name }}
                        </option>
                        <!-- <option v-if="loading">
                            <Loading />
                        </option> -->
                    </select>
                </div>

              
            </div>


            <!-- выезжающее меню -->
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">

                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <!-- Позиции сайта -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/bar_chart_4_bars.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page"
                                    :href="`/site-positions/${yandexId}/${topvisorId}`">Позиции сайта</a>
                            </div>
                          
                        </li>
                        <!-- Сводка -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/speed.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page"
                                    :href="`/dashboards/${yandexId}/${topvisorId}`">Сводка</a>
                            </div>

                        </li>
                        <!-- Карта кликов -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/map.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page" href="#">Карта кликов</a>
                            </div>

                        </li>
                        <!-- Конверсии -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/percent.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page"   :href="`/goal-dimensions/${yandexId}/${topvisorId}`">Конверсии</a>
                            </div>

                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>
  


<style scoped lang="scss">
.navbar {
    font-family: "Panton";

    .nav-item {
        margin: 10px 0;

        &:hover {
            font-weight: bolder;

        }
    }
}

.offcanvas {
    max-width: 230px;
}
</style>