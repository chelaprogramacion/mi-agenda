import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


type RootStackParamList = {
  Turnos: undefined;
  Tramites: undefined;
  Actividades: undefined;
};

type InicioScreenProp = NativeStackNavigationProp<RootStackParamList, "Turnos">;

const InicioScreen: React.FC = () => {
  const navigation = useNavigation<InicioScreenProp>();

  return (
        
    <View style={styles.container}>

     <Image
        source={require("../../assets/agenda2.jpg")}
        style={styles.image}
      />

      <Text style={styles.title}> Mi Agenda</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Turnos")}
      >
        <Text style={styles.buttonText}>Turnos médicos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tramites")}
      >
        <Text style={styles.buttonText}>Trámites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Actividades")}
      >
        <Text style={styles.buttonText}>Actividades</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 150,
    backgroundColor: "#ffd6d6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#111827",
  },
  button: {
    backgroundColor: "#f43f5e",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    paddingTop: 100,
  },
});
