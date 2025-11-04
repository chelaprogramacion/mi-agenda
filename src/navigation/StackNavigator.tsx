import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioScreen from "../screens/InicioScreen";
import EventosScreen from "../screens/EventosScreen";
import ListaEventosScreen from "../screens/ListaEventosScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Eventos"
        component={EventosScreen}
        options={{
          headerTitle: "",
        }}
        
      />
      <Stack.Screen
  name="ListaEventos"
  component={ListaEventosScreen}
  options={{ headerTitle: "Lista de Eventos" }}
/>

    </Stack.Navigator>
  );
}
