import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { requestMicrobit, getServices } from 'microbit-web-bluetooth';
import { useTaskStore } from './stores/tasks';
import { useDeviceStore } from './stores/device';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

let device;
let services;

const taskStore = useTaskStore();
const deviceStore = useDeviceStore();

let deviceInterval;

const eventHandler = (event) =>
  console.log(`${event.type}: ${JSON.stringify(event.detail, null, 2)}`);

const eventHandlerButtonA = (event) => {
  if (event.detail === 1) {
    taskStore.playPauseHandler();
  }
};

const eventHandlerButtonB = (event) => {
  if (event.detail === 1) {
    taskStore.goToNextTask();
  }
};

document.getElementById('connect').onclick = async () => {
  device = await requestMicrobit(window.navigator.bluetooth);
  console.log(BluetoothRemoteGATTServer);
  if (device) {
    services = await getServices(device);
    deviceStore.isConnected = true;
    deviceInterval = setInterval(checkConnection, 10000);

    if (services.deviceInformationService) {
      console.log(
        await services.deviceInformationService.readDeviceInformation()
      );
    }

    if (services.uartService) {
      services.uartService.addEventListener('receiveText', eventHandler);
      await services.uartService.send(
        new Uint8Array([104, 101, 108, 108, 111, 58])
      ); // hello:
    }

    if (services.ledService) {
      await services.ledService.setScrollingDelay(100);

      await services.ledService.writeMatrixState([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
      ]);
      console.log(await services.ledService.readMatrixState());
    }

    if (services.buttonService) {
      services.buttonService.addEventListener(
        'buttonastatechanged',
        eventHandlerButtonA
      );
      services.buttonService.addEventListener(
        'buttonbstatechanged',
        eventHandlerButtonB
      );
    }
  }
};

document.getElementById('disconnect').onclick = () => {
  if (device) {
    const likeToDisconnect = confirm(
      `Wenn du dich disconnectest werden deine Tasks pausiert. 
      Möchtest du disconnecten?`
    );
    if (likeToDisconnect) {
      device.gatt.disconnect();
      deviceStore.isConnected = false;
      taskStore.setTasksPaused();
      console.log('Device is disconnected');
    } else {
      return;
    }
  }
};

export async function sayHello() {
  if (services.ledService) {
    services.ledService.writeText('I <3 Time tracking');
  } else {
    return;
  }
}

export async function showSun() {
  if (services.ledService) {
    await services.ledService.writeMatrixState([
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
    ]);
  } else {
    return;
  }
}

function checkConnection() {
  if (device.gatt.connected) {
    console.log('Device still connected');
  } else {
    console.log('Device is not connected anymore');
    deviceStore.isConnected = false;
    clearInterval(deviceInterval);
  }
  return;
}
