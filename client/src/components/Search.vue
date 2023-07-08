
<script lang="ts" setup>

</script>

<template>
    <div class="search-container">

        <div class="row">
            <div class="col-auto"> <a href="#" class="search-btn">
                    <img src="./icons/иконка поиска.svg" alt="">
                </a></div>
            <div class="col"> <input type="search" class="search-input" placeholder="Поиск по проектам" />

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
</style>