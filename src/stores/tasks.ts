import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { showPlay, showText } from '../main';

let interval: any;

let taskIndex: number;

let resetIndex: number;

export interface Task extends Object {
  id: Number;

  tasksName: String;

  taskTime: Object;

  taskDescription: String;

  isPaused: Boolean;
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    currentTaskNumber: useStorage('currentTaskNumber', 0),
    tasks: useStorage('tasks', [
      {
        id: 1,
        taskName: 'Task 1',
        taskTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        taskDescription: 'Ich bin eine ganz kurze Description. ',
        isPaused: true,
      },
      {
        id: 2,
        taskName: 'Task 2',
        taskTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        taskDescription:
          'Ich bin eine ganz kurze Description. Außerdem habe ich die Möglichkeit das Ganze anzupassen.',
        isPaused: true,
      },
      {
        id: 3,
        taskName: 'Task 3',
        taskTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        taskDescription: 'Ich bin eine ganz kurze Description. ',
        isPaused: true,
      },
      {
        id: 4,
        taskName: 'Task 4',
        taskTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        taskDescription: 'Ich bin eine ganz kurze Description. ',
        isPaused: true,
      },
    ]),
    tasksToUpdate: JSON.parse(localStorage.getItem('tasks') as any),
  }),

  actions: {
    goToNextTask() {
      if (this.currentTaskNumber < 3) {
        this.currentTaskNumber++;
      } else {
        this.currentTaskNumber = 0;
      }
      showText(this.tasksToUpdate[this.currentTaskNumber].taskName);
    },
    setTasksPaused() {
      this.tasksToUpdate.forEach((myTask) => {
        myTask.isPaused = true;
      });
      this.pauseStopwatch();
    },
    resetTask(i: number) {
      resetIndex = i;
      this.tasksToUpdate[resetIndex].taskTime.seconds = 0;
      this.tasksToUpdate[resetIndex].taskTime.minutes = 0;
      this.tasksToUpdate[resetIndex].taskTime.hours = 0;
      this.tasksToUpdate[resetIndex].taskTime.days = 0;
    },
    startStopwatch(i: number) {
      taskIndex = i;
      interval = setInterval(this.tick, 1000);
      showPlay();
    },

    pauseStopwatch() {
      clearInterval(interval);
      localStorage.setItem('tasks', JSON.stringify(this.tasksToUpdate));
    },

    tick() {
      this.tasksToUpdate[taskIndex].taskTime.seconds++;
      if (this.tasksToUpdate[taskIndex].taskTime.seconds >= 60) {
        this.tasksToUpdate[taskIndex].taskTime.seconds = 0;
        this.tasksToUpdate[taskIndex].taskTime.minutes++;
        if (this.tasksToUpdate[taskIndex].taskTime.minutes >= 60) {
          this.tasksToUpdate[taskIndex].taskTime.minutes = 0;
          this.tasksToUpdate[taskIndex].taskTime.hours++;
          if (this.tasksToUpdate[taskIndex].taskTime.hours >= 8) {
            this.tasksToUpdate[taskIndex].taskTime.hours = 0;
            this.tasksToUpdate[taskIndex].taskTime.days++;
          }
        }
      }
    },
    playPauseHandler() {
      const task = this.tasksToUpdate[this.currentTaskNumber];
      if (task.isPaused) {
        this.tasksToUpdate.forEach((myTask: Task) => {
          myTask.isPaused = true;
        });
        this.pauseStopwatch();
        this.startStopwatch(this.currentTaskNumber);
        task.isPaused = false;
        this.tasksToUpdate.forEach((myTask: Task) => {
          if (myTask !== task) {
            myTask.isPaused = true;
          }
        });
        console.log('Stopwatch started');
      } else if (!task.isPaused) {
        this.pauseStopwatch();
        task.isPaused = true;
        console.log('Stopwatch paused');
      }
    },
  },
});
