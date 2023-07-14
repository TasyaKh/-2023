<script lang  = "ts" setup>

const props = defineProps<{ name: string }>()

</script>

<template>
    <button class="time-button">
        {{ name }}
    </button>
</template>

<style scoped lang = "scss">
.time-container {
    width: 480px;
    height: 37px;
    border-radius: 13px;
    overflow: hidden;
    border: 0.50px rgba(61, 61, 61, 0.10) solid;
    justify-content: flex-start;
    align-items: flex-start;
    display: inline-flex;

    .time-button {
        width: 80px;
        height: 37px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        background: white;
        border: 0.25px rgba(61, 61, 61, 0.10) solid;
        justify-content: center;
        align-items: center;
        gap: 10px;
        display: flex;
            color: #352958;
            font-size: 14px;
            font-family: Panton;
            font-weight: 400;
            word-wrap: break-word;
        
        &:hover {
            font-weight: bolder;
        }

        .time-button:active {
            background: rgb(0, 115, 255);
        }
    }
}
</style>