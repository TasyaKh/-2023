<script lang  = "ts" setup>

const props = defineProps<{ name: string }>()

</script>

<template>
    <button class="time-button">
        {{ name }}
    </button>
</template>

<style scoped lang = "scss">
.time-button
{
    padding: 8px 20px;
    outline: none;
    cursor: pointer;
    border-right: 1px solid #00ff22;
    background: white; 
    border: 0.25px rgba(61, 61, 61, 0.10) solid;

    color: #352958; 
    font-size: 14px; 
    font-family: Panton; 
    font-weight: 400; 
    word-wrap: break-word
}
.time-button:last-child
{
    border-right: none;
}
.time-button:hover
{
    background: rgba(237, 238, 240, 0.4)
}

.time-button:active
{
    background: rgba(80, 68, 114, 1);
    color: white;
}
</style>