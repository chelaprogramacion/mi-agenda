# Mi Agenda

**Mi Agenda** es una aplicación móvil que permite organizar turnos médicos, trámites y actividades y notas en un solo lugar. La app avisa si ya hay algo agendado en el mismo día y horario, evitando superposiciones y ayudando a gestionar mejor el tiempo.

---

##  Estructura de carpetas

mi-agenda/
│
├─ assets/
│
├─ src/
│  ├─ screens/
│  │  ├─ Inicio/                  # Pantalla principal con acceso a Eventos y Lista de Eventos
│  │  ├─ Eventos/                 # Aquí se agregan turnos, trámites y actividades
│  │  ├─ ListaEventos/            # Lista de todos los eventos
│  │  └─ Notas/                   # Información libre, sin alertas automáticas
│  └─ navigation/
│     ├─ StackNavigator.tsx   
│     └─ TabNavigator.tsx      
│
├─ types/
│  ├─ declaration.d.ts
│  └─ navigation.ts            
│
├─ .gitignore
├─ app.json
├─ app.tsx
├─ index.ts
├─ package-lock.json
├─ package.json
├─ tsconfig.json
└─ README.md

Nota: Las screens antiguas Turnos, Trámites y Actividades fueron eliminadas y unificadas en EventosScreen.



---

##  Dependencias principales

**React Navigation**
  npm install @react-navigation/native @react-navigation/native-stack
  npm install @react-navigation/bottom-tabs
  npm install react-native-screens react-native-safe-area-context

**Iconos**
npm install react-native-vector-icons

**AsyncStorage**
npm install @react-native-async-storage/async-storage

**DateTimePicker**
npm install @react-native-community/datetimepicker

**Calendario**
npm install react-native-calendars


> Nota: No se utiliza ninguna funcionalidad de IA en esta versión.

---

## Instalación y ejecución 


git clone https://github.com/chelaprogramacion/mi-agenda.git
cd mi-agenda
npm install
npx expo start 

Uso:
En la pantalla principal verás dos botones:

Ir a Eventos - Permite agregar turnos médicos, trámites y actividades desde la misma pantalla.

Ver Lista de Eventos - Muestra todos los eventos agendados.

Notas - Para registrar información libre, como ideas, observaciones o datos importantes que quieras tener a mano. No se asocia a fechas ni genera alertas automáticas.

Al agregar un nuevo evento, la app verifica si ya hay algo en esa fecha y horario y muestra una alerta, permitiendo reorganizar los eventos o continuar. Los datos se guardan localmente usando AsyncStorage.
 
Créditos

Algunos fragmentos de código y ajustes específicos fueron realizados con la ayuda de ChatGPT (OpenAI), principalmente en:


- Manejo del DateTimePicker y lógica para seleccionar horarios.
- Organización de las funciones que guardan y leen eventos usando AsyncStorage.
- Corrección de errores menores de sintaxis y organización de carpetas.

El desarrollo general de la aplicación fue realizado por Marcela Sanagua.
