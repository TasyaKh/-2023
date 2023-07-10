
<script setup lang="ts">

import { use } from "echarts/core";
import { LineChart } from "echarts/charts";

import {
    TooltipComponent,
    ToolboxComponent
} from "echarts/components";
import { computed, onBeforeMount, ref, watch } from "vue";

use([
    ToolboxComponent,
    LineChart,
    TooltipComponent,
]);

const dateX = ref()
const dataLegend = ref()
const series = ref()

onBeforeMount(async () => {
    await initData()
})

watch(() => props.data, async () => {
    await initData()
})


async function initData() {
    const salfdy = await getSeriesAndLegendFromDataYandex(props.data)
    dataLegend.value = salfdy.dataLegend
    series.value = salfdy.series

    dateX.value = await getXFromTimeIntervals(props.time_intervals)
}


async function getSeriesAndLegendFromDataYandex(data: any) {
    let series = []
    let legend = []

    for (let i = 0; i < data.length; i++) {
        // series
        series.push(
            {
                name: data[i].dimensions[0].name,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: data[i].metrics[0]
            },
        )

        // legend
        legend.push(data[i].dimensions[0].name)
    }

    return { series: series, dataLegend: legend }
}

// 
async function getXFromTimeIntervals(time_intervals: any) {
    let dateX = []
    for (let i = 0; i < time_intervals.length; i++) {
        dateX.push(time_intervals[i][0])
    }

    return dateX
}



const props = defineProps<{
    data: any,
    // ex [[ "2023-07-03","2023-07-03"],]
    time_intervals: any,
    title: string
}>()

// const props = {
//     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
//     dataX: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

// }

// computed 
const options = computed(() => {
    return {
        title: {
            text: props.title,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: dataLegend.value,
            bottom:0
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '20%',
            top: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: dateX.value
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: series.value

    }
})


</script>

<template>
    <!-- per
    {{ props.time_intervals }}
    ------------
    dateX
    {{ dateX }}
    dataLegend
    ---
    {{ dataLegend }}
    ---
    {{ series }} -->
    <div class="charts-wrapper">
        <v-chart class="chart " :option="options" />
    </div>
</template>

<style scoped>
.charts-wrapper {
    width: 100%;
    min-width: 400px;
    min-height: 400px;
}

.chart {

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>