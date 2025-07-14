// frontend/tasks/services/taskService.js
import api from '../../shared/api/api';

const parseError = (err) => {
  const data = err.response?.data;

  if (Array.isArray(data)) {
    return data.map(e => `• ${e.msg}`).join('\n');
  }

  if (typeof data === 'object' && data?.detail) {
    return data.detail;
  }

  return 'Error inesperado del servidor';
};

export const getTasks = async (token) => {
  try {
    const response = await api.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.warn('Tasks error:', parseError(err)); // cambiado
    throw new Error(parseError(err));
  }
};

export const createTask = async (task, token) => {
  try {
    const response = await api.post('/tasks', task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.warn('Create task error:', parseError(err)); // cambiado
    throw new Error(parseError(err));
  }
};

export const updateTask = async (taskId, task, token) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.warn('Update task error:', parseError(err)); // cambiado
    throw new Error(parseError(err));
  }
};

export const deleteTask = async (taskId, token) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.warn('Delete task error:', parseError(err)); // cambiado
    throw new Error(parseError(err));
  }
};
