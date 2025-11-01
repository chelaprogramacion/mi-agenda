import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 👇 Definimos el tipo de las props que recibe desde StackNavigator
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface InicioScreenProps {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const InicioScreen: React.FC<InicioScreenProps> = ({
  tasks,
  addTask,
  toggleTask,
  deleteTask,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Turnos' as never)}
      >
        <Text style={styles.buttonText}>Turnos médicos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tramites' as never)}
      >
        <Text style={styles.buttonText}>Trámites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Actividades' as never)}
      >
        <Text style={styles.buttonText}>Actividades</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: 220,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
