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

 interface Tramite {
  id: number;
  nombre: string;
  fecha: string;
}

const TramitesScreen: React.FC = () => {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [nuevoTramite, setNuevoTramite] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");

  
  const guardarTramites = async (lista: Tramite[]) => {
    try {
      await AsyncStorage.setItem("tramites", JSON.stringify(lista));
    } catch (error) {
      console.error("Error al guardar trámites", error);
    }
  };

  
  const handleSeleccionFecha = async (day: any) => {
    const fecha = day.dateString;
    setFechaSeleccionada(fecha);

    try {
      
      const dataTramites = await AsyncStorage.getItem("tramites");
      const tramitesGuardados = dataTramites ? JSON.parse(dataTramites) : [];
      setTramites(tramitesGuardados);
    } catch (error) {
      console.error("Error al cargar trámites", error);
    }
  };

  
  const handleAgregarTramite = async () => {
    if (!nuevoTramite.trim()) {
      Alert.alert("Error", "Ingresa el nombre del trámite");
      return;
    }
    if (!fechaSeleccionada) {
      Alert.alert("Error", "Selecciona una fecha en el calendario");
      return;
    }

    try {
      
      const dataTurnos = await AsyncStorage.getItem("turnos");
    const turnos = dataTurnos ? JSON.parse(dataTurnos) : [];

    const dataActividades = await AsyncStorage.getItem("actividades");
    const actividades = dataActividades ? JSON.parse(dataActividades) : [];

    const hayTurno = turnos.some((t: any) => t.fecha === fechaSeleccionada);
    const hayActividad = actividades.some((a: any) => a.fecha === fechaSeleccionada);

    if (hayTurno || hayActividad) {
      Alert.alert(
        "⚠️ Atención",
        `Ya tenés ${
          hayTurno ? "un turno médico" : ""
        }${hayTurno && hayActividad ? " y " : ""}${
          hayActividad ? "una actividad" : ""
        } en esta fecha. ¿Querés agendar el trámite igual?`,
        [
          { text: "No", style: "cancel" },
          { text: "Sí", onPress: () => agregarTramiteConfirmado() },
        ]
      );
    } else {
      agregarTramiteConfirmado();
      }
    } catch (error) {
      console.error("Error al verificar turnos", error);
    }
  };

  
  const agregarTramiteConfirmado = async () => {
    const nuevo: Tramite = {
      id: Date.now(),
      nombre: nuevoTramite,
      fecha: fechaSeleccionada,
    };

    const nuevaLista = [...tramites, nuevo];
    setTramites(nuevaLista);
    await guardarTramites(nuevaLista);
    setNuevoTramite("");

    Alert.alert("✅ Trámite agregado", `Agregado para el ${fechaSeleccionada}`);
  };

  
  const deleteTramite = async (id: number) => {
    const nuevaLista = tramites.filter((t) => t.id !== id);
    setTramites(nuevaLista);
    await guardarTramites(nuevaLista);
  };

  
  const tramitesDelDia = fechaSeleccionada
    ? tramites.filter((t) => t.fecha === fechaSeleccionada)
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trámites</Text>

      <Calendar
        onDayPress={handleSeleccionFecha}
        markedDates={
          fechaSeleccionada
            ? { [fechaSeleccionada]: { selected: true, selectedColor: "#16a34a" } }
            : {}
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nuevo trámite"
          value={nuevoTramite}
          onChangeText={setNuevoTramite}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAgregarTramite}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>
        {fechaSeleccionada
          ? `Trámites del ${fechaSeleccionada}`
          : "Selecciona una fecha para ver o agregar trámites"}
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {tramitesDelDia.length > 0 ? (
          tramitesDelDia.map((t) => (
            <View key={t.id} style={styles.tramiteItem}>
              <Text style={styles.tramiteText}>• {t.nombre}</Text>

              
              <TouchableOpacity
                onPress={() => deleteTramite(t.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay trámites para esta fecha</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default TramitesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e6f7ff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subTitle: { textAlign: "center", marginVertical: 10, fontWeight: "600" },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  button: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  tramiteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tramiteText: { fontSize: 16 },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deleteButtonText: { color: "#fff", fontSize: 14 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 10 },
});