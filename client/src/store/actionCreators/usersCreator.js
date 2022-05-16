import { START_LOADING, END_LOADING, FETCH_ALL, UPDATE, DELETE, } from '../actions/actionTypes';
import * as api from '../../api/index.js';


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deleteUser(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        alert(error);
    }
};

export const updateAdminStatus = (id, role) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updateAdminStatus(id, role);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
};

export const updateBanStatus = (id, active) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updateActiveStatus(id, active);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        alert(error);
    }
};

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchUsers();
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
        return data
    } catch (error) {
        alert(error)
    }
}