<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTaskStore } from './stores/tasks';
import BaseView from './components/views/BaseView.vue';
import NotFound from './components/views/NotFound.vue';

defineProps({
  isActive: Boolean,
});

const taskStore = ref(useTaskStore());

window.onbeforeunload = function () {
  return taskStore.value.setTasksPaused();
};

const isActive = ref(false);
/*
Easy routing:
1. Define Routes
2. Get current location path
3. When window-location-hash changes, adjust current location path
4. Set current view by currentPath
*/

const routes = {
  '/': BaseView,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
});

console.log(currentPath);
</script>

<template>
  <!--Entrypoint of application. Here I can put my -->
  <div
    class="flex place-content-center divide-x divide-solid divide-violet-800 pb-4"
  ></div>
  <component :is="currentView" />
</template>

<style scoped></style>
