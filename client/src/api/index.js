import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5047' });

export const logIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);

export const fetchUsers = () => API.get(`/users/getUsers`);
export const updateAdminStatus = (id, adminStatus) => API.patch(`/users/admin/${id}`, adminStatus);
export const updateActiveStatus = (id, banStatus) => API.patch(`/users/ban/${id}`, banStatus);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const deleteUsers = (formData) => API.post('/users/deleteUsers', formData);
export const changeAdminStatusOfSelected  = (formData) => API.post('/users/toggleAdmins', formData);
export const changeActiveStatusOfSelected  = (formData) => API.post('/users/toggleActive', formData);

export const createCollection = (formData) => API.post('/collections/create', formData);
export const fetchCollections = (id) => API.post('/collections/get', id);
export const fetchCollection = (id) => API.post(`/collections/get/${id}`, id);
export const deleteCollection = (id, formData) => API.delete(`/collections/delete/${id}`, {data: formData} );

export const createItem = (formData) => API.post('/items/create', formData);
export const deleteItem = (id) => API.delete(`/items/delete/${id}`);
export const updateItem = (id, itemInfo) => API.post(`/items/edit/fields/${id}`, itemInfo);
export const likeItem = (id, usersByLikes) => API.patch(`/items/edit/like/${id}`, usersByLikes);