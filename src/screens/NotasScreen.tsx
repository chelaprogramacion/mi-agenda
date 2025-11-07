import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Nota {
  id: number;
  texto: string;
}

const NotasScreen: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [nuevaNota, setNuevaNota] = useState("");

  const guardarNotas = async (lista: Nota[]) => {
    try {
      await AsyncStorage.setItem("notas", JSON.stringify(lista));
    } catch (error) {
      console.error("Error al guardar notas", error);
    }
  };

  const cargarNotas = async () => {
    try {
      const data = await AsyncStorage.getItem("notas");
      const notasGuardadas = data ? JSON.parse(data) : [];
      setNotas(notasGuardadas);
    } catch (error) {
      console.error("Error al cargar notas", error);
    }
  };

  
  if (notas.length === 0) {
    (async () => {
      await cargarNotas();
    })();
  }

  const agregarNota = async () => {
    if (!nuevaNota.trim()) {
      Alert.alert("Error", "Escribí algo antes de agregar la nota");
      return;
    }

    const nueva: Nota = { id: Date.now(), texto: nuevaNota };
    const listaActualizada = [...notas, nueva];
    setNotas(listaActualizada);
    setNuevaNota("");
    await guardarNotas(listaActualizada);
  };

  const eliminarNota = async (id: number) => {
    const listaActualizada = notas.filter((n) => n.id !== id);
    setNotas(listaActualizada);
    await guardarNotas(listaActualizada);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribí tu nota"
          value={nuevaNota}
          onChangeText={setNuevaNota}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={agregarNota}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {notas.length > 0 ? (
          notas.map((n) => (
            <View key={n.id} style={styles.notaItem}>
              <ScrollView style={{ maxHeight: 80 }}>
                <Text style={styles.notaText}>• {n.texto}</Text>
              </ScrollView>
              <TouchableOpacity
                onPress={() => eliminarNota(n.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay notas agregadas</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default NotasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 100, backgroundColor: "#ffffff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
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
  notaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingRight: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  notaText: { fontSize: 16 },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 0,
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deleteButtonText: { color: "#fff", fontSize: 14 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 10 },
});
