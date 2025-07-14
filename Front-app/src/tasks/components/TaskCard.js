// frontend/tasks/components/TaskCard.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../auth/context/AuthContext';
import { deleteTask, updateTask } from '../services/taskService';

export default function TaskCard({ task, refreshTasks }) {
  const { token } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id, token);
      Alert.alert('Tarea eliminada', 'La tarea fue eliminada exitosamente');
      refreshTasks();
    } catch (error) {
      Alert.alert('Error al eliminar', error.message || 'No se pudo eliminar la tarea');
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (task.status === newStatus) return;

    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: newStatus,
      }, token);
      refreshTasks();
    } catch (error) {
      Alert.alert('Error al actualizar', error.message || 'No se pudo actualizar la tarea');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text style={styles.meta}>Creada por: {task.owner}</Text>
      <Text style={styles.meta}>Creada el: {new Date(task.created_at).toLocaleDateString()}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => handleStatusChange('pending')}
          style={[
            styles.button,
            task.status === 'pending' && styles.selectedButton,
          ]}
        >
          <Text style={styles.buttonText}>Pendiente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleStatusChange('in_progress')}
          style={[
            styles.button,
            task.status === 'in_progress' && styles.selectedButton,
          ]}
        >
          <Text style={styles.buttonText}>En progreso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleStatusChange('done')}
          style={[
            styles.button,
            task.status === 'done' && styles.selectedButtonDone,
          ]}
        >
          <Text style={styles.buttonText}>Completada</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#222',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4f46e5',
  },
  selectedButtonDone: {
    backgroundColor: '#10b981',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
