import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Evento } from "./EventosScreen";

const formatoFecha = (fecha: string) => {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};

const ListaScreen: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  const cargarEventos = async () => {
    const data = await AsyncStorage.getItem("eventos");
    setEventos(data ? JSON.parse(data) : []);
  };

  const deleteEvento = async (id: number) => {
    const nuevaLista = eventos.filter(e => e.id !== id);
    setEventos(nuevaLista);
    await AsyncStorage.setItem("eventos", JSON.stringify(nuevaLista));
  };

  if (eventos.length === 0) {
    cargarEventos();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Eventos</Text>
      {eventos.length === 0 && <Text style={styles.emptyText}>No hay eventos guardados</Text>}

      {eventos.map(e => (
        <View key={e.id} style={styles.item}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {formatoFecha(e.fecha)} • {e.tipo}: {e.nombre}
            </Text>

            {e.tipo === "Turno" && e.profesional && e.horario && (
              <Text style={styles.itemSubText}>
                Profesional: {e.profesional} | Horario: {e.horario}
              </Text>
            )}

            {e.tipo === "Trámite" && (
              <Text style={styles.itemSubText}>
                {e.lugar ? `Lugar: ${e.lugar}` : ""} 
                {e.horario ? ` | Horario: ${e.horario}` : ""}
              </Text>
            )}

            {e.tipo === "Actividad" && e.horario && (
              <Text style={styles.itemSubText}>
                Horario: {e.horario}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEvento(e.id)}>
            <Text style={styles.deleteButtonText}>❌</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ListaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  itemText: { fontSize: 16, fontWeight: "bold" },
  itemSubText: { fontSize: 14, color: "#555", marginTop: 2 },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: { color: "#fff" },
  emptyText: { textAlign: "center", color: "#888", marginTop: 10 },
});
