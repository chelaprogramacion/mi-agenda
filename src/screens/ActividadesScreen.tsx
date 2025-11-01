// src/screens/ActividadesScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";

interface Actividad {
  id: number;
  nombre: string;
  fecha: string;
}

const ActividadesScreen: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");

  // 🔹 Guardar actividades
  const guardarActividades = async (lista: Actividad[]) => {
    try {
      await AsyncStorage.setItem("actividades", JSON.stringify(lista));
    } catch (error) {
      console.error("Error al guardar actividades", error);
    }
  };

  // 🔹 Selección de fecha en el calendario
  const handleSeleccionFecha = async (day: any) => {
    const fecha = day.dateString;
    setFechaSeleccionada(fecha);

    try {
      const data = await AsyncStorage.getItem("actividades");
      const actividadesGuardadas = data ? JSON.parse(data) : [];
      setActividades(actividadesGuardadas);
    } catch (error) {
      console.error("Error al cargar actividades", error);
    }
  };

  // 🔹 Agregar actividad con verificación de turnos y trámites
  const handleAgregarActividad = async () => {
    if (!nuevaActividad.trim()) {
      Alert.alert("Error", "Ingresa el nombre de la actividad");
      return;
    }
    if (!fechaSeleccionada) {
      Alert.alert("Error", "Selecciona una fecha primero");
      return;
    }

    try {
      // Leer turnos y trámites guardados
      const dataTurnos = await AsyncStorage.getItem("turnos");
      const turnos = dataTurnos ? JSON.parse(dataTurnos) : [];

      const dataTramites = await AsyncStorage.getItem("tramites");
      const tramites = dataTramites ? JSON.parse(dataTramites) : [];

      const hayTurno = turnos.some((t: any) => t.fecha === fechaSeleccionada);
      const hayTramite = tramites.some((t: any) => t.fecha === fechaSeleccionada);

      if (hayTurno || hayTramite) {
        Alert.alert(
          "⚠️ Atención",
          `Ya tenés ${
            hayTurno ? "un turno médico" : ""
          }${hayTurno && hayTramite ? " y " : ""}${
            hayTramite ? "un trámite" : ""
          } en esta fecha. ¿Querés agendar la actividad igual?`,
          [
            { text: "No", style: "cancel" },
            { text: "Sí", onPress: () => agregarActividadConfirmada() },
          ]
        );
      } else {
        agregarActividadConfirmada();
      }
    } catch (error) {
      console.error("Error al verificar turnos o trámites", error);
    }
  };

  // 🔹 Función que realmente agrega la actividad
  const agregarActividadConfirmada = async () => {
    const nueva: Actividad = {
      id: Date.now(),
      nombre: nuevaActividad,
      fecha: fechaSeleccionada,
    };

    const nuevaLista = [...actividades, nueva];
    setActividades(nuevaLista);
    await guardarActividades(nuevaLista);
    setNuevaActividad("");

    Alert.alert("✅ Actividad agregada", `Agregada para el ${fechaSeleccionada}`);
  };

  // 🔹 Eliminar actividad
  const deleteActividad = async (id: number) => {
    const nuevaLista = actividades.filter((a) => a.id !== id);
    setActividades(nuevaLista);
    await guardarActividades(nuevaLista);
  };

  // 🔹 Filtrar actividades por fecha seleccionada
  const actividadesDelDia = fechaSeleccionada
    ? actividades.filter((a) => a.fecha === fechaSeleccionada)
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actividades</Text>

      <Calendar
        onDayPress={handleSeleccionFecha}
        markedDates={
          fechaSeleccionada
            ? { [fechaSeleccionada]: { selected: true, selectedColor: "#2563eb" } }
            : {}
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nueva actividad"
          value={nuevaActividad}
          onChangeText={setNuevaActividad}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAgregarActividad}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>
        {fechaSeleccionada
          ? `Actividades del ${fechaSeleccionada}`
          : "Selecciona una fecha para ver o agregar actividades"}
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {actividadesDelDia.length > 0 ? (
          actividadesDelDia.map((a) => (
            <View key={a.id} style={styles.item}>
              <Text style={styles.itemText}>• {a.nombre}</Text>
              <TouchableOpacity
                onPress={() => deleteActividad(a.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay actividades para esta fecha</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ActividadesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subTitle: { textAlign: "center", marginVertical: 10, fontWeight: "600" },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: { fontSize: 16 },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deleteButtonText: { color: "#fff", fontSize: 14 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 10 },
});
