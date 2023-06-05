<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  isHidden: Boolean,
  currentTaskName: String,
  currentTaskDescription: String,
});

const isHidden = ref(props.isHidden);
const taskName = ref(props.currentTaskName);
const taskDescription = ref(props.currentTaskDescription);
</script>
<template>
  <div
    :class="{ hidden: isHidden }"
    class="rounded-xl bg-white ml-5 p-3 grow-1 text-left w-96"
  >
    <div @click="() => (isHidden = true)">
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
        class="feather feather-x-circle hover:stroke-violet-500"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    </div>
    <div class="text-teal-500 font-bold py-3 text-5xl">
      {{ taskName }}
    </div>
    <div class="pl-2">
      <p class="mt-3 mb-1 text-2xl">Beschreibung</p>
      <div>{{ taskDescription }}</div>
    </div>
  </div>
</template>
