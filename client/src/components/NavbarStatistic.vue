<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';


// const selectedItem = ref(1)
const selectedProject = ref(1)

const props = defineProps<{
    yandexId: number,
    topvisorId: number,
    // date1: Date,
    // date2: Date,
    // handleEventSelectedItem: Function
}>()

// function setSelectedItem(item: number) {
//     selectedItem.value = item
//     props.handleEventSelectedItem(item)
// }



</script>

<template>
    <nav class="navbar bg-white fixed-top">
        <div class="container-fluid">

            <div class="row">
                <!-- mtnu button -->
                <div class="col-auto">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>


                <!-- projects -->
                <div class="col-auto">
                    <select class="form-select" aria-label="project" v-model="selectedProject">
                        <option value="1" :selected="selectedProject==1">БГБ Иркутск</option>
                        <option value="2" :selected="selectedProject==2">Проект 1</option>
                        <option value="3" :selected="selectedProject==3">Проект 2</option>
                    </select>
                </div>
                <div class="col-auto">
                    <div class="container">
                        bgazobeton.ru
                    </div>
                </div>
                <div class="col-auto">
                    <div class="dot">
                        •   
                    </div>
                </div>
                <div class="col-auto">
                    <div class="number">
                        12418261  
                    </div>
                </div>
            </div>




            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">

                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <!-- Позиции сайта -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/bar_chart_4_bars.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page"
                                    :href="`/site-positions/${yandexId}/${topvisorId}`">Позиции сайта</a>
                            </div>

                        </li>
                        <!-- Сводка -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/speed.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page"
                                    :href="`/dashboards/${yandexId}/${topvisorId}`">Сводка</a>
                            </div>

                        </li>
                        <!-- Карта кликов -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/map.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page" href="#">Карта кликов</a>
                            </div>

                        </li>
                        <!-- Конверсии -->
                        <li class="nav-item row">
                            <div class="col-auto">
                                <img src="./icons/percent.svg" alt="">
                            </div>
                            <div class="col">
                                <a class="nav-link active" aria-current="page" href="#">Конверсии</a>
                            </div>

                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>
  


<style scoped lang="scss">
.navbar {
    font-family: "Panton";

    .nav-item {
        margin: 10px 0;

        &:hover {
            font-weight: bolder;

        }
    }

    .form-select {
        border: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        color: var(--unnamed, #352958);
        font-family: "Panton SemiBold";
        font-size: 21.552px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        
        &:hover {
            border-radius: 13px;
            border: 1px solid var(--unnamed, rgba(61, 61, 61, 0.10));
        }
        
    }
    .container{
        display: flex;
        width: 133px;
        height: 38px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: var(--unnamed, #352958);
        font-family: "Panton";
        font-size: 21.552px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-decoration-line: underline;
    }
    .dot{
        display: flex;
        width: 10px;
        height: 40px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: var(--unnamed, #352958);
        font-family: "Panton";
        font-size: 21.552px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }
    .number{
        display: flex;
        width: 80px;
        height: 43px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: var(--unnamed, #352958);
        font-family: "Panton";
        font-size: 21.552px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}

.offcanvas {
    max-width: 230px;
}


</style>