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

interface Turno {
  id: number;
  nombre: string;
  fecha: string;
}

const TurnosScreen: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [nuevoTurno, setNuevoTurno] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");

  // 🔹 Guardar turnos
  const guardarTurnos = async (lista: Turno[]) => {
    try {
      await AsyncStorage.setItem("turnos", JSON.stringify(lista));
    } catch (error) {
      console.error("Error al guardar turnos", error);
    }
  };

  // 🔹 Cuando se selecciona una fecha
  const handleSeleccionFecha = async (day: any) => {
    const fecha = day.dateString;
    setFechaSeleccionada(fecha);

    try {
      // Cargar turnos guardados
      const dataTurnos = await AsyncStorage.getItem("turnos");
      const turnosGuardados = dataTurnos ? JSON.parse(dataTurnos) : [];
      setTurnos(turnosGuardados);
    } catch (error) {
      console.error("Error al cargar turnos", error);
    }
  };

  // 🔹 Agregar turno (con verificación de trámite)
  const handleAgregarTurno = async () => {
    if (!nuevoTurno.trim()) {
      Alert.alert("Error", "Ingresa el nombre del turno");
      return;
    }
    if (!fechaSeleccionada) {
      Alert.alert("Error", "Selecciona una fecha en el calendario");
      return;
    }

    try {
      // Leer trámites guardados
      const dataTramites = await AsyncStorage.getItem("tramites");
      const tramites = dataTramites ? JSON.parse(dataTramites) : [];

      const tieneTramiteEseDia = tramites.some(
        (t: any) => t.fecha === fechaSeleccionada
      );

      if (tieneTramiteEseDia) {
        Alert.alert(
          "⚠️ Atención",
          "Ya tenés un trámite agendado en esta fecha. ¿Querés agendar el turno igual?",
          [
            { text: "No", style: "cancel" },
            { text: "Sí", onPress: () => agregarTurnoConfirmado() },
          ]
        );
      } else {
        agregarTurnoConfirmado();
      }
    } catch (error) {
      console.error("Error al verificar trámites", error);
    }
  };

  // 🔹 Función auxiliar que realmente agrega el turno
  const agregarTurnoConfirmado = async () => {
    const nuevo: Turno = {
      id: Date.now(),
      nombre: nuevoTurno,
      fecha: fechaSeleccionada,
    };

    const nuevaLista = [...turnos, nuevo];
    setTurnos(nuevaLista);
    await guardarTurnos(nuevaLista);
    setNuevoTurno("");

    Alert.alert("✅ Turno agregado", `Agregado para el ${fechaSeleccionada}`);
  };

  // 🔹 Eliminar turno
  const deleteTurno = async (id: number) => {
    const nuevaLista = turnos.filter((t) => t.id !== id);
    setTurnos(nuevaLista);
    await guardarTurnos(nuevaLista);
  };

  // 🔹 Filtrar turnos por fecha seleccionada
  const turnosDelDia = fechaSeleccionada
    ? turnos.filter((t) => t.fecha === fechaSeleccionada)
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turnos Médicos</Text>

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
          placeholder="Nuevo turno"
          value={nuevoTurno}
          onChangeText={setNuevoTurno}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAgregarTurno}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>
        {fechaSeleccionada
          ? `Turnos del ${fechaSeleccionada}`
          : "Selecciona una fecha para ver o agregar turnos"}
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {turnosDelDia.length > 0 ? (
          turnosDelDia.map((t) => (
            <View key={t.id} style={styles.turnoItem}>
              <Text style={styles.turnoText}>• {t.nombre}</Text>

              {/* 🔸 Botón eliminar */}
              <TouchableOpacity
                onPress={() => deleteTurno(t.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay turnos para esta fecha</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default TurnosScreen;

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
  turnoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  turnoText: { fontSize: 16 },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deleteButtonText: { color: "#fff", fontSize: 14 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 10 },
});
