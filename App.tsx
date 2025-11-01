import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import StackNavigator from "./src/navigation/StackNavigator";
import NotasScreen from "./src/screens/NotasScreen"; 


// Interfaces
export interface Turno {
  id: number;
  nombre: string;
  completed: boolean;
}

export interface Tramite {
  id: number;
  nombre: string;
  completed: boolean;
}

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  // ➕ Estados
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [tramites, setTramites] = useState<Tramite[]>([]);

  // ➕ Funciones Turnos
  const addTurno = (nombre: string) => {
    if (!nombre.trim()) return;
    setTurnos(prev => [...prev, { id: Date.now(), nombre, completed: false }]);
  };

  const toggleTurno = (id: number) => {
    setTurnos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTurno = (id: number) => {
    setTurnos(prev => prev.filter(t => t.id !== id));
  };

  // ➕ Funciones Trámites
  const addTramite = (nombre: string) => {
    if (!nombre.trim()) return;
    setTramites(prev => [...prev, { id: Date.now(), nombre, completed: false }]);
  };

  const toggleTramite = (id: number) => {
    setTramites(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTramite = (id: number) => {
    setTramites(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: any = "help-outline";
            if (route.name === "Inicio") iconName = "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
        })}
      >
        <Tab.Screen name="Inicio">
          {() => (
            <StackNavigator
              turnos={turnos}
              addTurno={addTurno}
              toggleTurno={toggleTurno}
              deleteTurno={deleteTurno}
              tramites={tramites}
              addTramite={addTramite}
              toggleTramite={toggleTramite}
              deleteTramite={deleteTramite}
            />
          )}
        </Tab.Screen>

       <Tab.Screen
  name="Notas"
  component={NotasScreen} // <-- agregás la pestaña
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="document-text-outline" size={size} color={color} />
    ),
  }}
/>


      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
