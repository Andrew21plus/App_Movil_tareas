import api from '../../shared/api/api';

export const getTasks = async (token) => {
  try {
    const response = await api.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err) {
    console.error('Tasks error:', err);
    return [];
  }
};
