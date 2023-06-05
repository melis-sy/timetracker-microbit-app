import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('device', {
  state: () => ({
    isConnected: false,
  }),

  actions: {},
});
