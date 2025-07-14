import api from '../../shared/api/api';

const parseError = (err) => {
  const data = err.response?.data;

  if (Array.isArray(data)) {
    // Error de validación (FastAPI)
    return data.map(e => `• ${e.msg}`).join('\n');
  }

  if (typeof data === 'object' && data?.detail) {
    return data.detail;
  }

  return 'Error inesperado del servidor';
};

export const login = async (username, password) => {
  try {
    const response = await api.post(
      '/login',
      { username, password },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return response.data;
  } catch (err) {
    const message = parseError(err);
    throw new Error(message); // <-- SIEMPRE lanzar string
  }
};

export const register = async (data) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (err) {
    const message = parseError(err);
    throw new Error(message); // <-- SIEMPRE lanzar string
  }
};
