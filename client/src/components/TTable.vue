<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
    // data from topvisor
    data: any

}>()

const amountOfColumns = ref()
const dates = ref()
const projects = ref()
const keywords = ref()

onBeforeMount(() => {
    initData()
})

function initData() {
    dates.value = props.data.result.headers.dates
    amountOfColumns.value = dates.value.length + 1
    projects.value = props.data.result.headers.projects
    keywords.value = props.data.result.keywords;

}
function getPosition(date: any, project_id: any, searcherRegion_index: any, keyword: any) {

    let qualifiers = `${date}:${project_id}:${searcherRegion_index}`;

    let p = keyword.positionsData[qualifiers].position

    return p
}

</script>

<template>
    <!-- {{ data.result.headers.projects }} -->
    <!-- data{{ data }} -->
    <table class="table-positions  p-0 m-0" cellspacing="0">
        <thead>

            <!-- dates -->
            <tr>
                <!-- <th class="">icon</th> -->
                <th class="">Ключевое слово</th>

                <th v-for="date in dates">
                    {{ date }}
                </th>

            </tr>
        </thead>


        <tbody>

            <!-- регионы поисковика -->
            <template v-for="(project, index) in projects" :key="index">
                <template v-for="(searcher, index) in project.searchers" :key="index">

                    <template v-for="(searcherRegion, index) in searcher.regions" :key="index">
                        <tr>
                            <td :colspan="amountOfColumns" class="project">
                                Проект {{ project.name }}, {{ searcherRegion.name }}, {{ searcher.name }} {{
                                    searcherRegion.lang }},
                                {{ searcherRegion.device_name }}";
                            </td>

                        </tr>

                        <!--ключевые фразы проекта-->
                        <template v-for="(keyword, index) in keywords" :key="index">
                            <tr>
                                <td class="text-start">{{ keyword.name }}</td>
                                <!--  найденные даты проверок позиций-->
                                <template v-for="(date, index) in dates" :key="index">
                                    <td> {{ getPosition(date, project.id, searcherRegion.index, keyword) }}</td>
                                </template>
                            </tr>
                        </template>


                    </template>
                </template>

            </template>




        </tbody>

    </table>
</template>

<style scoped lang="scss">
.table-positions {
    font-family: "Panton";
    width: 100%;
    border-collapse: separate;
    border-radius: 10px 10px 0px 0px;
    border: 2px solid #3D3D3D1A;
    overflow: hidden;


    thead {
        background-color: #E5E8FF !important;

        th {
            border: 1px solid #3D3D3D1A;
            padding: 15px;
        }

    }

    tbody {
        text-align: center;

        td {
            padding: 10px;
            // border: 0px 10px 10px 0px solid #3D3D3D1A;
            border: 1px solid #3D3D3D1A;

        }

        .queries {
            text-align: start;
        }

        .project{
            background-color: #eaecff;
        }
    }
}
</style>