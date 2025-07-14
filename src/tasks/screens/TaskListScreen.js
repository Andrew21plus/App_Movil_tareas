import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getTasks } from '../services/taskService';
import { AuthContext } from '../../auth/context/AuthContext';
import TaskCard from '../components/TaskCard';

export default function TaskListScreen() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTasks(token);
      if (data) setTasks(data);
    };
    fetch();
  }, [token]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TaskCard task={item} />}
    />
  );
}
