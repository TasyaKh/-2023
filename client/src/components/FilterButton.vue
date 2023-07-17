
<script lang="ts" setup>

import { ref, watch } from 'vue';

const state = ref(0)    //фильтр имеет несколько состояний (0,1,2)

const props = defineProps<{
    // при изменении состояния пережать обработку выше
    handleEventChangeState: Function,
    // если нужно задать какое то состояние
    state: number
}>()

// state changed
watch(() => props.state, (it) => {
    state.value = it
})

// изменить состояние
function setState(st: number) {
    state.value = st
    props.handleEventChangeState(state.value)
}

</script>

<template>
    <div class="filter">
        <!-- 0 null -->
        <div v-if="state == 0" @click="setState(1)">
            <img src="@/assets/images/фильтр.svg" alt="фильтр">
        </div>
        <!-- 1 ASC-->
        <div v-else-if="state == 1" @click="setState(-1)">
            <img src="@/assets/images/стрелка наверх.svg" alt="стрелка наверх">
        </div>
        <!-- -1 DESC-->
        <div v-else-if="state == -1" @click="setState(0)">
            <img src="@/assets/images/стреклка вниз.svg" alt="стрелка вниз">

        </div>
    </div>
</template>

<style scoped lang="scss">
.filter {
    cursor: pointer;
}
</style>