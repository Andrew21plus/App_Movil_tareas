// frontend/tasks/screens/TaskListScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { getTasks, createTask } from '../services/taskService';
import { AuthContext } from '../../auth/context/AuthContext';
import TaskCard from '../components/TaskCard';

export default function TaskListScreen() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudieron cargar las tareas');
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es requerido');
      return;
    }

    try {
      const newTask = await createTask({ title, description, status }, token);
      if (newTask) {
        setTitle('');
        setDescription('');
        setStatus('pending');
        Alert.alert('Éxito', 'Tarea creada correctamente');
        fetchTasks();
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo crear la tarea');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tareas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#888"
      />
      <Button title="Crear Tarea" onPress={handleCreate} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} refreshTasks={fetchTasks} />
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    color: 'black',
  },
});
