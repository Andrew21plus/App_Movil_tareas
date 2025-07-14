import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { register } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    try {
      await register(form);
      Alert.alert('Éxito', 'Usuario registrado con éxito');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error', err.message); // Mostrar mensaje limpio
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        onChangeText={(val) => handleChange('full_name', val)}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(val) => handleChange('email', val)}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(val) => handleChange('username', val)}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(val) => handleChange('password', val)}
        placeholderTextColor="#888"
      />

      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
