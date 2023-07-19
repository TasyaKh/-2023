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
   
    cursor: pointer;
  
    background: white; 
    border: 0.25px rgba(61, 61, 61, 0.10) solid;

    font-size: 14px; 
    font-family: "Panton"; 
    font-weight: 400; 
  
}

.time-button:hover
{
    background: rgba(237, 238, 240, 0.4);
    transition: 0.3s;
}

.time-button:active
{
    background: rgba(80, 68, 114, 1);
    color: white;
}
</style>
