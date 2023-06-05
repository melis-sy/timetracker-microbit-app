# Time-Tracker

Dieser Time Tracker lässt sich ganz einfach mit einem micro:bit koppeln, kann aber auch ohne micro:bit verwendet werden.

## Features die immer zur Verfügung stehen

1. Time-Tracking von bis zu vier Aufgaben
2. Tracking der benötigten PTs auf Basis eines 8-Stunden-Tages
3. Zurücksetzen einzelner Aufgaben auf die Initialzeit 0
4. Anpassen der Aufgabenbezeichner und -beschreibungen
5. Schließen des Infromationskastens durch die **Taste x**
6. Wechsel in den Bearbeitenmodus (bei geöffnetem Informationskasten) durch die **Taste e**

## Features in Kombination mit dem micro:bit

1. Wahl einer Aufgabe mithilfe des B-Button
2. Starten oder pausieren der gewählten Aufgabe mithilfe des A-Button
3. Easter-Eggs: Die Button Herz :hearts: und Sonne :sunny:

## Verwendete Bibliothek für das Auslesen der micro:bit-Services

Um mit dem micro:bit zu kommunizieren, müssen die Services durch den micro:bit offengelegt werden. Hier für wird ein entsprechendes hex-File benötigt, dass auf den micro:bit aufgespielt wird.

Zu Testzwecken kann von thegecko (https://github.com/thegecko) folgendes hex-File für den micro:bit V2 verwendet werden:
https://github.com/thegecko/microbit-web-bluetooth/blob/master/hex/ble-open-microbit-v2.hex

Die verwendete JS- bzw. TS-Bibliothek, um auf die Services zuzugreifen, stammt ebenfalls von thegecko (https://github.com/thegecko):
https://github.com/thegecko/microbit-web-bluetooth

Die Bibliothek muss nicht separat installiert werden, wenn der Installations-Anleitung im nächsten Schritt gefolgt wird.

## Installation

1. Repository klonen
2.

```bash
npm install
```

3.

```bash
npm run dev
```

## micro:bit vorbereiten

1. Micro:bit an den Rechner anschließen
2. Oben erwähntes hex-File aufspielen
3. Micro:bit vom Rechner ausstecken und an Stromquelle anschließen
