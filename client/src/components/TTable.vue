<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    // data from topvisor
    data: any

}>()

// watch(() => props.data, async (data) => {
//     getDatesWidthRegionIndexesFromSearchers(
//         data.result.headers.dates, data.result.headers.projects[0].searchers
//     )
// })

function getPosition(item: any, date: any) {
    let position = '-'
    let dateExtracted = '-'

    for (let key in item.positionsData) {
        let dataArray = key.split(":")
        dateExtracted = dataArray[0]

        if (dateExtracted == date) {
            position = item.positionsData[key].position
        }
    }

    return position
}

// const datesRegions = ref()
// function getDatesWidthRegionIndexesFromSearchers(dates: any, searchers: any) {

//     let res = []
//     for (let key in searchers) {
//         const index = searchers[key].regions[0].index
//         res.push({ [index]: dates })
//     }

//     datesRegions.value = res
// }
</script>

<template>
    <!-- {{ data.result.headers.projects }} -->
    <!-- data{{ data }} -->
    <table class="table-positions" cellspacing="0">
        <thead>

            <!-- dates -->
            <tr>
                <!-- <th class="">icon</th> -->
                <th class="">Поисковая система</th>

                <th v-for="search in data.result.headers.projects[0].searchers" :colspan="data.result.headers.dates.length">
                    {{ search.name }}
                </th>

            </tr>

            <tr>
                <!-- <th class="">icon</th> -->
                <th class="">Запросы</th>

                <th v-for="date in data.result.headers.dates" >
                    {{ date }}
                </th>
                <!-- <th v-for="search in data.result.headers.projects[0].searchers" :colspan="data.result.headers.dates.length">
                    {{ search.regions[0].index}}
                </th> -->

            </tr>
        </thead>


        <tbody>

            <tr v-for="(item, index) in data.result.keywords" :key="index">
                <td class="queries">
                    {{ item.name }}
                </td>
                <!-- разместить позиции в соответствующих колонках -->
                <td v-for="date in data.result.headers.dates">
                    {{ getPosition(item, date) }}
                    <!-- <p v-for="(positionData, index) in item.positionsData"> {{ positionData.position }}</p> -->
                </td>
                <!-- <td v-for="(positionData, index) in item.positionsData" :key="index">
                    {{ positionData.position }}
                </td> -->

            </tr>

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
    }
}
</style>