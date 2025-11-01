# Mi Agenda

**Mi Agenda** es una aplicación móvil que permite organizar turnos médicos, trámites y actividades y notas en un solo lugar. La app avisa si ya hay algo agendado en el mismo día, evitando superposiciones y ayudando a gestionar mejor el tiempo.

---

##  Estructura de carpetas

mi-agenda/
│
├─ assets/
├─ src/
│  ├─ screens/
│  │  ├─ Actividades/
│  │  ├─ Hoy/
│  │  ├─ Turnos/
│  │  ├─ Tramites/
│  │  └─ Notas/
│  └─ navigation/
├─ types/
│  ├─ declaration.d.ts
│  └─ navigation.ts
├─ .gitignore
├─ app.json
├─ app.tsx
├─ index.ts
├─ package-lock.json
├─ package.json
├─ tsconfig.json
└─ README.md



---

##  Dependencias principales

**React Navigation**
 ```bash 
  npm install @react-navigation/native @react-navigation/native-stack
  npm install @react-navigation/bottom-tabs
  npm install react-native-screens react-native-safe-area-context

**Iconos**
bash
npm install react-native-vector-icons

**AsyncStorage**
bash
npm install @react-native-async-storage/async-storage

> Nota: No se utiliza ninguna funcionalidad de IA en esta versión.

---

##  Instalación y ejecución
bash

git clone https://github.com/chelaprogramacion/mi-agenda.git
cd mi-agenda
npm install
npx expo start 

Uso:
En la pantalla principal verás tres botones:

 Turnos Médicos

 Trámites

 Actividades

 Notas -> Para registrar información libre, como ideas, observaciones o datos importantes que quieras tener a mano. No se asocia a fechas ni genera alertas automáticas.

Al agregar un nuevo evento, la app verifica si ya hay algo en esa fecha y muestra una alerta, permitiendo reorganizar los turnos o continuar.
Los datos se guardan localmente usando AsyncStorage.

 
Créditos

Esta aplicación fue desarrollada por Marcela Sanagua.
Algunos fragmentos de código y mejoras fueron realizados con la ayuda de ChatGPT, asistente de IA de OpenAI.

