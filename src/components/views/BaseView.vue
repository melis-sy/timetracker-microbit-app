<script setup>
import { ref, watch } from 'vue';
import { useTaskStore } from '../../stores/tasks';
import { useDeviceStore } from '../../stores/device';
import { sayHello, showSun } from '../../main';

import TaskCard from '../particles/TaskCard.vue';
import InformationButton from '../microparticles/InformationButton.vue';
import PlayButton from '../microparticles/PlayButton.vue';

defineProps({
  msg: String,
  isHidden: Boolean,
  state: Object,
});

const isMoreInformation = ref(false);

const isEdit = ref(false);

document.addEventListener('keydown', (event) => {
  let name = event.key;
  console.log(name);
  if (name === 'x' && !isEdit.value) {
    isEdit.value = false;
    isMoreInformation.value = false;
  } else if (name === 'e' && isMoreInformation.value) {
    isEdit.value = true;
  } else {
    return;
  }
});

let currentTask = ref({});

const taskStore = ref(useTaskStore());
const deviceStore = ref(useDeviceStore());

watch(taskStore, (newTaskStore) => console.log(newTaskStore));
</script>

<template>
  <div class="pb-6 flex">
    <button
      class="w-1/6 bg-violet-200 hover:bg-violet-500 hover:text-white"
      :class="{ hidden: deviceStore.isConnected }"
      id="connect"
    >
      Connect
    </button>
    <div
      class="flex w-full gap-x-2"
      :class="{ hidden: !deviceStore.isConnected }"
    >
      <button
        class="w-1/6 bg-violet-200 hover:bg-violet-500 hover:text-white"
        id="disconnect"
      >
        Diconnect
      </button>
      <button
        class="w-16 flex place-content-center bg-pink-200 hover:bg-pink-400 hover:text-white"
        @click="sayHello()"
      >
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
          class="feather feather-heart"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </button>
      <button
        class="w-16 flex place-content-center bg-orange-200 hover:bg-orange-400 hover:text-white"
        @click="showSun()"
      >
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
          class="feather feather-sun"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <div><span id="temperaturePlace">No data</span> °C</div>
    </div>
  </div>
  <div class="flex">
    <div class="flex gap-10 flex-wrap">
      <TaskCard
        v-for="task in taskStore.tasksToUpdate"
        :key="task.id"
        :taskKey="task.id - 1"
        :name="task.taskName"
        :time="task.taskTime"
      >
        <template v-slot:refresh>
          <svg
            @click="
              {
                if (task.isPaused) {
                  taskStore.resetTask(task.id - 1);
                }
              }
            "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-refresh-cw w-5 self-center justify-end hover:stroke-pink-500"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
        </template>
        <template v-slot:buttons>
          <InformationButton
            @click="
              () => {
                isMoreInformation = true;
                currentTask = task;
              }
            "
          ></InformationButton>
          <PlayButton
            :is-paused="task.isPaused"
            @click="
              () => {
                if (task.isPaused) {
                  taskStore.tasksToUpdate.forEach((myTask) => {
                    myTask.isPaused = true;
                  });
                  taskStore.pauseStopwatch();
                  taskStore.startStopwatch(task.id - 1);
                  task.isPaused = false;
                  taskStore.tasksToUpdate.forEach((myTask) => {
                    if (myTask !== task) {
                      myTask.isPaused = true;
                    }
                  });
                  console.log('Stopwatch started');
                } else if (!task.isPaused) {
                  taskStore.pauseStopwatch();
                  task.isPaused = true;
                  console.log('Stopwatch paused');
                }
              }
            "
          ></PlayButton></template
      ></TaskCard>
    </div>

    <div
      :class="{
        mFadeOut: !isMoreInformation,
      }"
      class="rounded-xl bg-white ml-5 p-3 shrink-0 text-left w-72 min-h-96 flex flex-col overflow-clip"
    >
      <div class="flex">
        <div @click="() => (isMoreInformation = false)" class="flex-none">
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
      </div>
      <div class="py-3">
        <div
          v-if="!isEdit"
          class="ml-2 text-teal-500 font-bold text-5xl"
          :class="{ 'text-white': !isMoreInformation }"
        >
          {{ currentTask.taskName }}
        </div>
        <input
          v-if="isEdit"
          class="ml-2 text-teal-500 font-bold text-5xl w-64 h-12 rounded-md bg-violet-50"
          v-model="currentTask.taskName"
        />
      </div>
      <div class="flex-auto flex-col">
        <p class="pl-2 mt-3 mb-1 text-2xl">Beschreibung</p>
        <div v-if="!isEdit" class="pl-2">{{ currentTask.taskDescription }}</div>
        <textarea
          v-if="isEdit"
          class="flex-auto grow-0 ml-2 w-64 h-40 max-h-40 rounded-md bg-violet-50"
          v-model="currentTask.taskDescription"
        ></textarea>
      </div>
      <button
        v-if="!isEdit"
        class="mt-4 p-1 bg-violet-300 hover:bg-violet-500 hover:text-violet-50"
        @click="
          () => {
            isEdit = true;
            console.log(isEdit);
          }
        "
      >
        Bearbeiten
      </button>
      <button
        v-if="isEdit"
        class="p-1 bg-teal-300 hover:bg-teal-500 hover:text-teal-50"
        @click="
          () => {
            isEdit = false;
            taskStore.tasks[currentTask.id - 1] = currentTask;
            console.log(taskStore.tasks[currentTask.id - 1]);
            console.log(currentTask);
            console.log(isEdit);
          }
        "
      >
        Speichern
      </button>
    </div>
  </div>
</template>

<style scoped>
.mFadeOut {
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 392px;
  overflow: hidden;
  background-color: white;
  color: transparent;
  transition: visibility 0s linear 300ms, opacity 600ms, width 300ms;
}
</style>
