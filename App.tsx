import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./src/navigation/StackNavigator";

import NotasScreen from "./src/screens/NotasScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#888",
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            if (route.name === "Inicio") iconName = "home-outline";
            else if (route.name === "Notas") iconName = "document-text-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={StackNavigator} />
        <Tab.Screen name="Notas" component={NotasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
