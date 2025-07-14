import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../auth/context/AuthContext';
import { getDashboard } from '../services/dashboardService'; // 👈 importa el servicio

export default function DashboardScreen({ navigation }) {
  const { logout, token } = useContext(AuthContext); // 👈 obtenemos el token
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard(token);
        setDashboardData(data);
      } catch (err) {
        Alert.alert('Error', err.message || 'No se pudo cargar el dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido al Dashboard!</Text>

      {dashboardData ? (
        <Text style={styles.subtitle}>Mensaje: {dashboardData.message}</Text>
      ) : (
        <Text style={{ color: 'red' }}>No se pudo cargar la información.</Text>
      )}

      <Button title="Ir a Tareas" onPress={() => navigation.navigate('Tasks')} />

      <View style={{ marginTop: 20 }}>
        <Button title="Cerrar sesión" onPress={logout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 20 },
});
