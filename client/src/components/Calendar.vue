<template>
  <VDatePicker v-model="range" is-range/>
</template>
  
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    handleDateChanged: Function,
    date1:Date,
    date2:Date
}>()


const range = ref({ start: props.date1, end: props.date2 });

const attrs = ref([
  {
    key: 'today',
    dot: 'purple',
    dates: new Date(),
  },
]);




watch(() => range.value, async () => {
  props.handleDateChanged(range.value.start, range.value.end)
})


</script>

<style>
.vc-purple {
  --vc-accent-200: rgba(229, 232, 255, 1);
  --vc-accent-500: rgba(80, 68, 114, 1);
  --vc-accent-600: rgba(80, 68, 114, 1);
  --vc-accent-700: rgba(80, 68, 114, 1);
  --vc-accent-900: rgba(80, 68, 114, 1);
}
</style>