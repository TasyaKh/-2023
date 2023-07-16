
<script setup lang="ts">

// ГРАФИК С НЕСКОЛЬКИМИ ЛИНИЯМИ ДЛЯ ЯНДЕКС ЦЕЛЕЙ

import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import * as echarts from 'echarts';

import {
    TooltipComponent,
    ToolboxComponent
} from "echarts/components";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";

use([
    ToolboxComponent,
    LineChart,
    TooltipComponent,
]);

const dateX = ref()     //данные по оси икс
const dataLegend = ref()//легенда
const series = ref()    ///данные 

const goalsVisitsSum = ref()//визиты

watch(() => props.visits, async () => {
    await initData()
    renderChart()
})

onMounted(async () => {
    await initData()
    renderChart()
})

const props = defineProps<{
    data: any,          //данные
    title: string,      //имя графика
    headers: string[],  //заголовки для линий данных на графике
    date1: Date,        //дата старт
    date2: Date,        //дата окончания
    visits: any         //визиты (нужны для конверсий)
}>()

// инит данные
async function initData() {
    const salfdy = await getSeriesAndLegend(props.data)
    dataLegend.value = salfdy.dataLegend
    series.value = salfdy.series

    dateX.value = getXFromTimeIntervals(props.date1, props.date2)
}

// получить легенду и данные
async function getSeriesAndLegend(data: any) {
    let series = []
    let legend = []


    let metrics1 = []
    let metrics2 = []

    let goalsVisitsSm = 0

    for (let io = 0; io < data.metrics.length; io++) {

        const goalVisit = props.data.metrics[io].metric
        goalsVisitsSm += goalVisit

        let conversion = "-"

        if (props.visits[0].metrics[io] && props.visits[0].metrics[io].metric) {
            const visit = props.visits[0].metrics[io].metric

            conversion = (goalVisit / visit * 100).toFixed(2)

        }

        // console.log('conversion')
        // console.log(conversion)
        metrics1.push(goalVisit)
        metrics2.push(conversion)
    }

    // сумма целевых визитов
    goalsVisitsSum.value = goalsVisitsSm

    // // series
    series.push(
        {
            name: props.headers[0],
            type: 'line',
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            },
            data: metrics1
        },
    )

    // series
    series.push(
        {
            name: props.headers[1],
            type: 'line',
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            },
            data: metrics2
        },
    )
    // legend
    legend.push(props.headers)


    return { series: series, dataLegend: legend }
}

// получить ось икс из интервалов
function getXFromTimeIntervals(startDate: Date, endDate: Date) {
    const dateRange = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateRange.push((new Date(currentDate)).toISOString().substring(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
}


const chartContainer = ref()


function renderChart() {
    const chart = echarts.init(chartContainer.value);

    // computed 
    const options = {
        title: {
            text: props.title
        },
        tooltip: {
            trigger: 'axis',
        },
        // Add the sum as a label
        graphic: [{
            type: 'text',
            left: 'right',
            top: 40,
            style: {
                text: `Целевые визиты: ${goalsVisitsSum.value}`,
                textAlign: 'center',
                fill: '#000',
                fontSize: 14,
            },
        }],

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
    <!-- {{ data }} -->

    <div ref="chartContainer" class="chart "></div>
</template>

<style scoped>
.chart {
    min-width: 400px;
    min-height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>