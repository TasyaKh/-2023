<script lang  = "ts" setup>

const props = defineProps<{ name: string }>()

</script>

<template>
    <div class="calendar-container">
        <div class="row">
            <div class="col-auto">
                <a href="#" class="search-btn">
                    <img src="./icons/иконка календаря.svg" alt="">
                </a>
            </div>
            <div class="col"> <input type="search" class="calendar-input" placeholder="16.07.2023" />

            </div>
        </div>
    </div>
</template>

<style scoped lang = "scss">
.calendar-container {
    padding: 8px 20px;
    outline: none;
    cursor: pointer;
    border-right: 1px solid #00ff22;
    background: white;
    border: 0.25px rgba(61, 61, 61, 0.10) solid;
    width: fit-content;

    display: inline-flex;
    border: 0.50px rgba(61, 61, 61, 0.10) solid;
    border-radius: 13px;
    overflow: hidden;

    color: #352958;
    font-size: 14px;
    font-family: Panton;
    font-weight: 400;
    word-wrap: break-word
}

.calendar-button:last-child {
    border-right: none;
}

.calendar-button:hover {
    background: rgba(237, 238, 240, 0.4)
}

.calendar-button:active {
    background: rgba(80, 68, 114, 1);
    color: white;
}

.calendar-container .calendar-input {
    width: 100%;
    border: none;
    outline: none;
    
}
</style>