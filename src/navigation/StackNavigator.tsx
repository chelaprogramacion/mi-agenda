
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioScreen from "../screens/InicioScreen";
import TurnosScreen from "../screens/TurnosScreen";
import TramitesScreen from "../screens/TramitesScreen";
import ActividadesScreen from "../screens/ActividadesScreen";

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
        name="Turnos" 
        component={TurnosScreen} 
        options={{ 
    headerTitle: "", }} 
      />
      <Stack.Screen 
        name="Tramites" 
        component={TramitesScreen} 
         options={{ 
    headerTitle: "", }} 
      />
      <Stack.Screen 
        name="Actividades" 
        component={ActividadesScreen} 
         options={{ 
    headerTitle: "", }} 
      />
    </Stack.Navigator>
  );
}
