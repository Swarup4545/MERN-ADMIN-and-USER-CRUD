import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const loginUser = async (email: string, password: string) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

export const signupUser = async (email: string, password: string, role: string) => {
  const { data } = await API.post('/auth/signup', { email, password, role });
  return data;
};

export const fetchEmployees = async (token: string) => {
  const { data } = await API.get('/employees', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createEmployee = async (employee: FormData, token: string) => {
  const { data } = await API.post('/employees', employee, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateEmployee = async (id: string, employee: FormData, token: string) => {
  const { data } = await API.put(`/employees/${id}`, employee, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteEmployee = async (id: string, token: string) => {
  const { data } = await API.delete(`/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
