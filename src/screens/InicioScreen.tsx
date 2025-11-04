import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const InicioScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/agenda2.jpg")}
        style={styles.image}
      />
      
      <Text style={styles.title}> Mi Agenda</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Eventos")}
      >
        <Text style={styles.buttonText}>Ir a Eventos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ff4500", marginTop: 10 }]}
        onPress={() => navigation.navigate("ListaEventos")}
      >
        <Text style={styles.buttonText}>Ver Lista de Eventos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: "#ffe4e1" },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: "#ff4500", padding: 15, borderRadius: 8, width: "80%",alignItems: "center", },
  buttonText: { color: "#fff", fontWeight: "600" },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    paddingTop: 100,
  },
});
