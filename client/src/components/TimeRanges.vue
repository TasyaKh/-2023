
<script setup lang="ts">
import TimeButton from './TimeButton.vue';

// передать перехват изменения времени выше
const props = defineProps<{ handleTimeChanged: Function }>()

// если время было изменено
function timeChanged(date1: Date, date2: Date) {
    props.handleTimeChanged(date1, date2)
}

</script>
<template>
    <div class="button-group">
        <!-- ЗДЕСЬ ПРОИСХОДИТ МАГИЯ go to -> Google -->
        <!-- кнопки времени -->
        <TimeButton class="btn-start" name="Сегодня"
            @click="timeChanged(new Date(new Date().setHours(0, 0, 0, 0)), new Date())" />
        <TimeButton name="Вчера"
            @click="timeChanged(new Date(new Date().setHours(0, 0, 0, 0) - 8_6400_000 * 1), new Date(new Date().setHours(0, 0, 0, 0) - 1))" />
        <TimeButton name="Неделя" @click="timeChanged(new Date(new Date().getTime() - 8_6400_000 * 7), new Date())" />
        <TimeButton class="btn-end" name="Месяц"
            @click="timeChanged(new Date(new Date().getTime() - 8_6400_000 * 30), new Date())" />
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