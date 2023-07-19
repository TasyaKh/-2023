<script setup lang="ts">

import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { useGeneralStore } from '@/stores/general';
import { useRouter, useRoute } from 'vue-router';

import { onBeforeMount, ref, watch } from 'vue';

const router = useRouter()
const route = useRoute()

const selectedProject = ref(0)          //выбранный проект

const topvisorStore = useTopvisorStore()
const generalStore = useGeneralStore()


const loading = ref(false)  //загрузка

const props = defineProps<{
    yandexId: number,//яндекс ид
    topvisorId: number,//топвизор ид
}>()

const projectTopvisor = ref()//проект топвизора
const projects = ref()//проект

onBeforeMount(async () => {
    await getProject()
    selectedProject.value = projectTopvisor.value.id

})


// получить текущий проект, нам нужно его имя
async function getProject() {
    const p = await topvisorStore.getProjects(props.topvisorId)

    projectTopvisor.value = p[0]
    projects.value = [{ yandexProject: null, topvisorProject: projectTopvisor.value }]
}

// получить список проектов
async function fetchProjects() {
    loading.value = true
    const p = await generalStore.getProjects()
    projects.value = p
    loading.value = false

}

// изменить проект
function changeProject() {

    let findedTPr = null

    // find project
    for (let i in projects.value) {
        let pr = projects.value[i]
        if (selectedProject.value == pr.topvisorProject.id)
            findedTPr = pr
    }
    // const tId = projects.value[selectedProject.value].topvisorProject.id
    // const yId = projects.value[selectedProject.value].yandexProject.id


    // обновить страницу
    router.push({
        // path: `/dashboards/${yId}/${tId}`
        name: router.currentRoute.value.name ?? "Dashboards",
        params: {
            yandex_id: findedTPr.yandexProject.id,
            topvisor_id: findedTPr.topvisorProject.id
        }
    });
}

watch(() => route.params, async () => {
    window.location.reload()
})


</script>

<template>
    <nav class="navbar bg-white fixed-top p-2">

        <div class="container-fluid">
            <div class="row align-items-center">

                <!-- menu button -->
                <div class="col-auto">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <img src="./icons/menu.svg" alt="">
                    </button>
                </div>



                <!-- search projects -->
                <div class="col-auto mx-1">
                    <select class="form-select" aria-label="project" v-model="selectedProject" @click="fetchProjects()"
                        @change="changeProject()">
                        <option v-for="project, i in projects" :value="project.topvisorProject.id"
                            :selected="selectedProject == project.topvisorProject.id" :class="[{'selected':selectedProject == project.topvisorProject.id}]">
                            {{ i + 1 }}. {{ project.topvisorProject.name }}
                        </option>
                    </select>
                </div>

                <div class="col mx-1" v-if="projectTopvisor && projectTopvisor.site">
                    <a :href="`https://${projectTopvisor.site}`"> {{ projectTopvisor.site }}</a>
                   
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
                                <a class="nav-link active" aria-current="page"
                                    :href="`/goal-dimensions/${yandexId}/${topvisorId}`">Конверсии</a>
                            </div>

                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>
  


<style scoped lang="scss">
// option

option {
    &:hover {
        background: rgba(237, 238, 240, 0.4);
        transition: 0.3s;
    }

    &.selected{
        background-color: rgba(80, 68, 114, 1);
        color: white;
    }
}

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
    background: #ECECF8;


}

button.navbar-toggler {
    border: none;
    margin-left: 50px;
    padding: 10px;

    &:active,
    &:focus {
        border: none;
        box-shadow: none;
    }

    &:hover {
        background-color: #F0F1FF;
        transition: 0.3s;
    }
}

.form-select {
    cursor: pointer;
}
</style>