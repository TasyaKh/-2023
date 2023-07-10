<script setup lang="ts">

import { useTopvisorStore } from '@/stores/topvisor-dashboards';
import { useYandexStore } from '@/stores/yandex-dashboards';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import Dashboards from './Dashboards.vue';

const route = useRoute()


const yandexlStore = useYandexStore();
const topvisorStore = useTopvisorStore();



// fetch ids from route
const yandexId = Number(route.params.yandex_id);
const topvisorId = Number(route.params.topvisor_id);

// filters-----------------------------------------------------------------  
//8_6400_000 - one day, 
const date1 = ref(new Date(new Date().getTime() - 8_6400_000 * 30))
// today
const date2 = ref(new Date())


</script>

<template>
 
  <div class="container">
    <div class="statistic">
    
      <!-- графики -->
      <div class="charts">
        <Dashboards :yandex-id="yandexId" :topvisor-id="topvisorId"
         :date1="date1" :date2="date2"/>
      </div>

    </div>
  </div>
</template>

<style scoped></style>





