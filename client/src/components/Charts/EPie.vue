<script setup lang="ts">

// КРУГОВАЯ ДИАГРАММА ДЛЯ ЯНДЕКС

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { computed, onBeforeMount, ref, watch } from "vue";

use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

watch(() => props.data, async () => {
  // конвертировать данные из бд в график
  dt.value = await dataToPie(props.data)
})

const props = defineProps<{
  data: any,//данные
  name: string,//имя графика
  subtext: string//подимя
}>()

// данные для вывода в график
const dt = ref([{
  value: -1,
  name: "string"
}])

onBeforeMount(async () => {
  dt.value = await dataToPie(props.data)
})

// конвертировать данные в график
async function dataToPie(dt: any) {
  let d = []

  for (let i = 0; i < dt.length; i++) {

    d.push({
      value: dt[i].sum,
      name: dt[i].y_data_name,
    })
  }

  return d
}

// опции для графика 
const options = computed(() => {
  return {
    title: {
      text: props.name,
      subtext: props.subtext,
      left: 'left'
    },

    textStyle: {
      fontFamily: 'Panton', // Set the desired font family
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: dt.value,
        label: {
          show: true,
          // @ts-ignore
          formatter(param) {
            // correct the percentage
            return param.percent + '%';
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})


</script>

<template>
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