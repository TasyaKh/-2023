<script setup lang="ts">

// ГРАФИК С НЕСКОЛЬКИМИ ЛИНИЯМИ ДЛЯ ЯНДЕКС

import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import * as echarts from 'echarts';

import {
    TooltipComponent,
    ToolboxComponent
} from "echarts/components";
import { onMounted, ref, watch } from "vue";

use([
    ToolboxComponent,
    LineChart,
    TooltipComponent,
]);

const dateX = ref()     //данные по оси икс
const dataLegend = ref()//данные для легенды
const series = ref()    //сами данные для отображения


watch(() => props.data, async () => {
    await initData()
    renderChart()
})

onMounted(async () => {
    await initData()
    renderChart()
})

const props = defineProps<{
    data: any,
    title: string,
    // headers: string
}>()

// инициализировать даные
async function initData() {
    const salfdy = await getSeriesAndLegend(props.data)
    dataLegend.value = salfdy.dataLegend
    series.value = salfdy.series

    // данные по оси икс
    dateX.value = await getXFromTimeIntervals(props.data[0].metrics)
}

// получить даные и легенду
async function getSeriesAndLegend(data: any) {
    let series = []
    let legend = []

    for (let i = 0; i < data.length; i++) {

        // проходимся по данным
        let metrics = []
        for (let io = 0; io < data[i].metrics.length; io++) {
            metrics.push(data[i].metrics[io].metric)
        }

        // series
        series.push(
            {
                name: data[i].name,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: metrics
            },
        )

        // legend
        legend.push(data[i].name)
    }

    return { series: series, dataLegend: legend }
}

// получить ось икс
async function getXFromTimeIntervals(metrics: any) {
    let dateX = []
    for (let i = 0; i < metrics.length; i++) {
        let date = new Date(metrics[i].date).toLocaleDateString()
        dateX.push(date)
    }

    return dateX
}

// контейнер для графика
const chartContainer = ref()


// отрисовтаь график
function renderChart() {
    const chart = echarts.init(chartContainer.value);

    // настройки для графика 
    const options = {
        title: {
            text: props.title
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
            bottom: 0
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
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
    };

    chart.setOption(options)
}





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
    <!-- <div class="charts-wrapper"> -->

    <div ref="chartContainer" class="chart "></div>
    <!-- </div> -->
</template>

<style scoped>
/* .charts-wrapper {
    width: 100%;
    min-width: 400px;
    min-height: 400px;
} */

.chart {
    min-width: 400px;
    min-height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>