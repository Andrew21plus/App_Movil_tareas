import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { register } from '../services/authService';

export default function RegisterScreen() {
  const [form, setForm] = useState({ username: '', email: '', full_name: '', password: '' });

  return (
    <View>
      <TextInput placeholder="Full Name" onChangeText={v => setForm({ ...form, full_name: v })} />
      <TextInput placeholder="Email" onChangeText={v => setForm({ ...form, email: v })} />
      <TextInput placeholder="Username" onChangeText={v => setForm({ ...form, username: v })} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={v => setForm({ ...form, password: v })} />
      <Button title="Register" onPress={() => register(form)} />
    </View>
  );
}
