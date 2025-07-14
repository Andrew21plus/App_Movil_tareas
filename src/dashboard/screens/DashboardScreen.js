import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../auth/context/AuthContext';
import { getDashboard } from '../services/dashboardService';

export default function DashboardScreen() {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboard(token);
      if (data) setMessage(data.message);
    };
    fetchData();
  }, [token]);

  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}
