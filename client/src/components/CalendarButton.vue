<script lang  = "ts" setup>
import { ref } from 'vue';

/* eslint-disable */
// @ts-ignore - это нужно чтобы подавить ошибку в строке ниже (ругается на тип any у v-calendar)
import Calendar from '@/components/Calendar.vue';
/* eslint-enable */

// для v-calendar
const attrs = ref([
    {
        highlight: true,
        dates: new Date(),
    },
]);

const props = defineProps<{
    handleDateChanged: Function,
    start: Date,
    end: Date
}>()

</script>

<template>
    <div class="dropdown">
        <input id="toggle1" type="checkbox" unchecked>
        <label for="toggle1" class="animate"> {{ start.toLocaleDateString() }} - {{ end.toLocaleDateString() }}</label>
        <ul class="animate">
            <!-- calendar  -->
            <Calendar color="purple" :attributes="attrs" :handleDateChanged="handleDateChanged" :date1="start"
                :date2="end" />
        </ul>
    </div>
</template>

<style scoped lang = "scss">
.dropdown {
    position: relative;
}

// кнопка выбора диапазона дат
.dropdown label,
.dropdown ul li {
    padding: 8px 20px;
    background: white;
    border: 1px rgba(61, 61, 61, 0.10) solid; // цвет обводки
    border-radius: 13px;
    overflow: hidden;
}

// надпись в кнопке выбора диапазона дат
.dropdown label {
    color: #352958;
    font-size: 14px;
    font-family: Panton;
}

// hover-кнопка
.dropdown label:hover,
.dropdown ul li:hover {
    background: #352958; // фирменный фиолетовый цвет для кнопки
    color: white; // цвет шрифта
    cursor: pointer;
}

// чтобы не было видно чекбокса (т.к. эта кнопка по сути чекбокс)
.dropdown input {
    display: none;
}

.dropdown input~ul {
    display: none;
    position: absolute;
    z-index: 1;
    left: 0px;
    right: 0px;

    // opacity: 0; // для анимации исчезновения календаря
    top: -70px; // для анимации появления календаря (он появляется чуть выше того расположения, в котором потом оказывается)
}

.dropdown input:checked+label {
    background: #352958;
    color: white;
}

.dropdown input:checked~ul {
    display: block;
    opacity: 1;
    top: 20px;
}

.animate {

    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -ms-transition: all .3s;
    transition: all .3s;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    /* Chrome and Safari */
    -moz-backface-visibility: hidden;
    /* Firefox */
    -ms-backface-visibility: hidden;
    /* Internet Explorer */
}
</style>