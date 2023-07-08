<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

const logoUrl = ref()

onBeforeMount(async () => {

})


function getLogo(siteURL: string) {

    const url = `https://favicon.yandex.net/favicon/${siteURL}?size=16`
    return url
}

</script>

<template >
    <div class="container">

        <div class="row my-3">
            <div class="col">
                <!-- Поисковые строки -->

                <div class="search-container">

                    <div class="row">
                        <div class="col-auto"> <a href="#" class="search-btn">
                                <img :src="getLogo('bgazobeton.ru')" alt="">
                            </a></div>
                        <div class="col"> <input type="search" class="search-input" placeholder="Поиск по проектам" />

                        </div>
                    </div>

                </div>
            </div>

        </div>

        <!-- projects -->
        <div class="row">
            <div class="projects">
                <table class="table" cellspacing="0">
                    <thead>
                        <tr class="">
                            <th>Проект</th>
                            <th>Запросы</th>
                            <th>Ср. позиция</th>
                            <th>Динамика</th>


                            <th rowspan="2" colspan="2">
                                Топ 10 (Yandex/Topvisor)

                            </th>

                        </tr>


                    </thead>
                    <tbody>
                        <tr class="">
                            <td class="project">
                                <div class="row">
                                    {{ logoUrl }}
                                    <div class="col-auto d-flex align-items-center"><img :src="getLogo('bgazobeton.ru')"
                                            alt="site logo">
                                    </div>
                                    <div class="col">
                                        <div class="row">
                                            Байкальский газобетон

                                        </div>
                                        <div class="row project__site">
                                            <a href="http://bgazobeton.ru">
                                                bgazobeton.ru
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>46</td>
                            <td>3</td>
                            <td>2 39 5</td>



                            <td>43</td>
                            <td>45</td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-container {
    background-color: var(--tc-c-white);
    border-radius: 30px;
    padding: 8px 20px;

    input {
        font-family: "Panton";
    }

    .search-btn {
        margin: 0 20px;
        cursor: pointer;
    }
}


.search-container .search-input {

    width: 100%;
    border: none;
    outline: none;
}


.projects {
    .project {
        text-align: start;

        &__site {
            font-weight: normal;
        }
    }

    table {
        width: 100%;
        border-collapse: separate;
        border-radius: 10px 10px 0px 0px;
        overflow: hidden;

        tbody {
            text-align: center;

            td {
                font-weight: bold;
                padding: 10px;
                background-color: var(--tc-c-white);
                border-bottom: 2px solid #E4DFF0;
            }
        }

        thead {
            background-color: #F0F1FF;

            th {

                padding: 20px;
                border-bottom: 2px solid #E4DFF0;

            }

        }

    }
}
</style>
