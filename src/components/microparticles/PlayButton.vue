<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  buttonType: String,
  isPaused: Boolean,
});
</script>

<template>
  <button
    class="group aspect-square w-5 flex place-content-center bg-violet-300 hover:bg-violet-500"
  >
    <div v-if="props.isPaused">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-play stroke-violet-900 group-hover:stroke-violet-50 fill-none"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    </div>
    <div v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-pause stroke-violet-900 group-hover:stroke-violet-50 fill-none"
      >
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    </div>
  </button>
</template>
