<template>
    <VDatePicker v-model.range.number="range" />
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  const range = ref({ start: 1688968800000, end: 1689314400000 });

  const attrs = ref([
  {
    key: 'today',
    dot: 'purple',
    dates: new Date(),
  },
]);
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