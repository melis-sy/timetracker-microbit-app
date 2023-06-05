<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../../stores/tasks';
const props = defineProps({
  key: Number,
  taskKey: Number,
  name: String,
  time: Object,
});

console.log(props.taskKey);

const taskStore = ref(useTaskStore());

const taskTime = ref(props.time);
</script>

<template>
  <div
    class="border-2 border-violet-600 rounded-xl p-3 flex-none max-h-44 w-64"
    :class="{
      'outline-dashed outline-3 outline-offset-4 outline-pink-500':
        taskKey === taskStore.currentTaskNumber,
    }"
  >
    <div class="flex">
      <div class="text-teal-500 text-left font-bold text-2xl flex-auto">
        {{ name }}
      </div>
      <slot name="refresh"></slot>
    </div>
    <div class="font-mono text-violet-800 py-3 text-4mxl">
      {{
        `${taskTime?.hours > 9 ? taskTime?.hours : '0' + taskTime?.hours}:${
          taskTime?.minutes > 9 ? taskTime?.minutes : '0' + taskTime?.minutes
        }:${
          taskTime?.seconds > 9 ? taskTime?.seconds : '0' + taskTime?.seconds
        }`
      }}
    </div>
    <div class="flex">
      <div class="justify-self-start text-2xl self-center">
        {{ taskTime?.days }} PT
      </div>
      <div class="buttons flex flex-auto place-content-end gap-x-2">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
