import React from 'react';
import { View, Text } from 'react-native';

export default function TaskCard({ task }) {
  return (
    <View style={{ padding: 10, margin: 5, borderWidth: 1 }}>
      <Text>{task.title}</Text>
      <Text>{task.completed ? 'Finalizada' : 'Pendiente'}</Text>
      <Text>Autor: {task.owner}</Text>
    </View>
  );
}
