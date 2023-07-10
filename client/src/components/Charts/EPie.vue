
<script setup lang="ts">

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { computed } from "vue";

use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);


const props = defineProps<{
  data: {
    value: number;
    name: string;
  }[],
  name: string,
  subtext: string
}>()

// const props = {
//   data: [{
//     value: 1,
//     name: "string"
//   }, {
//     value: 2,
//     name: "string2"
//   }],
//   name: "no name"
// }

// computed 
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
        data: props.data,
        label: {
          show: true,
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