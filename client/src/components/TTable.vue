<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
    // data from topvisor
    sitePositionsData: any

}>()

const amountOfColumns = ref()    //число колонок
const dates = ref()              //даты
const searchers = ref()           //проекты
const keywords = ref()           //ключевые слова
const project = ref()           //ключевые слова

onBeforeMount(() => {
    initData()
})

watch(() => props.sitePositionsData, () => {
    initData()
})

// инициализировать данные
function initData() {
    dates.value = props.sitePositionsData.header[0].dates
    amountOfColumns.value = dates.value.length + 1
    searchers.value = props.sitePositionsData.header[0].searchers
    keywords.value = props.sitePositionsData.keyword;
    project.value = props.sitePositionsData.project

}

// получить данные
function getPosition(date: any, project_id: any, searcherRegion_index: any, positions_data: any) {

    let qualifiers: string = `${date}:${project_id}:${searcherRegion_index}`;
    let p = "?"
    for (let i in positions_data) {
        const dpr: string = positions_data[i].dpr
        // const dprArr = dpr.split(":")
        if (dpr == qualifiers) {
            p = positions_data[i].position
        }
    }

    return p
}

</script>

<template>
    <table class="table-positions  p-0 m-0" cellspacing="0">
        <thead>
            <tr>
                <th class="">Ключевое слово</th>

                <th v-for="date in dates">
                    {{ date }}
                </th>

            </tr>
        </thead>


        <tbody>
            <!-- projects{{ sitePositionsData }} -->
            <!-- регионы поисковика -->
            <!-- <template v-for="(project, index) in projects" :key="index"> -->
            <template v-for="(searcher, index) in searchers" :key="index">

                <template v-for="(searcherRegion, index) in searcher.region" :key="index">
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
                                <td> {{ getPosition(date, project.id, searcherRegion.index, keyword.positions_data) }}</td>
                            </template>
                        </tr>
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

        .project {
            background-color: #eaecff;
        }
    }
}
</style>