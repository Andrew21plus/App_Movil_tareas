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

export const getDashboard = async (token) => {
  try {
    const response = await api.get('/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err) {
    console.error('Dashboard error:', err);
    const message = parseError(err);
    throw new Error(message); // 👈 lanzar un error con mensaje legible
  }
};
