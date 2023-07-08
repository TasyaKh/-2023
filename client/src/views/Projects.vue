<script setup lang="ts">
import Search from '@/components/Search.vue';
import { onBeforeMount, ref } from 'vue';
import { useGeneralStore } from '@/stores/general';

const generalStore = useGeneralStore();

const projects = ref()
const projectName = ref()

onBeforeMount(async () => {
    const data = await generalStore.getProjects()
    projects.value = data
})

async function handleEventStartSearch(text:string){
   
    const data = await generalStore.getProjects(text)
    projects.value = data
}

function getLogo(siteURL: string) {

    const url = `https://favicon.yandex.net/favicon/${siteURL}?size=16`
    return url
}

</script>

<template >
    {{ projects }}
    <div class="container">

        <div class="row my-3">
            <div class="col">
                <!-- Поисковые строки -->

                <Search :handleEventStartSearch="handleEventStartSearch"/>
            </div>

        </div>

        <!-- projects -->
        <div class="row">
            <div class="projects">
                <table class="table" cellspacing="0">
                    <thead>
                        <tr class="">
                            <th>Проект</th>
                            <th>Запросы</th>
                            <th>Ср. позиция</th>
                            <th>Динамика</th>


                            <th rowspan="2" colspan="2">
                                Топ 10 (Google/Yandex)

                            </th>

                        </tr>


                    </thead>
                    <tbody>
                        <tr v-for="project in projects">
                            <td class="project">
                                <div class="row">
                                    <div class="col-auto d-flex align-items-center"><img :src="getLogo(project.topvisorProject.site)"
                                            alt="site logo">
                                    </div>
                                    <div class="col">
                                        <div class="row">
                                            {{project.yandexProject.name}}

                                        </div>
                                        <div class="row project__site">
                                            <a href="https://{{project.topvisorProject.site}}">
                                              {{ project.topvisorProject.site }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{{ project.topvisorProject.positions_summary.dynamics.all }}</td>
                            <td>{{  project.topvisorProject.positions_summary.avgs[0] }}</td>
                            <td>{{ project.topvisorProject.positions_summary.dynamics.up }}
                                {{ project.topvisorProject.positions_summary.dynamics.stay }}
                                {{ project.topvisorProject.positions_summary.dynamics.down }}
                            </td>



                            <td>{{ project.topvisorProject.positions_summary.tops[0]["1_10"] }}</td>
                           
                            <td>{{ project.topvisorProject.positions_summary.tops[1]["1_10"] }}</td>

                        </tr>

                    </tbody>
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
