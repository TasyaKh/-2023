<script setup lang="ts">

const props = defineProps<{
    data: any,
    title: string,
}>()

</script>

<template>
    <h5 class="title">{{ title }}</h5>
    <div class="row totals" v-for="item in data">
        <div class="col">
            <div class="row my-1">
                <!-- icon -->
                <div class="col-auto">
                    <img :src="`https://favicon.yandex.net/favicon/${item.dimensions[0].favicon}?size=16`" alt="">
                </div>
                <!-- name -->
                <div class="col text-start">
                    {{ item.dimensions[0].name }}</div>

            </div>
        </div>
        <!-- value -->
        <div class="col-auto">{{ item.metrics[0] }}</div>
    </div>
</template>

<style scoped lang="scss">
.totals{
    font-size: 14px;
}

.title{
    font-weight: bold;
}
</style>