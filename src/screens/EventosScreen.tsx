import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

export interface Evento {
  id: number;
  tipo: "Turno" | "Trámite" | "Actividad";
  nombre: string;
  fecha: string;
  profesional?: string;
  horario: string;
  lugar?: string;
}

const EventosScreen: React.FC = () => {
  const [tipo, setTipo] = useState<Evento["tipo"]>("Turno");
  const [nombre, setNombre] = useState("");
  const [profesional, setProfesional] = useState("");
  const [horario, setHorario] = useState("");
  const [lugar, setLugar] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [eventos, setEventos] = useState<Evento[]>([]);


  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [horaTemp, setHoraTemp] = useState<Date>(new Date());


  const cargarEventos = async () => {
    const data = await AsyncStorage.getItem("eventos");
    setEventos(data ? JSON.parse(data) : []);
  };

  const guardarEventos = async (lista: Evento[]) => {
    await AsyncStorage.setItem("eventos", JSON.stringify(lista));
  };

  const handleSeleccionFecha = (day: { dateString: string }) => {
    setFechaSeleccionada(day.dateString);
    cargarEventos();
  };

  const limpiarCampos = () => {
    setNombre("");
    setProfesional("");
    setHorario("");
    setLugar("");
  };

  const handleAgregar = async () => {
    if (!nombre.trim() || !fechaSeleccionada) {
      Alert.alert("⚠️ Error", "Completa el nombre y selecciona una fecha");
      return;
    }

    if (tipo === "Turno" && (!profesional.trim() || !horario.trim())) {
      Alert.alert("⚠️ Error", "Completa profesional y horario");
      return;
    }

    if (tipo === "Trámite" && (!lugar.trim() || !horario.trim())) {
      Alert.alert("⚠️ Error", "Completa lugar y horario del trámite");
      return;
    }

    if (tipo === "Actividad" &&  !horario.trim()) {
      Alert.alert("⚠️ Error", "Completa el horario de la actividad");
      return;
    }

    const otrosEventos = eventos.filter((e) => e.fecha === fechaSeleccionada);

    const eventoMismoHorario = otrosEventos.find(
  (e) => e.horario === horario
);


    const nuevoEvento: Evento = {
      id: Date.now(),
      tipo,
      nombre,
      fecha: fechaSeleccionada,
      profesional: tipo === "Turno" ? profesional : undefined,
      horario,
      lugar: tipo === "Trámite" ? lugar : undefined,
    };

    if (eventoMismoHorario) {
      Alert.alert(
        "⚠️ Conflicto de horario",
        `Ya tenés un ${eventoMismoHorario.tipo.toLowerCase()} a las ${eventoMismoHorario.horario}. ¿Querés agendarlo igual?`,
        [
          {
            text: "No",
            style: "cancel",
            onPress: () => {
              Alert.alert("ℹ️ Sugerencia", "Podés cambiar el horario para agendarlo.");
            },
          },
          {
            text: "Sí",
            onPress: async () => {
              const nuevaLista = [...eventos, nuevoEvento];
              setEventos(nuevaLista);
              await guardarEventos(nuevaLista);
              limpiarCampos();
              Alert.alert(
                "✅ Agregado correctamente",
                `${tipo} guardado para ${fechaSeleccionada}.`
              );
            },
          },
        ]
      );
      return;
    }

    const nuevaLista = [...eventos, nuevoEvento];
    setEventos(nuevaLista);
    await guardarEventos(nuevaLista);
    limpiarCampos();
    Alert.alert("✅ Agregado", `${tipo} guardado para ${fechaSeleccionada}`);
  };

  
  const onChangeHora = (event: any, selectedDate?: Date) => {
    
    if (Platform.OS === "android") {
  setMostrarPicker(false); 
}
    if (selectedDate) {
      const horas = selectedDate.getHours().toString().padStart(2, "0");
      const minutos = selectedDate.getMinutes().toString().padStart(2, "0");
      const horaFormateada = `${horas}:${minutos}`;
      setHorario(horaFormateada); 
      setHoraTemp(selectedDate);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Agenda</Text>

      <View style={styles.tipoContainer}>
        {["Turno", "Trámite", "Actividad"].map((tipoEvento) => (
          <TouchableOpacity
            key={tipoEvento}
            style={[styles.tipoButton, tipo === tipoEvento && styles.tipoButtonActivo]}
            onPress={() => setTipo(tipoEvento as any)}
          >
            <Text
              style={[
                styles.tipoButtonText,
                tipo === tipoEvento && { color: "#fff" },
              ]}
            >
              {tipoEvento}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder={`Nombre del ${tipo.toLowerCase()}`}
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      {tipo === "Turno" && (
        <>
          <TextInput
            placeholder="Profesional"
            value={profesional}
            onChangeText={setProfesional}
            style={styles.input}
          />
          
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Horario (ej. 14:30)"
              value={horario}
              onChangeText={setHorario}
              style={[styles.input, { flex: 1 }]}
            />
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setMostrarPicker(true)}
            >
              <Text style={{ color: "#fff" }}>⏰</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {tipo === "Trámite" && (
        <>
          <TextInput
            placeholder="Lugar"
            value={lugar}
            onChangeText={setLugar}
            style={styles.input}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Horario (ej. 10:00)"
              value={horario}
              onChangeText={setHorario}
              style={[styles.input, { flex: 1 }]}
            />
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setMostrarPicker(true)}
            >
              <Text style={{ color: "#fff" }}>⏰</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {tipo === "Actividad" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Horario (ej. 18:00)"
            value={horario}
            onChangeText={setHorario}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setMostrarPicker(true)}
          >
            <Text style={{ color: "#fff" }}>⏰</Text>
          </TouchableOpacity>
        </View>
      )}

      {mostrarPicker && (
  <>
    <DateTimePicker
      value={horaTemp}
      mode="time"
      is24Hour={true}
      display={Platform.OS === "android" ? "spinner" : "default"}
      onChange={onChangeHora}
    />

    {Platform.OS === "ios" && (
      <TouchableOpacity
        onPress={() => setMostrarPicker(false)}
        style={{
          backgroundColor: "#2563eb",
          padding: 10,
          marginTop: 5,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Cerrar</Text>
      </TouchableOpacity>
    )}
  </>
)}
      <Calendar
        style={{ height: 340 }}
        onDayPress={handleSeleccionFecha}
        markedDates={
          fechaSeleccionada
            ? { [fechaSeleccionada]: { selected: true, selectedColor: "#2563eb" } }
            : {}
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleAgregar}>
        <Text style={styles.buttonText}>Guardar {tipo}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E6FFF0" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tipoButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 8,
  },
  tipoButtonActivo: { backgroundColor: "#16a34a" },
  tipoButtonText: { color: "#000", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  pickerButton: {
    marginLeft: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
