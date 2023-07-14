
<script lang="ts" setup>
import { ref } from 'vue';

const searchTxt = ref()

const props = defineProps<{
    handleEventStartSearch: Function,
}>()

function startSearch() {
    props.handleEventStartSearch(searchTxt.value)
}

</script>

<template>
    <div class="search-container">

        <div class="row">
            <div class="col-auto"> <a href="#" class="search-btn" @click="startSearch()">
                    <img src="./icons/иконка поиска.svg" alt="">
                </a></div>
            <div class="col"> <input type="search" class="search-input" placeholder="Поиск по проектам"
                    v-model="searchTxt" />

            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.search-container {
    border-radius: 13px;
    border: 1px solid #E4DFF0;
    background-color: var(--tc-c-white);
    padding: 8px 20px;
    // box-shadow: 3px 5px 17px -4px rgba(152, 131, 197, 0.33) inset;

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
</style>