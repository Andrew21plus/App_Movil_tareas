import api from '../../shared/api/api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  } catch (err) {
    console.error('Login error:', err);
    return null;
  }
};

export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (err) {
    console.error('Register error:', err);
    return null;
  }
};
