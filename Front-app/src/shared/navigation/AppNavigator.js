// src/shared/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '../../auth/navigation/AuthNavigator';
import DashboardScreen from '../../dashboard/screens/DashboardScreen';
import TaskListScreen from '../../tasks/screens/TaskListScreen';
import { AuthContext } from '../../auth/context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!token ? (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Tasks" component={TaskListScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
