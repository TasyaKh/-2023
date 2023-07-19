
<script setup lang="ts">
import { ref } from 'vue';
import CalendarButton from './CalendarButton.vue';
import TimeButton from './TimeButton.vue';

// передать перехват изменения времени выше
const props = defineProps<{
    handleTimeChanged: Function,
    date1: Date,
    date2: Date
}>()

const d1 = ref(props.date1)
const d2 = ref(props.date2)

// если время было изменено
function timeChanged(date1: Date, date2: Date) {
    d1.value = date1
    d2.value = date2
  
    props.handleTimeChanged(date1, date2)
}


</script>
<template>
    <div class="row p-2">
        <!-- ЗДЕСЬ ПРОИСХОДИТ МАГИЯ go to -> Google -->
        <!-- кнопки времени -->
        <div class="col-auto p-0">
            <TimeButton class="btn-start" name="Сегодня"
                @click="timeChanged(new Date(new Date().setHours(0, 0, 0, 0)), new Date())" />
        </div>
        <div class="col-auto p-0">
            <TimeButton name="Вчера"
                @click="timeChanged(new Date(new Date().setHours(0, 0, 0, 0) - 8_6400_000 * 1), new Date(new Date().setHours(0, 0, 0, 0) - 1))" />
        </div>
        <div class="col-auto p-0">
            <TimeButton name="Неделя" @click="timeChanged(new Date(new Date().getTime() - 8_6400_000 * 7), new Date())" />
        </div>
        <div class="col-auto p-0">
            <TimeButton class="btn-end" name="Месяц"
                @click="timeChanged(new Date(new Date().getTime() - 8_6400_000 * 30), new Date())" />
        </div>
        <div class="col-auto p-0 px-lg-2">
            <CalendarButton :handleDateChanged="timeChanged" :start="d1" :end="d2" />
        </div>



    </div>
</template>

<style scoped lang="scss">
.btn-start {
    border-radius: 10px 0 0 10px;
}

.btn-end {
    border-radius: 0px 10px 10px 0px;
}
</style>