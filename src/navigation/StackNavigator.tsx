import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TurnosScreen, { Turno } from "../screens/TurnosScreen";
import TramitesScreen, { Tramite } from "../screens/TramitesScreen";
import ActividadesScreen from "../screens/ActividadesScreen";
import HoyScreen from "../screens/HoyScreen";

// Props para Turnos y Trámites
interface StackNavigatorProps {
  turnos: Turno[];
  addTurno: (nombre: string) => void;
  toggleTurno: (id: number) => void;
  deleteTurno: (id: number) => void;

  tramites: Tramite[];
  addTramite: (nombre: string) => void;
  toggleTramite: (id: number) => void;
  deleteTramite: (id: number) => void;
}

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC<StackNavigatorProps> = ({
  turnos,
  addTurno,
  toggleTurno,
  deleteTurno,
  tramites,
  addTramite,
  toggleTramite,
  deleteTramite,
}) => {
  return (
    <Stack.Navigator>
      {/* Pantalla Inicio */}
      <Stack.Screen name="HoyScreen" options={{ title: "Inicio" }}>
        {props => <HoyScreen {...props} />}
      </Stack.Screen>

      {/* Turnos */}
      <Stack.Screen name="Turnos" options={{ title: "Turnos Médicos" }}>
        {props => (
          <TurnosScreen
            {...props}
            turnos={turnos}
            addTurno={addTurno}
            toggleTurno={toggleTurno}
            deleteTurno={deleteTurno}
          />
        )}
      </Stack.Screen>

      {/* Trámites */}
      <Stack.Screen name="Tramites" options={{ title: "Trámites" }}>
        {props => (
          <TramitesScreen
            {...props}
            tramites={tramites}
            addTramite={addTramite}
            toggleTramite={toggleTramite}
            deleteTramite={deleteTramite}
          />
        )}
      </Stack.Screen>

      {/* Actividades */}
      <Stack.Screen
        name="Actividades"
        component={ActividadesScreen}
        options={{ title: "Actividades" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
