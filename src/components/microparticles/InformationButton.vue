<template>
  <button
    class="group aspect-square w-5 flex place-content-center bg-teal-50 hover:bg-violet-500"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-zap stroke-violet-900 group-hover:stroke-violet-50 fill-none"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttonType: String,
  isPaused: Boolean,
});
</script>
