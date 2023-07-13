<script setup lang="ts">
import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { onBeforeMount, ref } from 'vue';

// const selectedItem = ref(1)
const selectedProject = ref(1)

const topvisorStore = useTopvisorStore()

const props = defineProps<{
    yandexId: number,
    topvisorId: number,
    // date1: Date,
    // date2: Date,
    // handleEventSelectedItem: Function
}>()

onBeforeMount(async () => {
   await getProject()
})

const projectTopvisor = ref()
const projects = ref()

async function getProject() {
    projectTopvisor.value = await topvisorStore.getProjects(props.topvisorId)
    projects.value = [{yandexProject:null, topvisorProject:projectTopvisor.value}]
    selectedProject.value = projectTopvisor.value.result[0].id
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
                    <select class="form-select" aria-label="project" v-model="selectedProject">
                        <option v-for="project in projects" :value="project.topvisorProject.result[0].id" :selected="selectedProject == project.topvisorProject.result[0].id">
                            {{project.topvisorProject.result[0].name  }}
                        </option>
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
                                <a class="nav-link active" aria-current="page" href="#">Конверсии</a>
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