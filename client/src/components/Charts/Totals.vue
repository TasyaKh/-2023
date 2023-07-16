<script setup lang="ts">

// ДАННЫЕ С КАРТИНКАМИ ДЛЯ ЯНДЕКСА

const props = defineProps<{
    data: any,      //данные
    title: string,//название графика
}>()

</script>

<template>
    <h5 class="title">{{ title }}</h5>
    <div class="row totals" v-for="item in data">
        <div class="col">
            <div class="row my-1">
                <!-- icon -->
                <div class="col-auto">
                    <img :src="`https://favicon.yandex.net/favicon/${item.y_data_favicon}?size=16`" alt="">
                </div>
                <!-- name -->
                <div class="col text-start">
                    {{ item.y_data_name }}</div>

            </div>
        </div>
        <!-- value -->
        <div class="col-auto">{{ item.sum }}</div>
    </div>
</template>

<style scoped lang="scss">
.totals {
    font-size: 14px;
}

.title {
    font-weight: bold;
}
</style>