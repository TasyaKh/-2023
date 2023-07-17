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

</script>

<template>
    <dropdown>
        <input id="toggle1" type="checkbox" unchecked>
        <label for="toggle1" class="animate">10 июля 2023 - 17 июля 2023</label>
        <ul class="animate">
            <!-- calendar  -->
            <h1 class="center"></h1>
            <Calendar color="purple" :attributes="attrs" />
        </ul>
    </dropdown>
</template>

<style scoped lang = "scss">
// кнопка выбора диапазона дат
dropdown label,
dropdown ul li {
    padding: 8px 20px;
    background: white;
    border: 1px rgba(61, 61, 61, 0.10) solid; // цвет обводки
    border-radius: 13px;
    overflow: hidden;
}

// надпись в кнопке выбора диапазона дат
dropdown label {
    color: #352958;
    font-size: 14px;
    font-family: Panton;
}

// hover-кнопка
dropdown label:hover,
dropdown ul li:hover {
    background: #352958; // фирменный фиолетовый цвет для кнопки
    color: white; // цвет шрифта
    cursor: pointer;
}

// чтобы не было видно чекбокса (т.к. эта кнопка по сути чекбокс)
dropdown input {
    display: none;
}

dropdown input~ul {
    position: relative;
    opacity: 0; // для анимации исчезновения календаря
    top: -20px; // для анимации появления календаря (он появляется чуть выше того расположения, в котором потом оказывается)
}

dropdown input:checked+label {
    background: #352958;
    color: white;
}

dropdown input:checked~ul {
    visibility: visible;
    opacity: 1;
    top: 0;
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