<!-- <template>
    <VDatePicker v-model.range="range" mode="dateTime" />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const range = ref({
    start: new Date(2020, 0, 6),
    end: new Date(2020, 0, 10),
  });
  </script> -->
  <template>
    <Calendar />
    <DatePicker v-model="date" />
  </template>
  
  <script>
  import { Calendar, DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';
  
  const range = ref({
    start: new Date(2020, 0, 6),
    end: new Date(2020, 0, 10),
  });
  </script>
  