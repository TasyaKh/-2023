
<script lang="ts" setup>

const props = defineProps<{
    name: string
}>()

</script>

<template>
    <button class="time-button">
        {{ name }}
    </button>
</template>

<style scoped lang="scss">
.time-button {
    padding: 5px 10px;
    border:none;
    background: #FFF;
}
</style>