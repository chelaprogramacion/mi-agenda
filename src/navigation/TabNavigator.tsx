
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../types/navigation";

import HoyScreen from "../screens/InicioScreen";
import NotasScreen from "../screens/NotasScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Inicio">
      <Tab.Screen name="Inicio" component={HoyScreen} />
      <Tab.Screen name="Notas" component={NotasScreen} />
    </Tab.Navigator>
  );
}
