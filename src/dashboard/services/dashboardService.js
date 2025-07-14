import api from '../../shared/api/api';

export const getDashboard = async (token) => {
  try {
    const response = await api.get('/auth/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err) {
    console.error('Dashboard error:', err);
    return null;
  }
};
