import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5047' });

export const fetchUsers = () => API.get(`/users/getUsers`);
export const updateAdminStatus = (id, adminStatus) => API.patch(`/users/admin/${id}`, adminStatus);
export const updateActiveStatus = (id, banStatus) => API.patch(`/users/ban/${id}`, banStatus);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const deleteUsers = (formData) => API.post('/users/deleteUsers', formData);
export const changeAdminStatusOfSelected  = (formData) => API.post('/users/toggleAdmins', formData);
export const changeActiveStatusOfSelected  = (formData) => API.post('/users/toggleActive', formData);

export const logIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);

export const createCollection = (formData) => API.post('/collections/create', formData);
export const fetchCollections = (id) => API.post('/collections/get', id);
export const deleteCollection = (id) => API.delete(`/collections/delete/${id}`);