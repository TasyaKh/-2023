<script setup lang="ts">
const props = defineProps<{
    // data from topvisor
    data: any

}>()


</script>

<template>
    <!-- {{ data.result.headers.projects }} -->
    <!-- data{{ data }} -->
    <table class="table-positions" cellspacing="0">
        <thead>
            <!-- <tr class="">
                <th colspan="2">
                    Поискова система
                </th>
                <th v-for="searcher in data.result.headers.projects[0].searchers" colspan="2" class="text-center">
                    {{ searcher.name }}
                </th>

            </tr> -->
            <!-- <tr class="">
                <th colspan="2">
                    Регион
                </th>
                <th colspan="2">
                    Иркутск
                </th>
                <th colspan="2">
                    Иркутск
                </th>


            </tr> -->

            <!-- dates -->
            <tr>
                <!-- <th class="">icon</th> -->
                <th class="">Запросы</th>

                <th v-for="date in data.result.headers.dates">
                    {{ date }}</th>

            </tr>
        </thead>


        <tbody>

            <tr v-for="(item, index) in data.result.keywords" :key="index">
                <td class="queries">
                    {{ item.name }}
                </td>
                <td v-for="(positionData, index) in item.positionsData" :key="index">
                    {{ positionData.position }}
                </td>

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

        .queries{
            text-align: start;
        }
    }
}
</style>